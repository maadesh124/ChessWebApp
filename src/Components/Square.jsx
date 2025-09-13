import React from "react";
import { useState } from "react";
import Chess from "../ChessEngine/Chess";

export const Square = ({ globalRef, pos }) => {
  const size = globalRef.current.boardSize / 8;
  const boardState = globalRef.current.board.getBoardState();
  const piece = boardState[pos[0]][pos[1]];
  const path = `public/assets/${piece}.svg`;
  let color;
  if (pos[0] % 2 === pos[1] % 2) color = `bg-gray-600`;
  else color = `bg-gray-200`;
  const hightlight = globalRef.current.highlight;
  if (
    hightlight != null &&
    hightlight[0] === pos[0] &&
    hightlight[1] === pos[1]
  )
    color = `bg-gray-400`;

  return (
    <button
      onClick={() => handleClick(globalRef, pos)}
      className={`${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      {piece != null && <img src={path} className="w-full" />}
    </button>
  );
};

function handleClick(globalRef, pos) {
  if (globalRef.current.board.whoseTurn() !== globalRef.current.color) return;
  const pieceColor = globalRef.current.board.getPieceColor(pos);
  if (globalRef.current.src === null) {
    console.log(`reached ${pieceColor} ${globalRef.current.color} `);
    if (pieceColor !== globalRef.current.color) return;
    globalRef.current.src = pos;
    globalRef.current.highlight = pos;
    globalRef.current.setBoardState(globalRef.current.board.getBoardState());
  } else {
    if (pieceColor === globalRef.current.color) {
      globalRef.current.src = pos;
      globalRef.current.highlight = pos;
      globalRef.current.setBoardState(globalRef.current.board.getBoardState());
    } else {
      const src = globalRef.current.src;
      const dst = pos;
      const res = globalRef.current.board.move(globalRef.current.src, pos);
      console.log(`${res}`);
      if (
        res === Chess.VALID_MOVE ||
        res === Chess.CHECKMATE ||
        res === Chess.STALE_MATE
      ) {
        globalRef.current.src = null;
        globalRef.current.highlight = null;
        globalRef.current.setBoardState(
          globalRef.current.board.getBoardState()
        );
        globalRef.current.ws.send(
          JSON.stringify({
            roomId: globalRef.current.roomId,
            src: src,
            dst: dst
          })
        );
      }
      if (res === Chess.CHECKMATE) {
        const winColor = globalRef.current.color === 1 ? "Black" : "White";
        alert(`player ${winColor} won the game`);
      }
      if (res === Chess.STALE_MATE) alert(`It's a Tie`);
      if (res === Chess.INVALID_MOVE) {
        globalRef.current.src = null;
        globalRef.current.highlight = null;
        globalRef.current.setBoardState(
          globalRef.current.board.getBoardState()
        );
      }
      if (res === Chess.PROMOTE) {
        console.log(`promotion found`);
        globalRef.current.promotionSrc = src;
        globalRef.current.promotionDst = dst;
        globalRef.current.setopen(1);
        globalRef.current.setBoardState(
          globalRef.current.board.getBoardState()
        );
      }
    }
  }
}
