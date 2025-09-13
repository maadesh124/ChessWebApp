import fs from "fs";

export function colorOf(x, y) {
  if (x % 2 == y % 2) return 1;
  return 0;
}
export function isValid(pos) {
  const x = pos[0],
    y = pos[1];
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}
export function arrayHas(arr, dst) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i][0] === dst[0] && arr[i][1] === dst[1]) return true;

  return false;
}

export const filename = "att.txt";
export const filename1 = "valid.txt";

export function formatMoves(piece, moves) {
  let formatted = "\n\n" + piece.toString();
  for (let i = 0; i < moves.length; i++) {
    formatted += "\n" + (moves[i][0] * 10 + moves[i][1]);
  }
  return formatted;
}

export function logValidMoves(board, piece) {
  const valids = piece.getAllValidMoves(board);
  return formatMoves(piece, valids);
}

export function logAttackSquares(piece) {
  return formatMoves(piece, piece.attackSquares);
}

export function logAllPiece(board, moves = false) {
  const targetFile = moves ? filename : filename1;
  fs.writeFileSync(targetFile, "", "utf-8");

  for (let i = 0; i < 8; i++) {
    // header for each rank
    let section = `\n\n\n*************Line number=${i} *************\n`;

    for (let j = 0; j < 8; j++) {
      let piece = board.pieces[j][i];
      if (!piece) continue;

      section += moves ? logAttackSquares(piece) : logValidMoves(board, piece);
    }

    fs.appendFileSync(targetFile, section, "utf-8");
  }
}
