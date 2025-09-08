import { isValid, colorOf } from "./Helper";
export default class Piece {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  isValidMove(board, dst) {
    if (
      !isValid(this.x, this.y) ||
      !isValid(dst[0], dst[1]) ||
      (board[dst[0]][dst[1]] !== null &&
        board[dst[0]][dst[1]].color === this.color) ||
      // (board[dst[0]][dst[1]] !== null &&
      //   board[dst[0]][dst[1]].constructor.name === "King") ||
      (this.x === dst[0] && this.y === dst[1])
    )
      return false;
    return true;
  }

  canAttack(board, dst) {
    return this.isValidMove(board, dst);
  }

  getPath(
    board,
    dst //excluding src and dst
  ) {
    return null;
  }
}
