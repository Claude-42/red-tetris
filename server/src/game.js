const { Player } = require('./player')
const { MasterPiece } = require('./masterpiece')
// const { Grid } = require('./grid')

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
      tmpPlayer.newOwner()
    }
    this.usersList.push(tmpPlayer)
  }

  delUser (id) {
    const indexPlayer = this.usersList.findIndex(elt => elt.id === id)
    if (this.usersList.length === 1) {
      return 'DELETE_ME'
    }

    if (this.usersList[indexPlayer].owner === true) {
      this.transferOwnerShip()
    }

    this.usersList.splice(indexPlayer, 1)
    return 'OK'
  }

  transferOwnerShip () {
    this.usersList[1].owner = true
  }

  startGame () {
    this.masterpiece = new MasterPiece()
    this.usersList.forEach(elt => {
      elt.startGame(this.masterpiece)
      elt.score = 0
    })
  }
}

module.exports = { Game }
