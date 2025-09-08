import Piece from "./Piece";

export default class Pawn extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  isValidMove(board, dst) {
    if (!super.isValidMove(board, dst)) return false;
    const diff = this.color === 0 ? 1 : -1;
    const oppColor = this.color === 0 ? 1 : 0;
    const startRow = this.color === 0 ? 1 : 6;

    if (
      this.y === startRow &&
      this.x === dst[0] &&
      dst[1] === this.y + 2 * diff
    )
      return (
        board[this.x][this.y + diff] === null &&
        board[this.x][this.y + 2 * diff] === null
      );

    if (dst[1] - this.y !== diff || Math.abs(this.x - dst[0]) > 1) return false;

    if (this.x === dst[0]) return board[dst[0]][dst[1]] === null;
    else
      return (
        board[dst[0]][dst[1]] !== null &&
        board[dst[0]][dst[1]].color === oppColor
      );
  }
}
