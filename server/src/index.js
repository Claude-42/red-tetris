const express = require('express')
const app = express()
const SocketIO = require('socket.io')
const cors = require('cors')
const { MasterPiece } = require('./masterpiece')
const { Grid } = require('./grid')

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

function sendData (socket) {
  socket.emit('ownGrid', { PAINT_GRID: grid.simulatePieceInGrid(), NEXT_PIECE: grid.NEXT_PIECE })
}

io.on('connection', (socket) => {
  socket.on('start', payload => {
    sendData(socket)
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
