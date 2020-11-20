const express = require('express')
const app = express()
const SocketIO = require('socket.io')
const cors = require('cors')
const { Masterpiece } = require('../masterpiece')
const { Grid } = require('../grid')
const { Piece } = require('../piece')

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

const masterpiece = new Masterpiece()
const grid = new Grid(masterpiece)

function sendData (socket) {
  socket.emit('ownGrid', { PAINT_GRID: grid.simulatePieceInGrid(), NEXT_PIECE: grid.NEXT_PIECE })
}

// function makeMove (move) {
//   return grid.handleMove(move)
// }

io.on('connection', (socket) => {
  socket.on('start', payload => {
    sendData(socket)
  })

  socket.on('move', ({ moveType }) => {
    grid.handleMove(moveType)
    sendData(socket)
  })
})
