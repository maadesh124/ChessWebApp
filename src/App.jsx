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
  globalRef.current.boardSize =
    0.8 * Math.min(window.innerHeight, window.innerWidth);

  return (
    <>
      {page === 0 && <Home globalRef={globalRef} />}

      {page === 1 && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="flex justify-center items-center min-h-screen">
            <ChessBoard globalRef={globalRef} boardSize={600} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
