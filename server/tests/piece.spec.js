const { Piece, PIECE_TYPE } = require('../src/piece')

describe('The Piece class', () => {
  describe('Normalize  methode', () => {
    test('normalize method works for RED piece', () => {
      const piece = new Piece('RED')

      expect(piece.coordinateList).toStrictEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ])
    })

    test('normalize method works for PURPLE piece', () => {
      const piece = new Piece('PURPLE')

      expect(piece.coordinateList).toStrictEqual([
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ])
    })
  })

  describe('toArrayNotation method', () => {
    test('transforms to array notation RED piece', () => {
      const piece = new Piece(PIECE_TYPE.RED)

      expect(piece.toArrayNotation()).toStrictEqual([
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ])
    })

    test('transforms to array notation BLUE piece', () => {
      const piece = new Piece(PIECE_TYPE.BLUE)

      expect(piece.toArrayNotation()).toStrictEqual([
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ])
    })

    test('transforms to array notation TURQUOISE piece', () => {
      const piece = new Piece(PIECE_TYPE.TURQUOISE)

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ])
    })

    test('transforms to array notation ORANGE piece', () => {
      const piece = new Piece(PIECE_TYPE.ORANGE)

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ])
    })

    test('transforms to array notation GREEN piece', () => {
      const piece = new Piece(PIECE_TYPE.GREEN)

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ])
    })

    test('transforms to array notation PURPLE piece', () => {
      const piece = new Piece(PIECE_TYPE.PURPLE)

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ])
    })

    test('transforms to array notation YELLOW piece', () => {
      const piece = new Piece(PIECE_TYPE.YELLOW)

      expect(piece.toArrayNotation()).toStrictEqual([
        [1, 1],
        [1, 1]
      ])
    })
  })

  describe('right rotation method', () => {
    describe('BLUE rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.BLUE)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.BLUE)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.BLUE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.BLUE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0]
        ])
      })
    })

    /**
     * -----------------------------------------------------------------
     */

    describe('RED rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.RED)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.RED)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.RED)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [1, 1, 0],
          [1, 0, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.RED)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
        ])
      })
    })

    describe('TURQUOISE rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ])
      })
    })

    describe('ORANGE rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.ORANGE)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.ORANGE)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0],
          [1, 1, 1],
          [1, 0, 0]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.ORANGE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.ORANGE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0]
        ])
      })
    })

    /**
     * --------------------------------------------------------------------------------
     */

    describe('GREEN rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.GREEN)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 1]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.GREEN)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0],
          [0, 1, 1],
          [1, 1, 0]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.GREEN)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.GREEN)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0]
        ])
      })
    })

    describe('PURPLE rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.PURPLE)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.PURPLE)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.PURPLE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.PURPLE)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
        ])
      })
    })

    describe('YELLOW rotation', () => {
      test('rotate ONE time', () => {
        const piece = new Piece(PIECE_TYPE.YELLOW)

        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1],
          [1, 1]
        ])
      })

      test('rotate TWO times', () => {
        const piece = new Piece(PIECE_TYPE.YELLOW)

        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1],
          [1, 1]
        ])
      })

      test('rotate THREE times', () => {
        const piece = new Piece(PIECE_TYPE.YELLOW)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1],
          [1, 1]
        ])
      })

      test('rotate FOUR times', () => {
        const piece = new Piece(PIECE_TYPE.YELLOW)

        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()

        expect(piece.toArrayNotation()).toStrictEqual([
          [1, 1],
          [1, 1]
        ])
      })
    })
  })
})
