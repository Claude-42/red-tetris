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

  startGame () {
    this.inGame = true
  }
}

module.exports = { Player }
