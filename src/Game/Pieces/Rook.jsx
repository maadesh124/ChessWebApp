import Piece from "./Piece";
import { isValid } from "../Helper";

export default class Rook extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
    this.moved = false;
  }

  static isReachable(src, dst) {
    if (src[0] !== dst[0] && src[1] !== dst[1]) return false;
    return true;
  }
  static next(src, dst) {
    if (super.next(src, dst) !== undefined) return super.next(src, dst);

    const dx = Math.sign(dst[0] - this.x);
    const dy = Math.sign(dst[1] - this.y);
    return [src[0] + dx, src[1] + dy];
  }

  // isValidMove(board, dst) {
  //   if (
  //     !super.isValidMove(board, dst) ||
  //     !Rook.isReachable([this.x, this.y], dst)
  //   )
  //     return false;

  //   let cur = next([this.x, this.y], dst);
  //   while (cur != null) {
  //     if (board[cur[0]][cur[1]] !== null) return false;
  //     cur = Rook.next(cur, dst);
  //   }

  //   return true;
  // }

  // getPath(board, dst) {
  //   if (
  //     !super.validate(board, dst) ||
  //     !this.constructor.isReachable([this.x, this.y], dst)
  //   )
  //     return null;
  //   let path = [];
  //   let cur = this.constructor.next([this.x, this.y], dst);
  //   while (cur !== 1) {
  //     if (board[cur[0]][cur[1]] !== null) path.push(board[cur[0]][cur[1]]);
  //     cur = this.constructor.next(cur, dst);
  //   }
  //   return path;
  // }
}
