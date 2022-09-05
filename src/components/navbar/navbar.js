import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <ul className="horizontal-list">
        <li>
          <a href="#">Sudoku</a>
        </li>
        <li>
          <a href="#">Minesweeper</a>
        </li>
        <li>
          <a href="#">Wordle</a>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Navbar;
