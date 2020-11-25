const { Grid } = require('./grid')

class Player {
  constructor (name, id) {
    this.name = name
    this.id = id
    this.owner = false
    this.inGame = false
  }

  newOwner () {
    this.owner = true
  }

  startGame (masterpiece) {
    this.inGame = true
    this.grid = new Grid(masterpiece)
  }
}

module.exports = { Player }
