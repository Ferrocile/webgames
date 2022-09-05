import React from "react";
import './Grid.css';

const Grid = () => {
  return (
    <>
      <section className="game">
        <table className="game__board">
          <tbody>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
            <tr className="game__row" ></tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Grid;
