# ♟️ ChessEngine

Core JavaScript Chess Engine implementation.
The main entry point is the `Chess` class.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/maadesh124/ChessEngine.git
cd ChessEngine
```

### 2. Import the `Chess` Class

```js
import Chess from "./Chess.js";

const game = new Chess();
```

---

## 📦 Chess Class API

### `new Chess()`

Creates a new chess game.

---

### `move(src, dst)`

Moves a piece from source to destination.

- `src`, `dst` are arrays `[row, col]` (0-indexed).
- Returns a **status code** (one of the static constants).

Example:

```js
game.move([6, 4], [4, 4]); // Pawn e2 → e4
```

---

### `promote(pos, type)`

Promotes a pawn at `pos` to a new piece.

- `pos` → `[row, col]`
- `type` → `"Queen" | "Rook" | "Bishop" | "Knight"`
- Returns a **promotion status code**.

Example:

```js
game.promote([0, 0], "Queen");
```

---

### `whoseTurn()`

Returns whose turn it is (`0` or `1`).
0 for white and 1 for black

Example:

```js
console.log(game.whoseTurn()); // "White"
```

---

### `getBoardState()`

Returns the current board as a 2D array (8×8).
Each cell contains either `null` or a string like `"Pawn0"`, `"King1"`, etc.

Example:

```js
console.log(game.getBoardState());
```

---

## 🔢 Static Status Codes

- `Chess.INVALID_MOVE`
- `Chess.ILLEGAL_MOVE`
- `Chess.VALID_MOVE`
- `Chess.CHECKMATE`
- `Chess.WRONG_PLAY`
- `Chess.STALE_MATE`
- `Chess.INVALID_PROMOTION`
- `Chess.VALID_PROMOTION`
- `Chess.PROMOTE`

Example:

```js
const result = game.move([6, 4], [4, 4]);
if (result === Chess.VALID_MOVE) {
  console.log("Move accepted");
}
```

---
