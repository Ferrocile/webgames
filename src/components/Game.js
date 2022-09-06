//sample working dataset
//to be replaced by sudoku generator later
const sudokuSet = 
[
[3,0,6,5,0,8,4,0,0],
[5,2,0,0,0,0,0,0,0],
[0,8,7,0,0,0,0,3,1],
[0,0,3,0,1,0,0,8,0],
[9,0,0,8,6,3,0,0,5],
[0,5,0,0,9,0,6,0,0],
[1,3,0,0,0,0,2,5,0],
[0,0,0,0,0,0,0,7,4],
[0,0,5,2,0,6,3,0,0]
];

//given an array check for duplicates in the array
//true = duplicates
//false = no duplicates
const validateNumbers = (row) => {
  let vals = Object.create(null);
  for (let i = 0; i < row.length; i++) {
    let currentNum = row[i];
    if (currentNum in vals) {
      return true;
    }
    vals[currentNum] = true;
  }
  return false;
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
const returnCol = (colIdx,sudokuSet) => {
	let retArr = [];
  for(let i=0;i<sudokuSet[0].length;i++){
		retArr.push(sudokuSet[i][colIdx]);
  }
  return retArr;
};

//helper function for returnGrid()
const evaluateGridNum = x => {
	if(x < 3 ){
   	return 0;
  }
  if(x >= 3 && x < 6){
  	return 3;
  }
	return 6;
};

//returns the 3x3 grid as an array for a number 
//with coordinates that belongs to that grid
//as an array (valCoordinate)
//eg: [4,5] or [1,8]
const returnGrid = (valCoordinate,sudokuSet) => {
	let retArr = [];
  let x=evaluateGridNum(valCoordinate[0]);
  let y=evaluateGridNum(valCoordinate[1]);
		console.log(y);
  for(let i=x; i < x+3;i++){
  	for(let j=y; j < y+3; j++){
    	retArr.push(sudokuSet[i][j]);
    }
  }
  return retArr;
};

//given a coordinate and sudoku set
//return all valid playable numbers
//for that cell
const returnPlayableNumbers = (valCoordinate,sudokuSet) => {
    let availableVals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let usedVals = [];
    const x=valCoordinate[0];
    const y=valCoordinate[1];
    
    //get used values in row
    usedVals = returnRow(x,sudokuSet);

    //evaluate available numbers in row
    availableVals = usableNumbers(availableVals,usedVals);

    //get used values in column
    usedVals = returnCol(y,sudokuSet);

    //available numbers in column
    availableVals = usableNumbers(availableVals,usedVals);

    //get used values in 3x3 grid
    usedVals = returnGrid(valCoordinate,sudokuSet);

    //available numbers in 3x3 grid
    availableVals = usableNumbers(availableVals,usedVals);

    return availableVals;
};

export default Game;