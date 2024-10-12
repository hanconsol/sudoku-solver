class SudokuSolver {


  validate(puzzleString) {
    const charRegx = /^[\.*1-9*\.*]+$/g;
    const numCharRegx = /^.{81}$/g;
    if (!puzzleString || puzzleString === " ") {
      return { error: 'Required field missing' };
    }
    if (!charRegx.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' }
    }
    if (!numCharRegx.test(puzzleString)) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    return "valid"
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    console.log("trying to solve");
    console.log(puzzleString);
    let arrRows = [];
    let arrCols = ["", "", "", "", "", "", "", "", ""];
    let arrColsTemp = [];
    let arrRegionsTemp = [];
    let arrRegions = ["", "", "", "", "", "", "", "", ""];
    const possibles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    //turn string into arrays 
    //rows
    for (let i = 0; i < 9; i++) {
      arrRows[i] = (puzzleString.slice(0 + i * 9, 9 + i * 9))//.split("")//.map((el) => [el])
    }
    console.log("rows", arrRows);

    // columns 
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arrCols[i] += puzzleString[(j * 9 + i)];
      }
    }
    console.log("cols", arrCols);

    // regions
    let offset = 0;
    for (let i = 0; i < 9; i++) {
      if (i > 2 && i < 6) {
        offset = 18
      }
      if (i > 5 ) {
        offset = 36
      }
    
    for (let j = 0; j < 3; j++) {
      arrRegions[i] += puzzleString.slice(j * 9 + i * 3 + offset, j * 9 + i * 3 + 3 + offset);

    }

  }
    // for (let offset = 0; offset < 7; offset += 3) {
    //   for (let i = 0; i < 9; i++) {
    //     for (let j = 0; j < 3; j++) {
    //       arrRegionsTemp.push(arrCols[i][(j + offset)])
    //     }
    //   }
    // }
    // for (let i = 0; i < 9; i++) {
    //   arrRegions.push(arrRegionsTemp.slice(0 + i * 9, 9 + i * 9))
    // }

    console.log("regions", arrRegions);

    // cycle through boxes... start at first box

    // if box = "." 
    let row = 0;
let column = 0;

    // if (/*currentBox[row][column]*/arrRows[row][column] == ".") {

    //   // cycle through numbers - check current number 

    //   for (let num of possibles) {
    //     // if number can be placed (not in col, row, or region)
    //     console.log("arrRows[0]", arrRows[row]);
    //     console.log("arrRows[0][0]", arrRows[row][column]);

    //     if ( /*currentRow*/!arrRows[row].includes(num) && /*currentCol*/ !arrCols[column].includes(num) && /*currentRegion*/ !arrRegions[0].includes(num)) {

    //       console.log("!arrRows[0].includes(num)", !arrRows[row].includes(num), "num", num);
    //       // place number 
    //       /*currentBox*/arrRows[row][column] = num;
    //       console.log("did switch", arrRows[row][column]);
    //       // increment currentBox[row][column + 1]
    //     }
    //     row++
    //   }
    // }

    // if end of col / no more boxes 

    // go to next col 

    // if no more cols 

    // return solution

    // else if number can't be placed,

    // repeat with next number

    // if no number can be placed in box 

    // go back to previous box and try next number

    // if it's the first box / no previous box exists

    // puzzle can't be solved

  }
}

module.exports = SudokuSolver;

