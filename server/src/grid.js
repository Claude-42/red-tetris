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
    this.piece = undefined
    this.nextPiece()
    this.score = 0
  }

  popLine () {
    const rowsToKeep = this.lockGrid.filter(
      (row) => row.some(
        col => [CASE_COLOR.EMPTY, CASE_COLOR.BLOCKED].includes(col)
      )
    )
    const deletedRowsCount = 20 - rowsToKeep.length

    if (deletedRowsCount === 0) {
      return 0
    }

    this.lockGrid = Array(deletedRowsCount)
      .fill()
      .map(() =>
        Array(10)
          .fill(0)
      ).concat(rowsToKeep)

    switch (deletedRowsCount) {
      case 1:
        this.score += 40
        break
      case 2:
        this.score += 100
        break
      case 3:
        this.score += 300
        break
      case 4:
        this.score += 1200
        break
    }
    return deletedRowsCount
  }

  nextPiece () {
    this.currentPiece++
    const nextPieceType = this.masterPiece.nextPiece(this.currentPiece)
    const nextPiece = new Piece(nextPieceType)

    if (!nextPiece.isIntersecting(this.lockGrid)) {
      this.piece = nextPiece
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
        this.score++
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
        while (this.canApplyMove(MOVE.DOWN)) {
          this.piece.goDown()
          this.score += 2
        }
        break
      }
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
    }

    return !(
      tmpPiece.isOutsideBoundingBox(this.lockGrid) ||
      tmpPiece.isIntersecting(this.lockGrid)
    )
  }

  makeMeShadow () {
    function invertGridAxis (grid) {
      const xLength = grid[0].length
      const yLength = grid.length

      return Array(xLength)
        .fill()
        .map(
          (_, colIndex) => Array(yLength)
            .fill()
            .map((_, rowIndex) => grid[rowIndex][colIndex])
        )
    }

    const invertedLockGrid = invertGridAxis(this.lockGrid)

    const invertedLockGridWithFilledColumns = invertedLockGrid.map((column, colIndex) => {
      const firstFullBlock = column.findIndex((row) => row !== CASE_COLOR.EMPTY)
      if (firstFullBlock === -1) {
        return column
      }

      return column
        .map((_, rowIndex) => rowIndex >= firstFullBlock ? CASE_COLOR.BLOCKED : CASE_COLOR.EMPTY)
    })

    return invertGridAxis(invertedLockGridWithFilledColumns)
  }

  blockLine (numberBlockedLines) {
    const blockedGrid = Array(numberBlockedLines)
      .fill()
      .map(() =>
        Array(10)
          .fill(CASE_COLOR.BLOCKED)
      )

    const addingBlockedLinesWouldMakeUserLooseGame = blockedGrid.some(
      (_, blockedRowIndex) => this.lockGrid[blockedRowIndex].some(
        caseColor => caseColor !== CASE_COLOR.EMPTY
      )
    )
    if (addingBlockedLinesWouldMakeUserLooseGame) {
      return 'GAME_OVER'
    }

    this.lockGrid = [
      ...this.lockGrid.slice(numberBlockedLines),
      ...blockedGrid
    ]

    return 'OK'
  }
}

module.exports = { Grid, MOVE, CASE_COLOR }
