import Piece from "./Piece";
export default class Bishop extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  static isReachable(src, dst) {
    return Math.abs(dst[0] - src[0]) === Math.abs(dst[1] - src[1]);
  }

  static next(src, dst) {
    if (super.next(src, dst) !== undefined) return super.next(src, dst);
    const dx = Math.sign(dst[0] - src[0]);
    const dy = Math.sign(dst[0] - src[0]);
    return [src[0] + dx, src[1] + dy];
  }

  // isValidMove(board, dst) {
  //   if (
  //     !super.isValidMove(board, dst) ||
  //     !Bishop.isReachable([this.x, this.y], dst)
  //   )
  //     return false;

  //   let cur = next([this.x, this.y], dst);
  //   while (cur != null) {
  //     if (board[cur[0]][cur[1]] !== null) return false;
  //     cur = Bishop.next(cur, dst);
  //   }
  //   return true;
  // }

  // getPath(board, dst) {
  //   if (!isValid(this.x, this.y) || !isValid(dst[0], dst[1])) return null;
  //   const dx = dst[0] - this.x;
  //   const dy = dst[1] - this.y;

  //   if (Math.abs(dx) !== Math.abs(dy)) return null;

  //   let path = [];
  //   const stepX = dx > 0 ? 1 : -1;
  //   const stepY = dy > 0 ? 1 : -1;
  //   let x = this.x + stepX;
  //   let y = this.y + stepY;

  //   while (x !== dst[0] && y !== dst[1]) {
  //     if (board[x][y] !== null) path.push(board[x][y]);
  //     x += stepX;
  //     y += stepY;
  //   }

  //   return path;
  // }
}
