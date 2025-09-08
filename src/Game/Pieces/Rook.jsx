import Piece from "./Piece";

export default class Rook extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
    this.moved = false;
  }

  hasLine(dst) {
    return this.x === dst[0] || this.y === dst[1];
  }
  isValidMove(board, dst) {
    if (!super.isValidMove(board, dst) || !this.hasLine(dst)) return false;

    if (this.x === dst[0]) {
      const min = Math.min(this.y, dst[1]);
      const max = Math.max(this.y, dst[1]);
      let yc = min + 1;
      while (yc < max) {
        if (board[x][yc] !== null) return false;
        yc++;
      }
    }

    if (this.y === dst[1]) {
      const min = Math.min(this.x, dst[0]);
      const max = Math.max(this.x, dst[0]);
      let xc = min + 1;
      while (xc < max) {
        if (board[xc][y] !== null) return false;
        xc++;
      }
    }

    return true;
  }
}
