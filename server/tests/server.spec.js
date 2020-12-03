const { Game } = require('../src/game')
const { Server, newGame, endGame, getAllLobies } = require('../src/server')

let server

beforeEach(async () => {
  server = new Server()
  server.setup()

  await server.isReady()
})

afterEach(() => {
  return server.close()
})

describe('Index.js', () => {
  describe('newGame function', () => {
    test('Game is full', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      game.addUser('e', 3)
      game.addUser('r', 4)
      server.gamesList.push(game)
      expect(newGame('t', 5, 'test', server.gamesList)).toStrictEqual({ status: 'FULL' })
    })
    test('Creating new game', () => {
      expect(newGame('t', 5, 'test', server.gamesList)).toStrictEqual({ isNewGame: true, status: 'OK' })
    })
    test('Game already start', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      game.inGame = true
      server.gamesList.push(game)
      expect(newGame('t', 5, 'test', server.gamesList)).toStrictEqual({ status: 'IN_GAME' })
    })
    test('add player to game', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      server.gamesList.push(game)
      expect(newGame('t', 5, 'test', server.gamesList)).toStrictEqual({
        isNewGame: false,
        status: 'OK'
      })
    })
  })
  describe('endGame function', () => {
    test('Game is finish', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      server.gamesList.push(game)
      expect(endGame('test', server.gamesList)).toStrictEqual(true)
    })
    test('Game doesnt find', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      server.gamesList.push(game)
      expect(endGame('nop', server.gamesList)).toStrictEqual(false)
    })
  })
  describe('getAllLobies function', () => {
    test('get all lobies', () => {
      const game = new Game('test')

      game.addUser('q', 1)
      game.addUser('w', 2)
      server.gamesList.push(game)
      expect(getAllLobies(server.gamesList)).toStrictEqual(['test'])
    })
  })
})
