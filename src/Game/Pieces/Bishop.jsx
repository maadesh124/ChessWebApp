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

  getPath(board, dst) {
    if (!isValid(this.x, this.y) || !isValid(dst[0], dst[1])) return null;
    const dx = dst[0] - this.x;
    const dy = dst[1] - this.y;

    // Check if move is diagonal
    if (Math.abs(dx) !== Math.abs(dy)) return null;

    let path = [];
    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    let x = this.x + stepX;
    let y = this.y + stepY;

    while (x !== dst[0] && y !== dst[1]) {
      if (board[x][y] !== null) path.push(board[x][y]);
      x += stepX;
      y += stepY;
    }

    return path; // empty array if path is clear
  }
}
