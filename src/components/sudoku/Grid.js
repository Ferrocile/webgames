import React from "react";
import "./Grid.css";
import Game from "../Game";

const sudokuSet = Game.sudukuSet;

const populateGrid = (sudokuSet) => {

   return ( <tr className="game__row"></tr>
   );

}

const Grid = () => {
  return (
    <>
      <div>
        <section className="game">
          <table className="game__board">
            <tbody>
              populateGrid();
              
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Grid;
