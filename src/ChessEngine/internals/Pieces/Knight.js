import Piece from "./Piece.js";
import { isValid } from "../Helper.js";

export default class Knight extends Piece {
  constructor(color, x, y) {
    super(color, x, y, "Knight");
  }
  updateAttackSquares(board) {
    this.attackSquares = [];
    const dx = [-1, 1, -2, 2];
    const dy = [-1, 1, -2, 2];
    for (let i = 0; i < dx.length; i++) {
      for (let j = 0; j < dy.length; j++) {
        if (Math.abs(dx[i]) === Math.abs(dy[j])) continue;
        let cur = [this.x + dx[i], this.y + dy[j]];
        if (isValid(cur)) this.attackSquares.push(cur);
      }
    }
  }
}
