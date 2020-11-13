const express = require('express')
const app = express()
const SocketIO = require('socket.io')
const cors = require('cors')
const path = require('path')

const PORT = 3030

app.use(cors({
  credentials: true,
  origin (origin, cb) {
    console.log('origin', origin)
    cb(null, true)
  }
})).get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

const io = SocketIO(server)

io.on('connection', (socket) => {
  console.log('a user connected')
})
