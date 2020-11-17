import { ref } from "vue";

import { PIECE_MOVEMENTS } from "../constants/piece.js";

export function usePiece() {
  const piece = ref(null);

  function createPiece() {
    piece.value = {
      coordinates: {
        x: 0,
        y: 0
      },
      innerCoordinates: [
        {
          x: 0,
          y: 0
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1,
          y: 1
        },
        {
          x: 2,
          y: 1
        }
      ]
    };
  }

  function move(movement) {
    if (piece.value === null) {
      throw new Error("Can not move uninitialized piece");
    }

    switch (movement) {
      case PIECE_MOVEMENTS.RIGHT:
        piece.value.coordinates.x + 1;
        break;
      case PIECE_MOVEMENTS.LEFT:
        piece.value.coordinates.x - 1;
        break;
      case PIECE_MOVEMENTS.DOWN:
        piece.value.coordinates.y + 1;
        break;
      case PIECE_MOVEMENTS.FALL:
        piece.value.coordinates.y = 16;
        break;
      default:
        throw new Error("Invalid movement");
    }
  }

  return {
    piece,
    createPiece,
    move
  };
}
