import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  static isReachable(src, dst) {
    const dx = Math.abs(src[0] - dst[0]);
    const dy = Math.abs(src[1] - dst[1]);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }

  isValidMove(board, dst) {
    if (!super.validate(board, dst)) return false;
    return Knight.isReachable([this.x, this.y], dst);
  }
}
