import Piece from "./Piece";
export default class Bishop extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  hasLine(dst) {
    return Math.abs(dst[0] - this.x) === Math.abs(dst[1] - this.y);
  }
  isValidMove(board, dst) {
    if (!super.isValidMove(board, dst) || !this.hasLine(dst)) return false;

    const dx = dst[0] === this.x ? 0 : dst[0] > this.x ? 1 : -1;
    const dy = dst[1] === this.y ? 0 : dst[1] > this.y ? 1 : -1;

    let x = this.x + dx;
    let y = this.y + dy;

    while (x !== dst[0] || y !== dst[1]) {
      if (board[x][y] !== null) return false;
      x += dx;
      y += dy;
    }

    return true;
  }
}
