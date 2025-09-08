import Piece from "./Piece";

export default class King extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
    this.moved = false;
  }

  hasLine(dst) {
    return Math.abs(this.x - dst[0]) <= 1 && Math.abs(this.y - dst[1]) <= 1;
  }

  isValidMove(board, dst) {
    if (this.canCastle(board, dst)) return true;
    return super.isValidMove(board, dst) && this.hasLine(dst);
  }

  canCastle(board, dst) {
    if (this.color === 0 && (dst[1] !== 0 || (dst[0] !== 6 && dst[0] !== 2)))
      return false;

    if (this.color === 1 && (dst[1] !== 7 || (dst[0] !== 6 && dst[0] !== 2)))
      return false;

    let rookX;
    if (dst[0] === 6) rookX = 7;
    else rookX = 0;

    let rook = board[rookX][this.y];
    if (
      rook === null ||
      rook.constructor.name !== "Rook" ||
      rook.color !== this.color ||
      rook.moved ||
      this.moved
    )
      return false;

    const dx = rook.x < this.x ? -1 : 1;
    let xc = this.x + dx;
    while (xc !== rook.x) {
      if (board[xc][this.y] !== null) return false;
      xc += dx;
    }
    xc = this.x;
    const attackingColor = this.color === 0 ? 1 : 0;
    while (true) {
      if (board.isUnderAttack([xc, this.y], attackingColor)) return false;
      if (xc === dst[0]) break;
      xc += dx;
    }
    return true;
  }

  castle(board, dst) {
    if (!this.canCastle(board, dst)) return false;

    let rookX, rookDx;
    if (dst[0] === 6) {
      rookX = 7;
      rookDx = 5;
    } else {
      rookX = 0;
      rookDx = 3;
    }

    let rook = board[rookX][this.y];
    rook.x = rookDx;
    this.x = dst[0];

    board[this.x][this.y] = null;
    board[rook.x][rook.y] = null;

    board[this.x][this.y] = this;
    board[rook.x][rook.y] = rook;

    return true;
  }
}
