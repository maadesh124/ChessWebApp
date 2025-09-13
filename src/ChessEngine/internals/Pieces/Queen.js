import Piece from "./Piece.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";

export default class Queen extends Piece {
  static dx = [...Rook.dx, ...Bishop.dx];
  static dy = [...Rook.dy, ...Bishop.dy];
  constructor(color, x, y) {
    super(color, x, y);
  }

  updateAttackSquares(board) {
    super.updateSlidingAttackSquares(board, Queen.dx, Queen.dy);
  }
}
