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

    this.globalCoordinates = { x: 3, y: 0 }

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

  applyRotationAndRecalibrate () {
    const diff = this.calculateDiffToPlacePieceCorrectlyInGrid()
    const iterationsToPerform = Math.abs(diff)
    const functionToCall = diff >= 0 ? () => this.goLeft() : () => this.goRight()

    for (let count = 0; count < iterationsToPerform; count++) {
      functionToCall()
    }
    this.rightRotation()
  }

  goDown () {
    this.globalCoordinates.y++
  }

  goLeft () {
    this.globalCoordinates.x--
  }

  goRight () {
    this.globalCoordinates.x++
  }

  isIntersecting (grid) {
    const pieceGlobalCoordinates = this.toGlobalCoordinates()

    return pieceGlobalCoordinates.some(({ x, y }) => grid[y][x] !== 0)
  }

  isOutsideBoundingBox () {
    const pieceGlobalCoordinates = this.toGlobalCoordinates()

    return pieceGlobalCoordinates.some(({ x, y }) => x > 9 || x < 0 || y > 19 || y < 0)
  }

  calculateDiffToPlacePieceCorrectlyInGrid () {
    if (this.globalCoordinates.x === 8 && this.size > 2) {
      return (this.size - 2)
    }

    if (this.globalCoordinates.x === 7 && this.size === 4) {
      return 1
    }

    if (this.globalCoordinates.x === -1 && this.size > 2) {
      return -1
    }

    if (this.globalCoordinates.x === -2 && this.size === 4) {
      return -2
    }

    return 0
  }

  toString () {
    return this.toArrayNotation().join('\n')
  }

  toArrayNotation () {
    const BASE_ARRAY = Array(this.size).fill().map(() => Array(this.size).fill())

    return BASE_ARRAY.map((row, rowIndex) => row.map((_, colIndex) => {
      const foundPiecePart = this.coordinateList.some(({ x, y }) => x === colIndex && y === rowIndex)

      return foundPiecePart ? 1 : 0
    }))
  }

  toGlobalCoordinates () {
    return this.coordinateList.map(({ x, y }) => {
      return {
        x: x + this.globalCoordinates.x,
        y: y + this.globalCoordinates.y
      }
    })
  }

  clone () {
    const clonedPiece = new Piece(this.color)

    clonedPiece.innerCoordinates = this.toArrayNotation()
    clonedPiece.normalize()
    clonedPiece.globalCoordinates = { ...this.globalCoordinates }

    return clonedPiece
  }
}

module.exports = { Piece, PIECE_TYPE, PIECES }
