// function generateVirginGrid () {
//   const COLUMNS_COUNT = 10
//   const ROWS_COUNT = 20
//   const EMPTY_VALUE = 0

//   return Array(ROWS_COUNT).fill().map(() => Array(COLUMNS_COUNT).fill(EMPTY_VALUE))
// }

class Grid {
  constructor () {
    this.grid = []
  }

  spawnNewPiece () {
    const piece = new Piece()

    this.grid.push(piece)
  }
}

class Player {
  constructor (name) {
    this.name = name
    this.grid = new Grid()
    // this.grid = generateVirginGrid()
  }
}

/**
 * [
  new Piece(),
  new Piece(),
  new Piece(),
  new Piece(),
  new Piece(),
  new Piece(),
  new Piece()
]

const piece = array[0]

piece.position = { x: 0, y: 0 }
piece.position.y++

piece.move('UP')

for (const piece of array) {
  piece.intersect()
}

 */
