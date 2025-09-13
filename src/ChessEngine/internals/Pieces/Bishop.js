import Piece from "./Piece.js";
export default class Bishop extends Piece {
  static dx = [-1, -1, 1, 1];
  static dy = [-1, 1, -1, 1];
  constructor(color, x, y) {
    super(color, x, y, "Bishop");
  }

  updateAttackSquares(board) {
    super.updateSlidingAttackSquares(board, Bishop.dx, Bishop.dy);
  }
}
