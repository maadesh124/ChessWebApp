import Piece from "./Piece";
import Bishop from "./Bishop";
import Rook from "./Rook";

export default class Queen extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
    this.rook = new Rook(color, x, y);
    this.bishop = new Bishop(color, x, y);
  }
  static isReachable(src, dst) {
    return Bishop.isReachable(src, dst) || Rook.isReachable(src, dst);
  }
  static next(src, dst) {
    if (super.next(src, dst) !== undefined) return super.next(src, dst);
    if (Bishop.isReachable(src, dst)) return Bishop.next(src, dst);
    return Rook.next(src, dst);
  }

  // isValidMove(board, dst) {
  //   this.syncPos();
  //   return super.isValidMove(board, dst);
  // }

  syncPos() {
    this.rook.x = this.x;
    this.rook.y = this.y;
    this.bishop.x = this.x;
    this.bishop.y = this.y;
  }

  // getPath(board, dst) {
  //   this.syncPos();
  //   super.getPath(board, dst);
  // }
}
