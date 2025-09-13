import { useState } from "react";

function Popup({ globalRef }) {
  const pieces = ["Queen", "Rook", "Bishop", "Knight"];
  const size = globalRef.current.boardSize / 8;
  let squares = [];
  for (let i = 0; i < pieces.length; i++) {
    const path = `../../public/assets/${pieces[i]}${globalRef.current.color}.svg`;
    console.log(`${path}`);

    squares.push(
      <button
        onClick={() => {
          //globalRef.current.promotionPiece = pieces[i];
          globalRef.current.board.promote(
            globalRef.current.promotionDst,
            pieces[i]
          );
          globalRef.current.src = null;
          globalRef.current.highlight = null;
          globalRef.current.ws.send(
            JSON.stringify({
              roomId: globalRef.current.roomId,
              src: globalRef.current.promotionSrc,
              dst: globalRef.current.promotionDst,
              promote: pieces[i]
            })
          );
          console.log(`${JSON.stringify(globalRef.current)}`);
          globalRef.current.setopen(0);
        }}
        className={`bg-gray-400 border-1`}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      >
        <img src={path} className="w-full" />
      </button>
    );
  }
  return (
    <div className="z-1000 fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="flex flex-col w-fit transform gap-6 -translate-y-[10px]">
        <div className="flex justify-center">
          <p className="text-white justify-center">Pick the promotion piece</p>
        </div>

        <div className="flex flex-rows">{squares}</div>
      </div>
    </div>
  );
}

export default Popup;
