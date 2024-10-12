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
  getBoard(puzzleString) {
    let arrRows = [];
    for (let i = 0; i < 9; i++) {
      arrRows[i] = (puzzleString.slice(0 + i * 9, 9 + i * 9)).split("")//.map((el) => [el])
    }
    // console.log("rows", arrRows);
  }
  checkRowPlacement(puzzleString, row, value) {
    if (puzzleString[row].includes(value.toString())) {
      console.log(value, "is in row ", row)
      return false;
    }
    console.log(value, "is NOT in row ", row)
    return true
  }

  checkColPlacement(puzzleString, column, value) {
    let arrCols = ["", "", "", "", "", "", "", "", ""];
    // puzzleString = puzzleString.join("");
    console.log("puzzleString in colPlacenent", puzzleString);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arrCols[i] += puzzleString[(j * 9 + i)];
      }
      arrCols[i] = arrCols[i].split("")
    }
    // console.log("cols", arrCols);
    if (puzzleString[column].includes(value.toString())) {
      console.log(value, "is in column", column)
      return false;
    }
    console.log(value, "is NOT in column", column)
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let arrRegions = ["", "", "", "", "", "", "", "", ""];
    // puzzleString = puzzleString.join("");
    console.log("puzzleString in regionPlacenent", puzzleString);
    let offset = 0;
    for (let i = 0; i < 9; i++) {
      if (i > 2 && i < 6) {
        offset = 18
      }
      if (i > 5) {
        offset = 36
      }
      for (let j = 0; j < 3; j++) {
        arrRegions[i] += puzzleString.slice(j * 9 + i * 3 + offset, j * 9 + i * 3 + 3 + offset);
      }
      arrRegions[i] = arrRegions[i].split("");
    }
    // console.log("regions", arrRegions);
    let index;
    if (row < 3 && column < 3) {
      index = 0;
    } else if (row < 3 && column > 2 & column < 6) {
      index = 1;
    } else if (row < 3 && column > 5) {
      index = 2;
    } else if (row > 2 && row < 6 && column < 3) {
      index = 3;
    } else if (row > 2 && row < 6 && column > 2 & column < 6) {
      index = 4;
    } else if (row > 2 && row < 6 && column > 5) {
      index = 5;
    } else if (row > 5 && column < 3) {
      index = 6;
    } else if (row > 5 && column > 2 & column < 6) {
      index = 7;
    } else if (row > 5 && column > 5) {
      index = 8;
    }
    if (puzzleString[index].includes(value.toString())) {
      console.log(value, "is in region ", index)
      return false;
    }
    console.log(value, "is Not in region ", index)
    return true
  }
  checkCanPlace(solution, row, column, value) {


    if (this.checkRowPlacement(solution, row, value) &&
      this.checkColPlacement(solution, column, value) &&
      this.checkRegionPlacement(solution, row, column, value)) {
      console.log(value, "can be placed at", row, column);
      return true;
    } else {
      console.log(value, "cannot be placed at", row, column);
      return false;
    }

  }

  solve(puzzleString) {
    console.log("trying to solve");
    console.log(puzzleString);
    let board = [];
    // let arrCols = ["", "", "", "", "", "", "", "", ""];
    // let arrRegions = ["", "", "", "", "", "", "", "", ""];
    const possibles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    //turn string into arrays 
    //rows
    for (let i = 0; i < 9; i++) {
      board[i] = (puzzleString.slice(0 + i * 9, 9 + i * 9)).split("")//.map((el) => [el])
    }
    console.log("board", board);

    // columns 
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     arrCols[i] += puzzleString[(j * 9 + i)];
    //   }
    //   arrCols[i] = arrCols[i].split("")
    // }
    // console.log("cols", arrCols);

    // regions
    // let offset = 0;
    // for (let i = 0; i < 9; i++) {
    //   if (i > 2 && i < 6) {
    //     offset = 18
    //   }
    //   if (i > 5) {
    //     offset = 36
    //   }
    //   for (let j = 0; j < 3; j++) {
    //     arrRegions[i] += puzzleString.slice(j * 9 + i * 3 + offset, j * 9 + i * 3 + 3 + offset);
    //   }
    //   arrRegions[i] = arrRegions[i].split("");
    // }
    // console.log("regions", arrRegions);

    // cycle through boxes... start at first box

    // if box = "." 
    let solution = board.slice();
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (solution[row][column] == ".") {
        }
        this.checkCanPlace(solution, row, column, 1);
      }
    }

    //   // cycle through numbers - check current number 
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

