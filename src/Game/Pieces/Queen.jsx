import Piece from "./Piece";
import Bishop from "./Bishop";
import Rook from "./Rook";

export default class Queen extends Piece {
  constructor(color, x, y) {
    super(color, x, y);
    this.rook = new Rook(color, x, y);
    this.bishop = new Bishop(color, x, y);
  }

  isValidMove(board, dst) {
    this.rook.x = this.x;
    this.rook.y = this.y;
    this.bishop.x = this.x;
    this.bishop.y = this.y;
    return (
      this.rook.isValidMove(board, dst) || this.bishop.isValidMove(board, dst)
    );
  }
}
