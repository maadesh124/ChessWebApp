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
    if (
      !this.validate(board, dst) ||
      !this.constructor.isReachable([this.x, this.y], dst)
    )
      return false;

    let cur = this.constructor.next([this.x, this.y], dst);
    while (!(cur[0] === dst[0] && cur[1] === dst[1])) {
      if (board[cur[0]][cur[1]] !== null) return false;
      cur = this.constructor.next(cur, dst);
    }

    return true;
  }

  //always use this after checking reachability
  static next(src, dst) {
    if (!isValid(src[0], src[1]) || !isValid(dst[0], dst[1])) return null;
    if (src[0] === dst[0] && src[1] === dst[1]) return [dst[0], dst[1]];
    if (!this.isReachable(src, dst)) return null;
    return undefined;
  }
  static isReachable(src, dst) {}

  canAttack(board, dst) {
    // only valid when called on empty square or square contains opponent piece
    return this.isValidMove(board, dst);
  }

  isSlidingPiece() {
    return (
      this.constructor.name === "Rook" ||
      this.constructor.name === "Bishop" ||
      this.constructor.name === "Queen"
    );
  }

  getPath(board, dst) {
    if (
      !this.validate(board, dst) ||
      !this.constructor.isReachable([this.x, this.y], dst)
    )
      return null;
    if (!this.isSlidingPiece()) return [];
    let path = [];
    let cur = this.constructor.next([this.x, this.y], dst);
    while (!(cur[0] === dst[0] && cur[1] === dst[1])) {
      if (board[cur[0]][cur[1]] !== null) path.push(board[cur[0]][cur[1]]);
      cur = this.constructor.next(cur, dst);
    }
    return path;
  }
}
