import Rook from "./Pieces/Rook";
import Bishop from "./Pieces/Bishop";
import King from "./Pieces/King";
import Knight from "./Pieces/Knight";
import Queen from "./Pieces/Queen";
import Pawn from "./Pieces/Pawn";
import Piece from "./Pieces/Piece";
import { isValid } from "./Helper";

class Board {
  pieces;
  play = 0;
  kings = [null, null];
  static INVALID_MOVE = 1;
  static ILLEGAL_MOVE = 2;
  static VALID_MOVE = 3;
  static CHECKMATE = 4;
  static WRONG_PLAY = 5;
  constructor() {
    this.pieces = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.pieces[0][0] = new Rook(0, 0, 0);
    this.pieces[1][0] = new Knight(0, 1, 0);
    this.pieces[2][0] = new Bishop(0, 2, 0);
    this.pieces[3][0] = new Queen(0, 3, 0);
    this.pieces[4][0] = new King(0, 4, 0);
    this.pieces[5][0] = new Bishop(0, 5, 0);
    this.pieces[6][0] = new Knight(0, 6, 0);
    this.pieces[7][0] = new Rook(0, 7, 0);
    for (let i = 0; i < 8; i++) this.pieces[i][0] = new Pawn(0, i, 1);

    this.pieces[0][7] = new Rook(1, 0, 7);
    this.pieces[1][7] = new Knight(1, 1, 7);
    this.pieces[2][7] = new Bishop(1, 2, 7);
    this.pieces[3][7] = new Queen(1, 3, 7);
    this.pieces[4][7] = new King(1, 4, 7);
    this.pieces[5][7] = new Bishop(1, 5, 7);
    this.pieces[6][7] = new Knight(1, 6, 7);
    this.pieces[7][7] = new Rook(1, 8, 7);
    for (let i = 0; i < 8; i++) this.pieces[i][1] = new Pawn(1, i, 6);

    this.kings[0] = this.pieces[4][0];
    this.kings[1] = this.pieces[4][7];
  }

  canBeOccupied(dst, color) {
    if (
      this.pieces[dst[0]][dst[1]] !== null &&
      this.pieces[dst[0]][dst[1]].color === color
    )
      throw new Error("canBeOccupied called on same color");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this.pieces[i][j];
        if (
          piece === null ||
          piece.color !== color ||
          piece.constructor.name === "King"
        )
          continue;
        if (piece.isValidMove(this, dst)) {
          return true;
        }
      }
    }

    return false;
  }

  isUnderAttack(dst, attackingColor) {
    if (
      this.pieces[dst[0]][dst[1]] !== null &&
      this.pieces[dst[0]][dst[1]].color === attackingColor
    )
      throw new Error("isUnderAttack called on same color");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          this.pieces[i][j] === null ||
          this.pieces[i][j].color !== attackingColor ||
          this.pieces[i][j].constructor.name === "King"
        )
          continue;
        if (this.pieces[i][j].canAttack(this, dst)) return true;
      }
    }
    return false;
  }

  move(src, dst) {
    const piece = this.pieces[src[0]][src[1]];
    if (piece === null || piece.color !== this.play) return Board.WRONG_PLAY;
    if (
      this.pieces[dst[0]][dst[1]] !== null &&
      this.pieces[dst[0]][dst[1]].constructor.name === "King"
    ) {
      return Board.INVALID_MOVE;
    }

    if (piece.constructor.name === "King" && piece.castle(this, dst)) {
      this.play = (this.play + 1) % 2;

      return Board.VALID_MOVE;
    }

    if (!piece.isValidMove(this, dst)) return Board.INVALID_MOVE;

    if (this.illegalMove(src, dst)) return Board.ILLEGAL_MOVE;

    this.moveFromTo(src, dst);
    piece.moved = true;

    this.play = (this.play + 1) % 2;

    if (this.detectCheckMate(play)) return Board.CHECKMATE;

    return Board.VALID_MOVE;
  }

  illegalMove(src, dst) {
    const color = this.pieces[src[0]][src[1]].color;
    const oppColor = color === 0 ? 1 : 0;
    const kingSq = [this.kings[color].x, this.kings[color].y];

    const srcPiece = this.pieces[src[0]][src[1]];
    const dstPiece = this.pieces[dst[0]][dst[1]];

    this.moveFromTo(src, dst);
    const checkHandled = !this.isUnderAttack(kingSq, oppColor);
    this.moveFromTo(dst, src);
    this.pieces[dst[0]][dst[1]] = dstPiece;
    if (!checkHandled) return true;
  }

  moveFromTo(src, dst) {
    const srcPiece = this.pieces[src[0]][src[1]];
    //onst dstPiece = this.pieces[dst[0]][dst[1]];

    this.pieces[src[0]][src[1]] = null;
    this.pieces[dst[0]][dst[1]] = srcPiece;
    srcPiece.x = dst[0];
    srcPiece.y = dst[1];
  }

  detectCheckMate(color) {
    if (!this.isKingTrapped(color)) return false;

    const attackers = this.getAttackers(color);
    let count = 0;
    for (let i = 0; i < attackers.length; i++) {
      let attackerPos = [attackers[i].x, attackers[i].y];
      //check if other pieces can take off attacker
      if (this.isUnderAttack(attackerPos, color)) continue;

      //check if the king itself can directly remove the attacker
      if (this.kings[color].isValidMove(this, attackerPos)) continue;

      //if check can be blocked
      if (this.canBlock(this, kings[color], attackers[i])) continue;

      return true;
    }

    return false;
  }

  canBlock(king, checker) {
    const path = checker.getPath(this, [king.x, king.y]);
    if (!checker.isSlidingPiece()) return false;

    let dst = [king.x, king.y];
    let cur = checker.constructor.next([checker.x, checker.y], dst);
    while (!(cur[0] === dst[0] && cur[1] === dst[1])) {
      if (this.canBeOccupied(cur, king.color)) return true;
      cur = next(cur, dst);
    }

    return false;
  }

  getAttackers(color) {
    const oppColor = color === 0 ? 1 : 0;
    const kingSq = [this.kings[color].x, this.kings[color].y];
    const attackers = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = this.pieces[i][j];
        if (piece === null || piece.color === color) continue;
        if (piece.canAttack(this, kingSq)) {
          attackers.push(piece);
        }
      }
    }

    return attackers; // array of opponent pieces attacking the king
  }

  isKingTrapped(color) {
    // checks if white-0 or black-1 king  is trapped
    const oppColor = color === 0 ? 1 : 0;
    const dx = [-1, 0, 1];
    const dy = [-1, 0, 1];

    const kingSq = [this.kings[color].x, this.kings[color].y];
    if (!this.isUnderAttack(kingSq, oppColor)) return false;
    for (let i = 0; i < dx.length; i++) {
      for (let j = 0; j < dy.length; j++) {
        const ndst = [this.kings[color].x + dx[i], this.kings[color].y + dy[j]];
        if (this.kings[color].isValidMove(this, ndst)) return false;
      }
    }

    return true;
  }

  updatePinnedPieces() {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        if (this.pieces[i][j] !== null) this.pieces[i][j].pinned = false;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let piece = this.pieces[i][j];
        if (
          piece === null ||
          piece.constructor.name === "King" ||
          piece.constructor.name === "Knight" ||
          piece.constructor.name === "Pawn"
        )
          continue;
        const oppColor = piece.color === 0 ? 1 : 0;
        const dst = [this.kings[oppColor].x, this.kings[oppColor].y];
        const piecesInPath = piece.getPath(this, dst);
        if (
          piecesInPath !== null &&
          piecesInPath.length === 1 &&
          piecesInPath[0].color === oppColor
        )
          piecesInPath[0].pinned = true;
      }
    }
  }
}
