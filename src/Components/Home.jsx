import React from "react";
import Chess from "../ChessEngine/Chess";

const url = "http://localhost:8080";
const Home = ({ globalRef }) => {
  return (
    <div>
      <button
        className="bg-red-600 w-fit p-2 rounded-lg text-white"
        onClick={() => joinRoom(globalRef)}
      >
        <p>join</p>
      </button>
    </div>
  );
};

export default Home;

function joinRoom(globalRef) {
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
