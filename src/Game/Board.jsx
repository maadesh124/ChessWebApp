class Board {
  pieces = [[]];
  play = 0;
  constructor() {}

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
