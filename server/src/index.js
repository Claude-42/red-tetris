// // const express = require('express')
// // const http = require('http')
// // const socketIo = require('socket.io')
// const cors = require('cors')

// const PORT = 3030

// // const app = express()
// // const server = http.createServer(app)
// // const io = socketIo(server)

// const app = require('express')()
// const server = require('http').createServer(app)
// const io = require('socket.io')()

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// io.on('connection', (socket) => {
//   console.log('a user connected')
// })

// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`)
// })

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const path = require('path')

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

http.listen(3030, () => {
  console.log('listening on *:3000')
})
