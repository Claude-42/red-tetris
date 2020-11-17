const { Piece, PIECE_TYPE, PIECES } = require('../src/piece')

describe('The Piece class', () => {
  test('normalize method works for RED piece', () => {
    const piece = new Piece(PIECES[PIECE_TYPE.RED])

    piece.normalize()

    expect(piece.coordinateList).toStrictEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ])
  })

  test('normalize method works for PURPLE piece', () => {
    const piece = new Piece(PIECES[PIECE_TYPE.PURPLE])

    piece.normalize()

    expect(piece.coordinateList).toStrictEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ])
  })
})
