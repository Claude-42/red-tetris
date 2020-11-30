const { Piece, PIECE_TYPE } = require('../src/piece')

describe('The Piece class', () => {
  test('is initialized at the right place', () => {
    const piece = new Piece(PIECE_TYPE.RED)

    expect(piece.globalCoordinates).toStrictEqual({
      x: 3,
      y: 0
    })
  })

  describe('Normalize method', () => {
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

  describe('goDown method', () => {
    test('one down for a purple piece', () => {
      const piece = new Piece(PIECE_TYPE.PURPLE)
      piece.goDown()

      expect(piece.globalCoordinates).toStrictEqual({ x: 3, y: 1 })
    })
  })

  describe('goLeft method', () => {
    test('one left for a purple piece', () => {
      const piece = new Piece(PIECE_TYPE.PURPLE)
      piece.goLeft()

      expect(piece.globalCoordinates).toStrictEqual({ x: 2, y: 0 })
    })
  })

  describe('goRight method', () => {
    test('moves piece to one case on right', () => {
      const piece = new Piece(PIECE_TYPE.PURPLE)

      piece.goRight()

      expect(piece.globalCoordinates).toStrictEqual({ x: 4, y: 0 })
    })
  })

  describe('the clone method', () => {
    test('returns an instance of Piece class', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece).toBeInstanceOf(Piece)
    })

    test('creates a new instance of Piece class', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece).not.toBe(originalPiece)
    })

    test('creates a new instance of Piece class with same properties than the original', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece).toStrictEqual(originalPiece)
    })

    test('creates a deep copy of innerCoordinates property', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece.innerCoordinates).not.toBe(originalPiece.innerCoordinates)

      for (let index = 0; index < clonedPiece.length; index++) {
        expect(clonedPiece.innerCoordinates[index]).not.toBe(originalPiece.innerCoordinates[index])
      }
    })

    test('creates a deep copy of coordinateList property', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece.coordinateList).not.toBe(originalPiece.coordinateList)

      for (let index = 0; index < clonedPiece.length; index++) {
        expect(clonedPiece.coordinateList[index]).not.toBe(originalPiece.coordinateList[index])
      }
    })

    test('creates a deep copy of globalCoordinates property', () => {
      const originalPiece = new Piece(PIECE_TYPE.RED)
      const clonedPiece = originalPiece.clone()

      expect(clonedPiece.globalCoordinates).not.toBe(originalPiece.globalCoordinates)
    })
  })

  describe('isIntersecting method', () => {
    test('detects no intersection', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]

      expect(piece.isIntersecting(grid)).toEqual(false)
    })

    test('detects one intersection', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]

      expect(piece.isIntersecting(grid)).toEqual(true)
    })

    test('detects two intersections', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      const grid = [
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]

      expect(piece.isIntersecting(grid)).toEqual(true)
    })

    test('detects several intersections', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      const grid = [
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]

      expect(piece.isIntersecting(grid)).toEqual(true)
    })
  })

  describe('isOutsideBoundingBox method', () => {
    test('detects no Outside Bounding Box', () => {
      const piece = new Piece(PIECE_TYPE.RED)

      expect(piece.isOutsideBoundingBox()).toEqual(false)
    })

    test('detects Outside Bounding Box on the right', () => {
      const piece = new Piece(PIECE_TYPE.RED)

      piece.globalCoordinates = { x: 8, y: 2 }

      expect(piece.isOutsideBoundingBox()).toEqual(true)
    })

    test('detects Outside Bounding Box on the left', () => {
      const piece = new Piece(PIECE_TYPE.TURQUOISE)

      piece.globalCoordinates = { x: -1, y: 10 }

      expect(piece.isOutsideBoundingBox()).toEqual(true)
    })

    test('detects Outside Bounding Box on the top', () => {
      const piece = new Piece(PIECE_TYPE.TURQUOISE)

      piece.globalCoordinates = { x: 3, y: -2 }

      expect(piece.isOutsideBoundingBox()).toEqual(true)
    })

    test('detects Outside Bounding Box on the bottom', () => {
      const piece = new Piece(PIECE_TYPE.RED)

      piece.globalCoordinates = { x: 5, y: 19 }

      expect(piece.isOutsideBoundingBox()).toEqual(true)
    })
  })

  describe('applyRotationAndRecalibrate method', () => {
    test('moves piece from right border by one move to rotate it', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      piece.globalCoordinates = { x: 8, y: 5 }
      piece.innerCoordinates = [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ]
      piece.normalize()

      piece.applyRotationAndRecalibrate()

      expect(piece.toArrayNotation()).toStrictEqual([
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ])
      expect(piece.globalCoordinates).toStrictEqual({
        x: 7,
        y: 5
      })
    })

    test('moves piece from right border by two moves to rotate it', () => {
      const piece = new Piece(PIECE_TYPE.TURQUOISE)
      piece.globalCoordinates = { x: 8, y: 5 }
      piece.innerCoordinates = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ]
      piece.normalize()

      piece.applyRotationAndRecalibrate()

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ])
      expect(piece.globalCoordinates).toStrictEqual({
        x: 6,
        y: 5
      })
    })

    test('moves piece from left border by one move to rotate it', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      piece.globalCoordinates = { x: -1, y: 5 }
      piece.innerCoordinates = [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
      ]
      piece.normalize()

      piece.applyRotationAndRecalibrate()

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
      ])
      expect(piece.globalCoordinates).toStrictEqual({
        x: 0,
        y: 5
      })
    })

    test('moves piece from left border by two moves to rotate it', () => {
      const piece = new Piece(PIECE_TYPE.TURQUOISE)
      piece.globalCoordinates = { x: -2, y: 5 }
      piece.innerCoordinates = [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ]
      piece.normalize()

      piece.applyRotationAndRecalibrate()

      expect(piece.toArrayNotation()).toStrictEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ])
      expect(piece.globalCoordinates).toStrictEqual({
        x: 0,
        y: 5
      })
    })
  })

  // --------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------

  describe('calculateDiffToPlacePieceCorrectlyInGrid method', () => {
    describe('no diff', () => {
      test('2x2 piece', () => {
        const piece = new Piece(PIECE_TYPE.YELLOW)

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(0)
      })
      test('3x3 piece', () => {
        const piece = new Piece(PIECE_TYPE.RED)

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(0)
      })
      test('4x4 piece', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(0)
      })
    })
    describe('1 diff right side', () => {
      test('3x3 piece', () => {
        const piece = new Piece(PIECE_TYPE.RED)
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.globalCoordinates = { x: 8, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(1)
      })
      test('4x4 piece', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)
        piece.rightRotation()
        piece.globalCoordinates = { x: 7, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(1)
      })
    })
    describe('2 diff right side', () => {
      test('4x4 piece', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)
        piece.rightRotation()
        piece.rightRotation()
        piece.rightRotation()
        piece.globalCoordinates = { x: 8, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(2)
      })
    })
    describe('1 diff left side', () => {
      test('3x3 piece', () => {
        const piece = new Piece(PIECE_TYPE.RED)
        piece.rightRotation()
        piece.globalCoordinates = { x: -1, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(-1)
      })
      test('4x4 piece', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)
        piece.rightRotation()
        piece.globalCoordinates = { x: -1, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(-1)
      })
    })
    describe('2 diff right side', () => {
      test('2 diff with 4x4 piece', () => {
        const piece = new Piece(PIECE_TYPE.TURQUOISE)
        piece.rightRotation()
        piece.globalCoordinates = { x: -2, y: 0 }

        expect(piece.calculateDiffToPlacePieceCorrectlyInGrid()).toEqual(-2)
      })
    })
  })
  describe('toString method', () => {
    test('toArray red', () => {
      const piece = new Piece(PIECE_TYPE.RED)
      expect(piece.toString()).toStrictEqual('1,1,0\n0,1,1\n0,0,0')
    })
  })
})
