import React from "react";
import Navbar from "./components/navbar/navbar";
import Grid from "./components/sudoku/Grid";
import "./App.css";

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
    </div>
    <div>
      <Grid />
    </div>
    </>
  );
}

export default App;
