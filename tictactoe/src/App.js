import './App.css';
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue("x")
  }

  return (
    <div>
      <button
        className="square"
        onClick={handleClick}
      >
        {value}
      </button>
    </div>
  );
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

export default function App() {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}
