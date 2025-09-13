import React from "react";
import { Square } from "./Square";
import Chess from "../ChessEngine/Chess";
import { useRef, useState, useEffect } from "react";
import Popup from "./Popup";

export const ChessBoard = ({ globalRef }) => {
  const boardSize = globalRef.current.boardSize;
  const color = globalRef.current.color;

  const [boardState, setBoardState] = useState(
    globalRef.current.board.getBoardState()
  );

  const [open, setopen] = useState(0);
  globalRef.current.setopen = setopen;
  globalRef.current.setBoardState = setBoardState;
  useEffect(() => initialise(globalRef), []);

  let squares = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares[color === 0 ? 7 - j : j][color === 1 ? 7 - i : i] = (
        <Square key={`${i}-${j}`} globalRef={globalRef} pos={[i, j]} />
      );
    }
  }

  return (
    <>
      {open === 0 && (
        <div
          className="grid grid-cols-8 grid-rows-8"
          style={{ width: boardSize, height: boardSize }}
        >
          {squares}
        </div>
      )}
      {open === 1 && <Popup globalRef={globalRef} />}
      {/* <button
        onClick={() => globalRef.current.setopen(1)}
        className="bg-red-600 rounded-lg text-white w-fit p-3"
      >
        click me
      </button> */}
    </>
  );
};

function initialise(globalRef) {
  const ws = globalRef.current.ws;
  ws.onmessage = event => {
    const message = JSON.parse(event.data.toString());
    console.log(`move from server =${event.data}`);

    if (message.mess === "exit") {
      alert("Your opponent has quit the game");
    }

    console.log(`Received message from Server:${event.data} ${message.mess}`);
    const src = message.src;
    const dst = message.dst;
    if (src == null || dst == null) {
      console.log(`${src} ${dst} `);
      return;
    }
    const res = globalRef.current.board.move(src, dst);
    console.log(`${res}`);
    if (
      res === Chess.VALID_MOVE ||
      res === Chess.CHECKMATE ||
      res === Chess.STALE_MATE
    ) {
      globalRef.current.setBoardState(globalRef.current.board.getBoardState());
    }

    if (res === Chess.CHECKMATE) {
      const winColor = globalRef.current.color === 0 ? "Black" : "White";
      alert(`${winColor} won the game`);
    }

    if (res === Chess.STALE_MATE) alert(`It's a Tie`);
    if (res === Chess.PROMOTE) {
      console.log(`${event.data}`);
      globalRef.current.board.promote(dst, message.promote);
      globalRef.current.setBoardState(globalRef.current.board.getBoardState());
    }
  };
}
