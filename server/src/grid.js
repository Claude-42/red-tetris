const { Piece } = require('../src/piece')

const MOVE = {
  DOWN: 'DOWN',
  FALL: 'FALL',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  ROTATE: 'ROTATE'
}

const CASE_COLOR = {
  RED: 2,
  BLUE: 3,
  TURQUOISE: 4,
  ORANGE: 5,
  GREEN: 6,
  PURPLE: 7,
  YELLOW: 8,

  BLOCKED: 9,
  EMPTY: 0
}

class Grid {
  constructor (masterPiece) {
    this.lockGrid = Array(20)
      .fill()
      .map(() =>
        Array(10)
          .fill(0)
      )

    this.masterPiece = masterPiece

    this.currentPiece = -1
    this.nextPiece(masterPiece)
  }

  nextPiece () {
    this.currentPiece++
    const nextPiece = this.masterPiece.nextPiece(this.currentPiece)
    this.piece = new Piece(nextPiece)
    if (!this.piece.isIntersecting(this.lockGrid)) {
      return false
    }
    return true
  }

  putPieceInGrid () {
    const pieceCoordinates = this.piece.toGlobalCoordinates()

    pieceCoordinates.forEach(({ x, y }) => {
      this.lockGrid[y][x] = CASE_COLOR[this.piece.color]
    })
  }

  simulatePieceInGrid () {
    const pieceCoordinates = this.piece.toGlobalCoordinates()

    return this.lockGrid.map((row, rowIndex) => row.map((color, columnIndex) => {
      const pieceOverlapsGridCase = pieceCoordinates.some(({ x, y }) => x === columnIndex && y === rowIndex)
      if (pieceOverlapsGridCase) {
        return CASE_COLOR[this.piece.color]
      }

      return color
    }))
  }

  handleMove (move) {
    const canApplyMove = this.canApplyMove(move)
    if (canApplyMove) {
      this.applyMove(move)
    }

    return {
      status: canApplyMove ? 'SUCCESS' : 'ERROR'
    }
  }

  applyMove (move) {
    switch (move) {
      case MOVE.DOWN:
        this.piece.goDown()
        break
      case MOVE.LEFT:
        this.piece.goLeft()
        break
      case MOVE.RIGHT:
        this.piece.goRight()
        break
      case MOVE.ROTATE:
        this.piece.applyRotationAndRecalibrate()
        break
      case MOVE.FALL: {
        let i = 0
        while (this.canApplyMove(MOVE.DOWN) && i < 100) {
          this.piece.goDown()
          i++
        }
        break
      }
      default:
        throw new Error('Received unknown move')
    }
  }

  canApplyMove (move) {
    const tmpPiece = this.piece.clone()

    switch (move) {
      case MOVE.FALL:
        return true
      case MOVE.DOWN:
        tmpPiece.goDown()
        break
      case MOVE.LEFT:
        tmpPiece.goLeft()
        break
      case MOVE.RIGHT:
        tmpPiece.goRight()
        break
      case MOVE.ROTATE:
        tmpPiece.applyRotationAndRecalibrate()
        break
      default:
        throw new Error('Received unknown move')
    }

    return !(
      tmpPiece.isOutsideBoundingBox(this.lockGrid) ||
      tmpPiece.isIntersecting(this.lockGrid)
    )
  }
}

module.exports = { Grid, MOVE }
