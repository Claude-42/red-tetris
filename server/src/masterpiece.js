const { PIECES } = require('./piece')
const { CASE_COLOR } = require('./grid')

function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min
}

class MasterPiece {
  constructor () {
    this.pieces = []
    this.newSet()
  }

  sendNextPiece (nb) {
    const newPiece = this.nextPiece(nb)

    return PIECES[newPiece].map((row) => {
      return row.map((column) => {
        if (column === 1) {
          return CASE_COLOR[newPiece]
        }
        return CASE_COLOR.EMPTY
      })
    })
  }

  newSet () {
    const colors = ['RED', 'BLUE', 'TURQUOISE', 'ORANGE', 'GREEN', 'PURPLE', 'YELLOW']
    const returnSet = []

    while (colors.length > 0) {
      const randomColor = getRandomArbitrary(0, colors.length) | 0
      returnSet.push(colors[randomColor])
      colors.splice(randomColor, 1)
    }
    this.pieces = this.pieces.concat(returnSet)
  }

  nextPiece (nb) {
    if (this.pieces[nb] === undefined) {
      this.newSet()
    }
    return (this.pieces[nb])
  }
}

module.exports = { MasterPiece }
