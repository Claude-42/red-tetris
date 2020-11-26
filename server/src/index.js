const express = require('express')
const app = express()
const SocketIO = require('socket.io')
const cors = require('cors')
const { MasterPiece } = require('./masterpiece')
const { Grid } = require('./grid')
const { Game } = require('./game')

const PORT = 3030

app.use(cors({
  credentials: true,
  origin (origin, cb) {
    console.log('origin', origin)
    cb(null, true)
  }
}))

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

const io = SocketIO(server)

const masterpiece = new MasterPiece()
const grid = new Grid(masterpiece)
const gamesList = []
const uniqueUser = []

// function sendData (socket) {
//   socket.emit('ownGrid', { PAINT_GRID: grid.simulatePieceInGrid(), NEXT_PIECE: masterpiece.sendNextPiece(grid.currentPiece + 1) })
// }

function newGame (playerName, playerId, lobbyName) {
  let isNewGame = true

  for (const elt of gamesList) {
    if (elt.name === lobbyName) {
      if (elt.usersList.length > 5) {
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

function getAllLobies () {
  return gamesList.map(({ name }) => name)
}

io.on('connection', (socket) => {
  socket.on('JOIN_LOBBY', ({ playerName, lobbyName }) => {
    const { status, isNewGame } = newGame(playerName, socket.id, lobbyName)
    if (isNewGame) {
      io.emit('GET_ALL_LOBBIES', getAllLobies())
    }

    socket.emit('ROOM_STATUS', status)

    if (status !== 'FULL') {
      socket.join(lobbyName)
      io.to(lobbyName).emit('PLAYER_JOINED_GAME', gamesList.find(elt => elt.name === lobbyName).usersList)
    }
  })

  socket.on('LAUNCH_GAME', ({ lobbyName }) => {
    const game = gamesList.find(elt => elt.name === lobbyName)
    if (game === undefined) {
      return
    }

    const isGameOwner = game.usersList.some(({ id, owner }) => id === socket.id && owner === true)
    if (!isGameOwner) {
      return
    }

    game.startGame()

    game.usersList.forEach(player => {
      io.to(player.id).emit('OWN_GRID', {
        PAINT_GRID: player.grid.simulatePieceInGrid(),
        NEXT_PIECE: game.masterpiece.sendNextPiece(player.grid.currentPiece + 1)
      })
    })
  })

  socket.on('QUIT_LOBBY', (lobbyName) => {
    if (gamesList.find(elt => elt.name === lobbyName).delUser(socket.id) === 'DELETE_ME') {
      gamesList.splice(this.usersList.find(elt => elt.name === lobbyName), 1)
    }
  })

  socket.on('GET_ALL_LOBBIES', () => {
    io.to(socket.id).emit('GET_ALL_LOBBIES', getAllLobies())
  })

  socket.on('NEW_USER', ({ userName }) => {
    if (uniqueUser.includes(userName) === false) {
      uniqueUser.push(userName)
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

    for (const game of gamesList) {
      const matchingPlayer = game.usersList.find((player) => player.id === socket.id)
      if (matchingPlayer === undefined) {
        continue
      }

      tmpPlayer = matchingPlayer
      tmpGame = game
    }

    if (tmpPlayer === undefined) {
      console.info('Could not find the player')
      return
    }

    if ((tmpPlayer.grid.handleMove(type).status === 'ERROR' && TMP_DOWN === 1) || type === 'FALL') {
      tmpPlayer.grid.putPieceInGrid()
      const popLineNumber = tmpPlayer.grid.popLine() - 1
      if (popLineNumber > 0) {
        tmpGame.usersList.forEach(elt => {
          if (elt.name !== tmpPlayer.name) {
            const gameOver = elt.grid.blockLine()
            io.to(elt.id).emit('OWN_GRID', { PAINT_GRID: elt.grid.simulatePieceInGrid(), NEXT_PIECE: tmpGame.masterpiece.sendNextPiece(elt.grid.currentPiece + 1) })
            if (gameOver === 'GAME_OVER') {
              io.to(elt.id).emit('GAME_OVER')
            }
          }
        })
      }
      if (tmpPlayer.grid.nextPiece()) {
        isGameOver = true
      }
    }

    socket.emit('OWN_GRID', { PAINT_GRID: tmpPlayer.grid.simulatePieceInGrid(), NEXT_PIECE: tmpGame.masterpiece.sendNextPiece(tmpPlayer.grid.currentPiece + 1) })

    if (isGameOver) {
      socket.emit('GAME_OVER')
    }

    const shadowGridsList = tmpGame.usersList.map(user => ({
      name: user.name,
      grid: user.grid.makeMeShadow()
    }))

    socket.broadcast.in(tmpGame.name).emit('NEW_SHADOW', shadowGridsList)
  })
})
