import Rook from "./Pieces/Rook.js";
import Bishop from "./Pieces/Bishop.js";
import King from "./Pieces/King.js";
import Knight from "./Pieces/Knight.js";
import Queen from "./Pieces/Queen.js";
import Pawn from "./Pieces/Pawn.js";
import { logAllPiece, isValid } from "./Helper.js";

export default class Board {
  pieces;
  play = 0;
  kings = [null, null];
  static INVALID_MOVE = "INVALID_MOVE";
  static ILLEGAL_MOVE = "ILLEGAL_MOVE";
  static VALID_MOVE = "VALID_MOVE";
  static CHECKMATE = "CHECKMATE";
  static WRONG_PLAY = "WRONG_PLAY";
  static STALE_MATE = "STALE_MATE";
  static INVALID_PROMOTION = "INVALID_PROMOTION";
  static VALID_PROMOTION = "VALID_PROMOTION";
  static PROMOTE = "PROMOTE";
  constructor() {
    this.pieces = Array.from({ length: 8 }, () => Array(8).fill(null));
    // White back rank (y=0)
    this.pieces[0][0] = new Rook(0, 0, 0);
    this.pieces[1][0] = new Knight(0, 1, 0);
    this.pieces[2][0] = new Bishop(0, 2, 0);
    this.pieces[3][0] = new Queen(0, 3, 0);
    this.pieces[4][0] = new King(0, 4, 0);
    this.pieces[5][0] = new Bishop(0, 5, 0);
    this.pieces[6][0] = new Knight(0, 6, 0);
    this.pieces[7][0] = new Rook(0, 7, 0);

    // White pawns (y=1)
    for (let i = 0; i < 8; i++) {
      this.pieces[i][1] = new Pawn(0, i, 1);
    }

    // Black back rank (y=7)
    this.pieces[0][7] = new Rook(1, 0, 7);
    this.pieces[1][7] = new Knight(1, 1, 7);
    this.pieces[2][7] = new Bishop(1, 2, 7);
    this.pieces[3][7] = new Queen(1, 3, 7);
    this.pieces[4][7] = new King(1, 4, 7);
    this.pieces[5][7] = new Bishop(1, 5, 7);
    this.pieces[6][7] = new Knight(1, 6, 7);
    this.pieces[7][7] = new Rook(1, 7, 7);

    //Black Pawns
    for (let i = 0; i < 8; i++) {
      this.pieces[i][6] = new Pawn(1, i, 6);
    }

    for (let rank = 0; rank <= 1; rank++)
      for (let i = 0; i < 8; i++) {
        this.pieces[i][rank].updateAttackSquares(this);
      }

    for (let rank = 6; rank <= 7; rank++)
      for (let i = 0; i < 8; i++) {
        this.pieces[i][rank].updateAttackSquares(this);
      }

    // Track kings
    this.kings[0] = this.pieces[4][0]; // white king
    this.kings[1] = this.pieces[4][7]; // black king

    //logAllPiece(this);
    //logAllPiece(this, true);
  }

  move(src, dst) {
    if (!isValid(src) || !isValid(dst)) return Board.INVALID_MOVE;
    const piece = this.pieces[src[0]][src[1]];
    const opp = this.play === 0 ? 1 : 0;
    if (src[0] === dst[0] && src[1] === dst[1]) return Board.INVALID_MOVE;

    if (piece === null || piece === undefined || piece.color !== this.play)
      return Board.WRONG_PLAY;

    if (
      this.pieces[dst[0]][dst[1]] != null &&
      this.pieces[dst[0]][dst[1]].constructor.name === "King"
    ) {
      return Board.INVALID_MOVE;
    }

    if (
      this.pieces[dst[0]][dst[1]] != null &&
      piece.color === this.pieces[dst[0]][dst[1]].color
    )
      return Board.INVALID_MOVE;

    if (piece.constructor.name === "King" && piece.castle(this, dst)) {
      this.play = (this.play + 1) % 2;
      return Board.VALID_MOVE;
    }

    if (!piece.isValidMove(this, dst)) return Board.INVALID_MOVE;

    piece.moveTo(this, dst);

    // this.updateAttackSquaresAll(piece);
    //logAllPiece(this);
    //logAllPiece(this, true);

    if (piece.constructor.name === "Rook" || piece.constructor.name === "King")
      piece.moved = true;

    const isMate = this.isMate(opp);
    if (isMate === 1) return Board.CHECKMATE;
    if (isMate === 2) return Board.STALE_MATE;

    this.play = (this.play + 1) % 2;
    if (piece.constructor.name === "Pawn" && piece.canPromote())
      return Board.PROMOTE;
    return Board.VALID_MOVE;
  }

  isCheck(color) {
    const kingSq = [this.kings[color].x, this.kings[color].y];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.pieces[i][j];
        if (piece == null || piece.color === color) continue;
        if (piece.canAttack(kingSq)) return true;
      }
    }

    return false;
  }
  isMate(color) {
    let hasValidMove = false;
    let inCheck = this.isCheck(color);

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.pieces[i][j];
        if (piece == null || piece.color !== color) continue;
        let valids = piece.getAllValidMoves(this);
        if (valids.length > 0) {
          hasValidMove = true;
          return 0;
        }
      }
    }
    if (!hasValidMove && inCheck) return 1;

    if (!hasValidMove && !inCheck) return 2;

    return 0; //non reachable logically
  }

  updateAttackSquaresAll(cur) {
    cur.updateAttackSquares(this);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.pieces[i][j];
        if (piece == null || !piece.isSlidingPiece()) continue;
        piece.updateAttackSquares(this);
      }
    }
  }

  promote(src, promotionPiece = "Queen") {
    if (!isValid(src)) return Board.INVALID_PROMOTION;
    let pawn = this.pieces[src[0]][src[1]];
    if (pawn == null || pawn.constructor.name !== "Pawn")
      return Board.INVALID_PROMOTION;
    if (!pawn.canPromote()) return Board.INVALID_PROMOTION;
    pawn.replaceWith(this, promotionPiece);
    return Board.VALID_PROMOTION;
  }
}
