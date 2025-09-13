import Piece from "./Piece.js";
import { isValid } from "../Helper.js";
import Queen from "./Queen.js";
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
export default class Pawn extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
  }
  updateAttackSquares(board) {
    this.attackSquares = [];
    const dy = this.color === 0 ? 1 : -1;
    const s1 = [this.x - 1, this.y + dy];
    const s2 = [this.x + 1, this.y + dy];
    if (isValid(s1)) this.attackSquares.push(s1);
    if (isValid(s2)) this.attackSquares.push(s2);
  }

  getAllValidMoves(board) {
    let valids = [];

    for (let i = 0; i < this.attackSquares.length; i++) {
      let dst = this.attackSquares[i];

      let piece = board.pieces[dst[0]][dst[1]];
      if (
        piece == null ||
        piece.constructor.name === "King" ||
        piece.color === this.color
      )
        continue;
      let src = [this.x, this.y];
      let dstPiece = board.pieces[dst[0]][dst[1]];
      this.moveTo(board, dst);
      const hasCheck = board.isCheck(this.color);
      this.moveTo(board, src);
      if (dstPiece != null) dstPiece.moveTo(board, dst);

      if (!hasCheck) valids.push(dst);
    }

    const startRow = this.color === 0 ? 1 : 6;

    let dy = this.color === 0 ? 1 : -1;
    let dst = [this.x, this.y + dy];
    let piece = board.pieces[dst[0]][dst[1]];
    if (piece != null) return valids;

    let src = [this.x, this.y];
    this.moveTo(board, dst);
    let hasCheck = board.isCheck(this.color);
    this.moveTo(board, src);
    if (piece != null) piece.moveTo(board, dst);

    if (!hasCheck) valids.push(dst);

    if (this.y !== startRow) return valids;

    dy = 2 * dy;
    dst = [this.x, this.y + dy];
    piece = board.pieces[dst[0]][dst[1]];
    if (piece != null) return valids;

    this.moveTo(board, dst);
    hasCheck = board.isCheck(this.color);
    this.moveTo(board, src);
    if (piece != null) piece.moveTo(board, dst);
    if (!hasCheck) valids.push(dst);

    return valids;
  }

  canPromote() {
    return (
      (this.color === 0 && this.y === 7) || (this.color === 1 && this.y === 0)
    );
  }
  replaceWith(board, type = "Queen") {
    let newPiece;
    if (type === "Queen") newPiece = new Queen(this.color, this.x, this.y);
    else if (type === "Rook") newPiece = new Rook(this.color, this.x, this.y);
    else if (type === "Knight")
      newPiece = new Knight(this.color, this.x, this.y);
    else if (type === "Bishop")
      newPiece = new Bishop(this.color, this.x, this.y);
    else
      throw new Error(
        `received=${type} Promotion error piece must be a Queen ,Rook,Knight or Bishop`
      );

    newPiece.moveTo(board, [this.x, this.y]);
  }
}
