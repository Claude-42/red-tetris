const { Player } = require('./player')

class Game {
  constructor (name) {
    this.name = name
    this.inGame = false
    this.usersList = []
    this.owner = ''
  }

  addUser (name, id) {
    const tmpPlayer = new Player(name, id)
    if (this.owner === '') {
      this.owner = name
      tmpPlayer.owner()
    }
    this.usersList.push(tmpPlayer)
  }

  delUser (id) {
    const indexPlayer = this.usersList.find(elt => elt.id === id)
    if (this.usersList.length === 1) {
      return 'DELETE_ME'
    }
    if (this.usersList[indexPlayer].owner === true) {
      this.transferOwnerShip()
    }
    this.usersList.splice(this.usersList.find(elt => elt.id === id), 1)
    return 'OK'
  }

  transferOwnerShip () {
    this.usersList[1].owner = true
  }
}

module.exports = { Game }
