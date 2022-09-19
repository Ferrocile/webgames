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
    let vals = Object.create(null);
    for (let i = 0; i < row.length; i++) {
      let currentNum = row[i];
      if (currentNum in vals) {
        return false;
      }
      vals[currentNum] = true;
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

export default sudokuHelpers;