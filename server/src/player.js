class Player {
  constructor (name, id) {
    this.name = name
    this.id = id
    this.owner = false
  }

  newOwner () {
    this.owner = true
  }
}

module.exports = { Player }
