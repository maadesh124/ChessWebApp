import Piece from "./Piece.js";
import { isValid } from "../Helper.js";

export default class Rook extends Piece {
  static dx = [-1, 1, 0, 0];
  static dy = [0, 0, -1, 1];
  constructor(color, x, y) {
    super(color, x, y);
    this.moved = false;
  }
  updateAttackSquares(board) {
    super.updateSlidingAttackSquares(board, Rook.dx, Rook.dy);
  }
}
