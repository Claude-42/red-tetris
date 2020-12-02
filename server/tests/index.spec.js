const { } = require('socket.io-client')

const { Player } = require('../src/player')
const { Grid } = require('../src/grid')
const { MasterPiece } = require('../src/masterpiece')
const { Game } = require('../src/game')
const { newGame } = require('../src/index')

let server

beforeEach(() => {
  server = new Server()
  server.setup()
})

afterEach(() => {
  server.close()
})

test('renders index.html page', () => {
  // HOW TO TEST
})

test('')

describe('Index.js', () => {
  describe('newGame function', () => {
    test('Game is full', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      game.addUser('e', 3)
      expect(newGame('r', 4, 'test')).toStrictEqual({ status: 'FULL' })
    })
  })
})
