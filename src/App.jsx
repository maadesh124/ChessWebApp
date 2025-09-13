import { Square } from "./Components/Square";
import { ChessBoard } from "./Components/ChessBoard";
import Chess from "./ChessEngine/Chess";
import Home from "./Components/Home";
import { useState, useRef } from "react";
import Popup from "./Components/Popup";
const board = new Chess();
function App() {
  const [page, setpage] = useState(0);
  const globalRef = useRef({});
  globalRef.current.setpage = setpage;
  globalRef.current.roomId = "Qa45uj";
  globalRef.current.boardSize = 800;

  const size = Math.min(window.innerHeight, window.innerHeight);
  return (
    <>
      {page === 0 && <Home globalRef={globalRef}> </Home>}
      {page === 1 && <ChessBoard globalRef={globalRef}></ChessBoard>}
    </>
  );
}

export default App;
