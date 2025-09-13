import React from "react";
import Chess from "../ChessEngine/Chess";
import { useState, useRef } from "react";

const url = "https://chesswebsocket.onrender.com";
const Home = ({ globalRef }) => {
  const [created, setcreated] = useState(0);
  const inputText = useRef("");
  const color = "bg-[#0d00a4]";
  const color1 = "bg-[#0d00a4]";
  return (
    <div>
      {/* Background layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Solid base */}
        <div className="absolute inset-0 bg-black" />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-800/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-800/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-4">
            <input
              className="bg-white rounded-lg w-[100px] h-[28px]"
              type="text"
              ref={inputText}
            />
            <button
              className={`${color} w-fit py-1 px-4 rounded-lg text-white`}
              onClick={() => joinRoom(globalRef, inputText)}
            >
              join
            </button>
          </div>
          <div className="flex flex-row justify-center">
            {created === 0 && (
              <button
                className={`${color1} rounded-lg text-white w-fit px-4 py-1`}
                onClick={() => createRoom(globalRef, setcreated)}
              >
                create
              </button>
            )}
            {created === 1 && (
              <p className="text-white">{globalRef.current.roomId}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

function joinRoom(globalRef, inputText) {
  globalRef.current.roomId = inputText.current.value;
  console.log(`${globalRef.current.roomId}`);
  const ws = new WebSocket(url);
  ws.onopen = () => {
    console.log("✅ Connected to server");
    ws.send(JSON.stringify({ mess: "Hello from client!" }));
    ws.send(JSON.stringify({ roomId: globalRef.current.roomId, join: true }));
  };

  globalRef.current.board = new Chess();
  globalRef.current.src = null;
  globalRef.current.highlight = null;

  ws.onmessage = event => {
    const message = JSON.parse(event.data.toString());
    console.log(`reply from server ${event.data}`);
    if (message.start === true) {
      globalRef.current.color = message.color;
      globalRef.current.ws = ws;
      console.log(`globalRef=${JSON.stringify(globalRef.current)}`);
      globalRef.current.setpage(1);
    }
  };
}

async function createRoom(globalRef, setcreated) {
  const res = await fetch("https://chesswebsocket.onrender.com/createRoom");
  const roomId = await res.text(); // your server sends plain text
  globalRef.current.roomId = roomId;
  setcreated(1);
  console.log("Created room:", roomId);
}
