import { isValid, colorOf } from "./Helper";
export default class Piece {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.pinned = false;
  }

  validate(board, dst) {
    if (
      !isValid(this.x, this.y) ||
      !isValid(dst[0], dst[1]) ||
      (board[dst[0]][dst[1]] !== null &&
        board[dst[0]][dst[1]].color === this.color) ||
      (this.x === dst[0] && this.y === dst[1])
    )
      return false;
    return true;
  }
  isValidMove(board, dst) {
    if (!this.validate(board, dst) || !isReachable([this.x, this.y], dst))
      return false;

    let cur = this.constructor.next([this.x, this.y], dst);
    while (cur != 1) {
      if (board[cur[0]][cur[1]] !== null) return false;
      cur = this.constructor.next(cur, dst);
    }

    return true;
  }

  static next(src, dst) {
    if (!isValid(src[0], src[1]) || !isValid(dst[0], dst[1])) return 0;
    if (src[0] === dst[0] && src[1] === dst[1]) return 1;
    if (!this.isReachable(src, dst)) return 0;
    return undefined;
  }
  static isReachable(src, dst) {}

  canAttack(board, dst) {
    // only valid when called on empty square or square contains opponent piece
    return this.isValidMove(board, dst);
  }

  getPath(board, dst) {
    if (
      !super.validate(board, dst) ||
      !this.constructor.isReachable([this.x, this.y], dst)
    )
      return null;
    let path = [];
    let cur = this.constructor.next([this.x, this.y], dst);
    while (cur !== 1) {
      if (board[cur[0]][cur[1]] !== null) path.push(board[cur[0]][cur[1]]);
      cur = this.constructor.next(cur, dst);
    }
    return path;
  }
}
