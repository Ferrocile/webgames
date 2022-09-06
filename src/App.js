import React from "react";
import Navbar from "./components/navbar/navbar";
import Grid from "./components/sudoku/Grid";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Navbar className="App-header" />
        </header>
        <Grid />
      </div>
    </>
  );
}

export default App;
