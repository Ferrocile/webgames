const _ = require('lodash');
//sample working dataset
//to be replaced by sudoku generator later
const sampleSet = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

/*
  Sudoku Generation Functions
*/

let sudoku = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
/*
 Helper functions
 */


//return a random array consisting of 1-9
const randomizeArray = () => {
  let retArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return retArr.sort(() => Math.random() - 0.5);
};

//populate 3x3 grid starting at position xy
const populateGridAt = (xy, arr, sudokuSet) => {
  let x = xy[0];
  let y = xy[1];
  let tmpArr = arr;
  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      sudokuSet[i][j] = tmpArr.pop();
    }
  }
};

//given an array check for duplicates in the array
//false = duplicates
//true = no duplicates
const validateNumbers = (row) => {
  let vals = new Map();
  const tmpRow = row.filter((f) => { return f !== 0});
  for (let i = 0; i < tmpRow.length; i++) {
    let currentNum = tmpRow[i];
    if (vals.has(currentNum)) {
      return false;
    }
    vals.set(currentNum, true);
  }
  return true;
};

//given two arrays, return an array of available numbers
//usedVals are numbers that are already used in the array
//availableVals are numbers that have yet to be played
const usableNumbers = (availableVals = [], usedVals = []) => {
  if (availableVals.length === 0) {
    availableVals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  if (usedVals.length === 0) {
    return availableVals;
  }
  const returnArr = availableVals.filter((f) => !usedVals.includes(f));
  return returnArr;
};

//returns a row as an array
const returnRow = (rowIdx, sudokuSet) => {
  return sudokuSet[rowIdx];
};

//return column as an array starting from the
//first row at the index given
const returnCol = (colIdx, sudokuSet) => {
  let retArr = [];
  for (let i = 0; i < sudokuSet[0].length; i++) {
    retArr.push(sudokuSet[i][colIdx]);
  }
  return retArr;
};

//helper function for returnGrid()
const evaluateGridNum = (x) => {
  if (x < 3) {
    return 0;
  }
  if (x >= 3 && x < 6) {
    return 3;
  }
  return 6;
};

//returns the 3x3 grid as an array for a number
//with coordinates that belongs to that grid
//as an array (valCoordinate)
//eg: [4,5] or [1,8]
const returnGrid = (valCoordinate, sudokuSet) => {
  let retArr = [];
  let x = evaluateGridNum(valCoordinate[0]);
  let y = evaluateGridNum(valCoordinate[1]);
  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      retArr.push(sudokuSet[i][j]);
    }
  }
  return retArr;
};

/*
  End Helper Functions
*/


/*
  Populate the grids diagonally from top left to bottom right
  |x|_|_|
  |_|x|_|
  | | |x|
*/
const populateDiagonalGrids = (sudokuSet) => {
  for (let i = 0; i < 7; i = i + 3) {
    //get randomized array of numbers 1-9
    let arr = randomizeArray();

    populateGridAt([i, i], arr, sudokuSet);
  }
  return sudokuSet;
};
const solveSudoku = (sudokuSet) => {
  if (fillSudoku(sudokuSet)) {
    return sudokuSet;
  } 
};

//recursively fill the rest of the sudoku grid
const fillSudoku = (sudokuSet) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      if (sudokuSet[i][j] === 0) {

        //get array of playable numbers based on row,column, and 3x3 grid
        let validNums = returnPlayableNumbers([i, j], sudokuSet);
        for (let k = 0; k < validNums.length; k++) {
          let guess = validNums[k];
          //make sure guess number is valid at this location before setting it
          if (checkValid([i, j], guess, sudokuSet)) {

            sudokuSet[i][j] = guess;

            if (fillSudoku(sudokuSet)) {
              return true;
            }
            sudokuSet[i][j] = 0;
          }
        }
        return false; //no solution exists
      }
    }
  }
  return true;
};

//Checks if current placed number is valid
const checkValid = (coordinateArr, numGuess, sudokuSet) => {
  let x = coordinateArr[0];
  let y = coordinateArr[1];
  let tmpSet = _.cloneDeep(sudokuSet);
  tmpSet[x][y] = numGuess;
  if(validateNumbers(tmpSet[x]) &&
    validateNumbers(returnCol(y, tmpSet)) &&
    validateNumbers(returnGrid([x, y], tmpSet))){
      return true;
    }

  return false;
};

//remove x numbers from the grid randomly
const removeNumbersFromGrid = (sudokuSet, difficulty = 1) => {
  return sudokuSet;
};

//generate easy, medium, or hard sudoku
const generateSudoku = (difficulty) => {
  let sudokuSet = sudoku;

  populateDiagonalGrids(sudokuSet);

  solveSudoku(sudokuSet);

  removeNumbersFromGrid(difficulty, sudokuSet);

  return sudokuSet;
};

/*
  End Sudoku Generation Functions
*/

//given a coordinate and sudoku set
//return all valid playable numbers
//for that cell
const returnPlayableNumbers = (valCoordinate, sudokuSet) => {
  let availableVals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let usedVals = [];
  const x = valCoordinate[0];
  const y = valCoordinate[1];

  //get used values in row
  usedVals = returnRow(x, sudokuSet);

  //evaluate available numbers in row
  availableVals = usableNumbers(availableVals, usedVals);

  //get used values in column
  usedVals = returnCol(y, sudokuSet);

  //available numbers in column
  availableVals = usableNumbers(availableVals, usedVals);

  //get used values in 3x3 grid
  usedVals = returnGrid(valCoordinate, sudokuSet);

  //available numbers in 3x3 grid
  availableVals = usableNumbers(availableVals, usedVals);

  return availableVals;
};

console.log(generateSudoku());

