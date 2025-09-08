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

  getPath(board, dst) {
    if (!isValid(this.x, this.y) || !isValid(dst[0], dst[1])) return null;

    if (this.x !== dst[0] && this.y !== dst[1]) return null;
    let path = [];
    const dx = Math.sign(dst[0] - this.x);
    const dy = Math.sign(dst[1] - this.y);
    let x = this.x + dx,
      y = this.y + dy;
    while (x !== dst[0] || y !== dst[1]) {
      if (board[x][y] !== null) path.push(board[x][y]);
      x += dx;
      y += dy;
    }
    return path;
  }
}
