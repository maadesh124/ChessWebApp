import Piece from "./Piece";

export default class Knight extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }

  isValidMove(board, dst) {
    if (!super.isValidMove(board, dst)) return false;

    const dx = [1, -1, 2, -2];
    const dy = [1, -1, 2, -2];

    for (let i = 0; i < dx.length; i++) {
      for (let j = 0; j < dy.length; j++) {
        if (Math.abs(dx[i]) === Math.abs(dy[j])) continue;
        if (this.x + dx[i] === dst[0] && this.y + dy[j] === dst[1]) return true;
      }
    }
    return false;
  }
}
