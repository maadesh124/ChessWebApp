import { isValid, colorOf, arrayHas, filename } from "../Helper.js";
import fs from "fs";
export default class Piece {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.attackSquares = [];
  }

  toString() {
    return `Piece(${this.color == 0 ? "white" : "black"} ${
      this.constructor.name
    }, ${this.x}, ${this.y})`;
  }

  isSlidingPiece() {
    return (
      this.constructor.name === "Rook" ||
      this.constructor.name === "Bishop" ||
      this.constructor.name === "Queen"
    );
  }

  updateSlidingAttackSquares(board, dx, dy) {
    this.attackSquares = [];
    for (let i = 0; i < dx.length; i++) {
      let cur = [this.x + dx[i], this.y + dy[i]];
      while (isValid(cur)) {
        this.attackSquares.push(cur);
        let temp = board.pieces[cur[0]][cur[1]];
        if (board.pieces[cur[0]][cur[1]] != null) break;
        cur = [cur[0] + dx[i], cur[1] + dy[i]];
      }
    }
  }

  updateAttackSquares(board) {
    throw new Error("updateAttackSquares(board) must be implemented");
  }

  canAttack(dst) {
    return arrayHas(this.attackSquares, dst);
  }

  moveTo(board, dst) {
    board.pieces[this.x][this.y] = null;
    board.pieces[dst[0]][dst[1]] = this;

    this.x = dst[0];
    this.y = dst[1];

    board.updateAttackSquaresAll(this);
  }

  getAllValidMoves(board) {
    let valids = [];
    for (let i = 0; i < this.attackSquares.length; i++) {
      let dst = [this.attackSquares[i][0], this.attackSquares[i][1]];
      let piece = board.pieces[dst[0]][dst[1]];
      if (piece != null && piece.color === this.color) continue;
      if (piece != null && piece.constructor.name === "King") continue;

      let src = [this.x, this.y];
      let dstPiece = board.pieces[dst[0]][dst[1]];
      this.moveTo(board, dst);
      const hasCheck = board.isCheck(this.color);
      this.moveTo(board, src);
      if (dstPiece != null) dstPiece.moveTo(board, dst);
      // board.pieces[dst[0]][dst[1]] = dstPiece;
      if (!hasCheck) valids.push(dst);
    }
    return valids;
  }

  isValidMove(board, dst) {
    const valids = this.getAllValidMoves(board);
    return arrayHas(valids, dst);
  }
}
