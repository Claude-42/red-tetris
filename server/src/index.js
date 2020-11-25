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

function sendData (socket) {
  socket.emit('ownGrid', { PAINT_GRID: grid.simulatePieceInGrid(), NEXT_PIECE: masterpiece.sendNextPiece(grid.currentPiece + 1) })
}

function newGame (playerName, playerId, lobbyName) {
  let isNewGame = true
  gamesList.forEach(elt => {
    if (elt.name === lobbyName) {
      if (elt.usersList.length > 5) {
        return 'FULL'
      }
      if (elt.inGame === true) {
        return 'IN_GAME'
      }
      elt.addUser(playerName, playerId)
      isNewGame = false
    }
  })
  if (isNewGame === true) {
    const newGame = new Game(lobbyName)
    newGame.addUser(playerName, playerId)
    gamesList.push(newGame)
  }
  return 'OK'
}

io.on('connection', (socket) => {
  socket.on('JOIN_LOBBY', ({ playerName, lobbyName }) => {
    const ret = newGame(playerName, socket.id, lobbyName)
    if (socket.join(lobbyName) !== 'FULL') {
      io.to(socket.id).emit('ROOM_STATUS', ret)
      io.to(lobbyName).emit('PLAYER_JOINED_GAME', gamesList.find(elt => elt.name === lobbyName).usersList)
    }
  })

  // socket.on('start', payload => {
  //   sendData(socket)
  // })

  socket.on('QUIT_LOBBY', (lobbyName) => {
    if (gamesList.find(elt => elt.name === lobbyName).delUser(socket.id) === 'DELETE_ME') {
      gamesList.splice(this.usersList.find(elt => elt.name === lobbyName), 1)
    }
  })

  socket.on('GET_ALL_LOBBIES', () => {
    io.to(socket.id).emit('GET_ALL_LOBBIES', gamesList.map((elt) => {
      return elt.name
    }))
  })

  socket.on('move', async ({ type }) => {
    let isGameOver = false
    let TMP_DOWN = 0
    if (type === 'DOWN_AUTOMATIC') {
      type = 'DOWN'
      TMP_DOWN = 1
    }

    if ((grid.handleMove(type).status === 'ERROR' && TMP_DOWN === 1) || type === 'FALL') {
      grid.putPieceInGrid()
      grid.popLine()
      if (grid.nextPiece()) {
        isGameOver = true
      }
    }

    sendData(socket)

    if (isGameOver) {
      socket.emit('gameOver')
    }
  })
})
