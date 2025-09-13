import Board from "./internals/Board.js";

export default class Chess {
  // private board
  #board;

  // Re-expose static constants from Board
  static INVALID_MOVE = Board.INVALID_MOVE;
  static ILLEGAL_MOVE = Board.ILLEGAL_MOVE;
  static VALID_MOVE = Board.VALID_MOVE;
  static CHECKMATE = Board.CHECKMATE;
  static WRONG_PLAY = Board.WRONG_PLAY;
  static STALE_MATE = Board.STALE_MATE;
  static INVALID_PROMOTION = Board.INVALID_PROMOTION;
  static VALID_PROMOTION = Board.VALID_PROMOTION;
  static PROMOTE = Board.PROMOTE;
  constructor() {
    this.#board = new Board();
  }

  /**
   * Move a piece from src → dst
   * @param {number[]} src [x,y]
   * @param {number[]} dst [x,y]
   * @returns {string} status code from Board
   */
  move(src, dst) {
    return this.#board.move(src, dst);
  }

  /**
   * Promote a pawn at position to a new piece
   * @param {number[]} pos [x,y]
   * @param {"Queen"|"Rook"|"Bishop"|"Knight"} type
   */
  promote(pos, type = "Queen") {
    return this.#board.promote(pos, type);
  }

  whoseTurn() {
    return this.#board.play;
  }

  getBoardState() {
    const state = Array.from({ length: 8 }, () => Array(8).fill(null));
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = this.#board.pieces[x][y]; // row = y, col = x
        state[x][y] = piece ? `${piece.constructor.name}${piece.color}` : null;
      }
    }
    return state;
  }

  getPieceColor(cur) {
    if (this.#board.pieces[cur[0]][cur[1]] === null) return null;
    console.log(`${cur} ${this.#board.pieces[cur[0]][cur[1]]}`);
    return this.#board.pieces[cur[0]][cur[1]].color;
  }
}
