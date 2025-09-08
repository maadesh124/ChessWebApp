import Rook from "./Pieces/Rook";
import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Queen from "./Pieces/Queen";
import Pawn from "./Pieces/Pawn";

class Board {
  pieces = [[]];
  play = 0;
  static WRONG_MOVE = 1;
  static ILLEGAL_MOVE = 2;
  static SUCCESS_MOVE = 3;
  static CHECKMATE = 4;
  constructor() {
    this.pieces[0][0] = new Rook(0, 0, 0);
    this.pieces[1][0] = new Knight(0, 2, 0);
    this.pieces[2][0] = new Bishop(0, 3, 0);
    this.pieces[3][0] = new Queen(0, 4, 0);
    this.pieces[4][0] = new King(0, 5, 0);
    this.pieces[5][0] = new Bishop(0, 6, 0);
    this.pieces[6][0] = new Knight(0, 7, 0);
    this.pieces[7][0] = new Rook(0, 8, 0);
    for (let i = 0; i < 8; i++) this.pieces[i][1] = new Pawn(0, i, 1);

    this.pieces[0][7] = new Rook(1, 0, 7);
    this.pieces[1][7] = new Knight(1, 2, 7);
    this.pieces[2][7] = new Bishop(1, 3, 7);
    this.pieces[3][7] = new Queen(1, 4, 7);
    this.pieces[4][7] = new King(1, 5, 7);
    this.pieces[5][7] = new Bishop(1, 6, 7);
    this.pieces[6][7] = new Knight(1, 7, 7);
    this.pieces[7][7] = new Rook(1, 8, 7);
    for (let i = 0; i < 8; i++) this.pieces[i][1] = new Pawn(1, i, 6);
  }

  isUnderAttack(dst, attackingColor) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          this.pieces[i][j] === null ||
          this.pieces[i][j].color !== attackingColor
        )
          continue;
        if (this.pieces[i][j].canAttack(this, dst)) return true;
      }
    }
    return false;
  }

  move(src, dst) {
    const piece = this.pieces[src[0]][src[1]];
    if (!piece || piece.color !== play) return false;
    if (
      this.pieces[dst[0]][dst[1]] !== null &&
      this.pieces[dst[0]][dst[1]].constructor.name === "King"
    ) {
      return false;
    }

    if (piece.constructor.name === "King" && piece.castle(this, dst)) {
      play = (play + 1) % 2;
      return true;
    }

    if (!piece.isValidMove(this, dst)) return false;

    this.pieces[src[0]][src[1]] = null;
    this.pieces[dst[0]][dst[1]] = piece;
    piece.x = dst[0];
    piece.y = dst[1];
    piece.moved = true;

    play = (play + 1) % 2;
    return true;
  }
}
