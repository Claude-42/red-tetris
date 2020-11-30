const { Player } = require('../src/player')
const { Grid } = require('../src/grid')
const { MasterPiece } = require('../src/masterpiece')
const { Game } = require('../src/game')

describe('Game Class', () => {
  describe('addUser method', () => {
    test('add new owner user', () => {
      const game = new Game('test')
      const player = new Player('test', 12)
      player.newOwner()

      game.addUser('test', 12)
      expect(game.usersList[0]).toStrictEqual(player)
    })
  })
  describe('delUser method', () => {
    test('delete single user', () => {
      const game = new Game('test')

      game.addUser('test', 12)
      expect(game.delUser(12)).toStrictEqual('DELETE_ME')
    })
    test('delete owner user', () => {
      const game = new Game('test')

      game.addUser('test', 1)
      game.addUser('test2', 2)
      expect(game.delUser(1)).toStrictEqual('OK')
      expect(game.usersList[0].owner).toStrictEqual(true)
      expect(game.usersList[0].id).toStrictEqual(2)
    })
  })
  describe('startGame method', () => {
    test('start game', () => {
      const game = new Game('test')

      game.addUser('test', 12)
      game.startGame()
      expect(game.usersList[0].inGame).toStrictEqual(true)
    })
  })
})
