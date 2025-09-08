import Piece from "./Piece";

export default class King extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  hasLine(dst) {
    return Math.abs(this.x - dst[0]) <= 1 && Math.abs(this.y - dst[1]) <= 1;
  }

  isValidMove(board, dst) {
    return super.isValidMove(board, dst) && this.hasLine(dst);
  }
}
