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
  [PIECE_TYPE.RED]: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [PIECE_TYPE.BLUE]: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [PIECE_TYPE.TURQUOISE]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [PIECE_TYPE.ORANGE]: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [PIECE_TYPE.GREEN]: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [PIECE_TYPE.PURPLE]: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [PIECE_TYPE.YELLOW]: [
    [1, 1],
    [1, 1]
  ]
}

class Piece {
  constructor (color) {
    this.color = color

    this.innerCoordinates = PIECES[color]

    this.coordinateList = null

    this.globalCoordinates = { x: 0, y: 3 }

    this.normalize()
  }

  normalize () {
    const coordinateList = []

    for (let i = 0; i < this.innerCoordinates.length; i++) {
      for (let j = 0; j < this.innerCoordinates[i].length; j++) {
        if (this.innerCoordinates[i][j] !== 0) {
          coordinateList.push({ x: j, y: i })
        }
      }
    }

    this.coordinateList = coordinateList

    this.size = this.innerCoordinates[0].length
  }

  rightRotation () {
    this.coordinateList = this.coordinateList.map(({ x, y }) => {
      const xNew = 1 - (y - (this.size - 2))

      return {
        y: x,
        x: xNew
      }
    })
  }

  toArrayNotation () {
    const BASE_ARRAY = Array(this.size).fill().map(() => Array(this.size).fill())

    return BASE_ARRAY.map((row, rowIndex) => row.map((_, colIndex) => {
      const foundPiecePart = this.coordinateList.some(({ x, y }) => x === colIndex && y === rowIndex)

      return foundPiecePart ? 1 : 0
    }))
  }

  toString () {
    return this.toArrayNotation().join('\n')
  }

  // x_new = 1 - (y_old - (size - 2))
  // y_new = x_old
}

const piece = new Piece(PIECE_TYPE.ORANGE)

console.log(piece.toArrayNotation(), PIECES[PIECE_TYPE.ORANGE])

module.exports = { Piece, PIECE_TYPE }
