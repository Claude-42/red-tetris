const { Player } = require('../src/player')
const { Grid } = require('../src/grid')
const { MasterPiece } = require('../src/masterpiece')

describe('Player Class', () => {
  describe('newOwner method', () => {
    test('is new owner', () => {
      const player = new Player('test', 12)

      player.newOwner()
      expect(player.owner).toStrictEqual(true)
    })
  })
  describe('startGame method', () => {
    test('is in game', () => {
      const player = new Player('test', 12)
      const mp = new MasterPiece()
      const grid = new Grid(mp)

      player.startGame(mp)
      expect(player.inGame).toStrictEqual(true)
      expect(player.grid).toStrictEqual(grid)
    })
  })
})
