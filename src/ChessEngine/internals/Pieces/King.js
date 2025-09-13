import Piece from "./Piece.js";
import { isValid } from "../Helper.js";

export default class King extends Piece {
  constructor(color, x, y) {
    super(color, x, y, "King");
    this.moved = false;
  }

  updateAttackSquares(board) {
    this.attackSquares = [];
    const dx = [-1, 0, 1];
    const dy = [-1, 0, 1];
    for (let i = 0; i < dx.length; i++) {
      for (let j = 0; j < dy.length; j++) {
        if (dx[i] === 0 && dy[j] === 0) continue;
        let cur = [this.x + dx[i], this.y + dy[j]];
        if (isValid(cur)) this.attackSquares.push(cur);
      }
    }
  }

  canCastle(board, dst) {
    if (board.isCheck(this.color)) return false;

    const rank = this.color === 0 ? 0 : 7;
    if (this.y !== rank || (dst[0] !== 6 && dst[0] !== 2)) return false;

    const rookX = dst[0] === 6 ? 7 : 0;
    const rook = board.pieces[rookX][rank];
    if (
      !rook ||
      rook.type !== "Rook" ||
      rook.color !== this.color ||
      rook.moved ||
      this.moved
    )
      return false;

    const dx = rookX < this.x ? -1 : 1;
    for (let x = this.x + dx; x !== rookX; x += dx) {
      if (board.pieces[x][rank] != null) return false;
    }

    let kingX = this.x;
    const attackingColor = this.color === 0 ? 1 : 0;
    while (true) {
      if (board.isCheck(attackingColor)) {
        const tempX = kingX;
        board.pieces[tempX][rank] = this;
        if (board.isCheck(this.color)) {
          board.pieces[tempX][rank] = null;
          return false;
        }
        board.pieces[tempX][rank] = null;
      }
      if (kingX === dst[0]) break;
      kingX += dx;
    }

    return true;
  }

  castle(board, dst) {
    if (!this.canCastle(board, dst)) return false;

    const rank = this.color === 0 ? 0 : 7;
    const rookX = dst[0] === 6 ? 7 : 0;
    const rookDstX = dst[0] === 6 ? 5 : 3;
    const rook = board.pieces[rookX][rank];

    board.pieces[this.x][rank] = null;
    board.pieces[rookX][rank] = null;

    this.x = dst[0];
    this.y = rank;
    board.pieces[this.x][rank] = this;
    this.moved = true;

    rook.x = rookDstX;
    rook.y = rank;
    board.pieces[rook.x][rank] = rook;
    rook.moved = true;

    board.updateAttackSquaresAll(this);
    return true;
  }
}
