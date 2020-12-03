const express = require('express')
const SocketIO = require('socket.io')
const cors = require('cors')
const sirv = require('sirv')

const { Game } = require('./game')

const PORT = process.env.PORT || 3030

class Server {
  constructor () {
    this.gamesList = []
    this.uniqueUser = []

    this._ready = false
  }

  isReady () {
    return new Promise((resolve) => {
      const timerID = setInterval(() => {
        if (this._ready === true) {
          resolve()
          clearInterval(timerID)
        }
      }, 50)
    })
  }

  setup () {
    this.setupHttpServer()

    this.setupWebsocket()
  }

  close () {
    this.server.close()

    this.io.close()
  }

  setupHttpServer () {
    const app = express()

    const assets = sirv('public', {
      single: true // Treat the public directory as a single-page application
    })

    app
      .use(cors({
        credentials: true,
        origin (origin, cb) {
          cb(null, true)
        }
      }))
      .use(assets)

    this.server = app.listen(PORT, () => {
      this._ready = true

      console.log(`Listening on port ${PORT}`)
    })
  }

  setupWebsocket () {
    this.io = SocketIO(this.server)

    this.io.on('connection', this.handleSocketConnection.bind(this))
  }

  handleSocketConnection (socket) {
    socket.on('JOIN_LOBBY', ({ playerName, lobbyName }) => {
      const { status, isNewGame } = newGame(playerName, socket.id, lobbyName, this.gamesList)
      if (isNewGame) {
        this.io.emit('GET_ALL_LOBBIES', getAllLobies(this.gamesList))
      }

      socket.emit('ROOM_STATUS', status)

      if (status !== 'FULL') {
        socket.join(lobbyName)
        this.io.to(lobbyName).emit('PLAYER_JOINED_GAME', this.gamesList.find(elt => elt.name === lobbyName).usersList)
      }
    })

    socket.on('LAUNCH_GAME', ({ lobbyName }) => {
      const game = this.gamesList.find(elt => elt.name === lobbyName)
      if (game === undefined) {
        return
      }

      const isGameOwner = game.usersList.some(({ id, owner }) => id === socket.id && owner === true)
      if (!isGameOwner) {
        return
      }

      game.startGame()

      game.usersList.forEach(player => {
        this.io.to(player.id).emit('OWN_GRID', {
          PAINT_GRID: player.grid.simulatePieceInGrid(),
          NEXT_PIECE: game.masterpiece.sendNextPiece(player.grid.currentPiece + 1)
        })

        const shadowGridsList = game.usersList.map(user => ({
          name: user.name,
          grid: user.grid.makeMeShadow()
        }))
        this.io.to(player.id).emit('NEW_SHADOW', shadowGridsList.map(elt => {
          if (elt.name !== player.name) {
            return elt
          } else {
            return undefined
          }
        }).filter(Boolean))
      })
    })

    socket.on('QUIT_LOBBY', (lobbyName) => {
      const lobby = this.gamesList.find(elt => elt.name === lobbyName)
      if (lobby === undefined) {
        return
      }

      if (lobby.delUser(socket.id) === 'DELETE_ME') {
        this.gamesList.splice(this.gamesList.findIndex(elt => elt.name === lobbyName), 1)
      }

      const game = this.gamesList.find(({ name }) => name === lobbyName)
      if (game === undefined) {
        return
      }

      this.io.to(lobbyName).emit('PLAYER_JOINED_GAME', game.usersList)
    })
    // ----------------------------------------------------------------------

    socket.on('disconnecting', () => {
      this.gamesList.forEach(elt => {
        elt.usersList.forEach(player => {
          if (player.id === socket.id) {
            this.uniqueUser.splice(this.uniqueUser.findIndex(user => user === player.name), 1)
            const deleteMe = elt.delUser(socket.id)
            this.io.to(elt.name).emit('PLAYER_JOINED_GAME', elt.usersList)
            if (deleteMe === 'DELETE_ME') {
              this.gamesList.splice(this.gamesList.findIndex(elem => elem.name === elt.name), 1)
            }
          }
        })
      })
    })

    // ----------------------------------------------------------------------

    socket.on('GET_ALL_LOBBIES', () => {
      this.io.to(socket.id).emit('GET_ALL_LOBBIES', getAllLobies(this.gamesList))
    })

    socket.on('NEW_USER', ({ userName }) => {
      if (this.uniqueUser.includes(userName) === false) {
        this.uniqueUser.push(userName)
        socket.emit('NEW_USER', 'OK')
      } else {
        socket.emit('NEW_USER', 'FAIL')
      }
    })

    socket.on('MOVE', ({ type }) => {
      let isGameOver = false
      let TMP_DOWN = 0
      let tmpPlayer
      let tmpGame

      if (type === 'DOWN_AUTOMATIC') {
        type = 'DOWN'
        TMP_DOWN = 1
      }

      for (const game of this.gamesList) {
        const matchingPlayer = game.usersList.find((player) => player.id === socket.id)
        if (matchingPlayer === undefined) {
          continue
        }

        tmpPlayer = matchingPlayer
        tmpGame = game
      }

      if (TMP_DOWN === 1) {
        tmpPlayer.grid.score--
      }

      if (tmpPlayer === undefined) {
        return
      }

      const generateOwnGridPayload = (user, game) => {
        return {
          PAINT_GRID: user.grid.simulatePieceInGrid(),
          NEXT_PIECE: game.masterpiece.sendNextPiece(user.grid.currentPiece + 1)
        }
      }

      const blockGridLinesToAllPlayersExceptSender = (linesCountToBlock) => {
        for (const user of tmpGame.usersList) {
          if (user.name === tmpPlayer.name) {
            continue
          }

          const gameOver = user.grid.blockLine(linesCountToBlock)

          this.io.to(user.id).emit('OWN_GRID', generateOwnGridPayload(user, tmpGame))

          if (gameOver === 'GAME_OVER') {
            this.io.to(user.id).emit('GAME_OVER')
            user.inGame = false
            if (endGame(tmpGame.name, this.gamesList) === true) {
              this.io.to(tmpGame.name).emit('END_GAME')
            }
          }
        }
      }

      if ((tmpPlayer.grid.handleMove(type).status === 'ERROR' && TMP_DOWN === 1) || type === 'FALL') {
        tmpPlayer.grid.putPieceInGrid()
        tmpPlayer.grid.score++

        const linesCountToBlock = tmpPlayer.grid.popLine() - 1
        if (linesCountToBlock > 0) {
          blockGridLinesToAllPlayersExceptSender(linesCountToBlock)
        }

        if (tmpPlayer.grid.nextPiece()) {
          isGameOver = true
        }
      }

      socket.emit('OWN_GRID', generateOwnGridPayload(tmpPlayer, tmpGame))
      socket.emit('UPDATE_SCORE', {
        score: tmpPlayer.grid.score
      })

      if (isGameOver) {
        socket.emit('GAME_OVER')
        tmpPlayer.inGame = false
        if (endGame(tmpGame.name, this.gamesList) === true) {
          this.io.to(tmpGame.name).emit('END_GAME')
          this.io.to(tmpGame.name).emit('PLAYER_JOINED_GAME', this.gamesList.find(elt => elt.name === tmpGame.name).usersList)
        }
      }

      const shadowGridsList = tmpGame.usersList
        .filter(({ inGame }) => inGame === true)
        .map(user => ({
          name: user.name,
          grid: user.grid.makeMeShadow()
        }))

      socket.broadcast.in(tmpGame.name).emit('NEW_SHADOW', shadowGridsList)
    })
  }
}

// const gamesList = []
// const uniqueUser = []

function newGame (playerName, playerId, lobbyName, gamesList) {
  let isNewGame = true

  for (const elt of gamesList) {
    if (elt.name === lobbyName) {
      if (elt.usersList.length > 3) {
        return {
          status: 'FULL'
        }
      }
      if (elt.inGame === true) {
        return {
          status: 'IN_GAME'
        }
      }
      elt.addUser(playerName, playerId)
      isNewGame = false
    }
  }

  if (isNewGame === true) {
    const newGame = new Game(lobbyName)
    newGame.addUser(playerName, playerId)
    gamesList.push(newGame)
  }

  return {
    status: 'OK',
    isNewGame
  }
}

function endGame (lobbyname, gamesList) {
  const game = gamesList.find(({ name }) => name === lobbyname)
  if (game === undefined) {
    return false
  }

  return game.usersList.every(({ inGame }) => inGame === false)
}

function getAllLobies (gamesList) {
  return gamesList.map(({ name }) => name)
}

module.exports = { Server, newGame, endGame, getAllLobies }
