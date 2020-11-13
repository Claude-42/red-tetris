// const PIECE_ID = 0

const PIECE_TYPE = {
  RED: 'RED',
  BLUE: 'BLUE',
  TURQUOISE: 'TURQUOISE',
  ORANGE: 'ORANGE',
  GREEN: 'GREEN',
  PURPLE: 'PURPLE',
  YELLOW: 'YELLOW'
}

const PIECES = {
  [PIECE_TYPE.RED]: {
    internalCoordinates: [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.BLUE]: {
    internalCoordinates: [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.TURQUOISE]: {
    internalCoordinates: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.ORANGE]: {
    internalCoordinates: [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.GREEN]: {
    internalCoordinates: [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.PURPLE]: {
    internalCoordinates: [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  [PIECE_TYPE.YELLOW]: {
    internalCoordinates: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  }
}

class Piece {
  constructor (type) {
    this.type = type
    
    this.normalize()

    this.coordinateList = null
  }

  normalize () {
    const coordinateList = []

    for (let i = 0; i < this.type.internalCoordinates.length; i++) {
      for (let j = 0; j < this.type.internalCoordinates[i].length; j++) {
        if (this.type.internalCoordinates[i][j] !== 0) {
          coordinateList.push({ x: j, y: i })
        }
      }
    }

    this.coordinateList = coordinateList
  }

  //   new(nb) {
  //     if list[nb] == null
  //         generatePiece()
  //     return list[nb]

  //   }

  //   static generateRandomPiece () {
  //     const type = ''

//     return new Piece(type)
//   }
}

// Piece.generateRandomPiece()

module.exports = { Piece, PIECE_TYPE, PIECES }
