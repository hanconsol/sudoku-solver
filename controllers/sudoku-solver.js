class SudokuSolver {
  createBoard(puzzleString) {
    // create board array
    let board = [];
    for (let i = 0; i < 9; i++) {
      board[i] = (puzzleString.slice(0 + i * 9, 9 + i * 9)).split("");
    }
    return board;
  }
  convertCoordinate(coordinate) {
    const rowdRegX = /^([a-i])/i;
    const colRegX = /([1-9])$/;
    let row = 0;
    let column = 0;
    const rowLetter = coordinate.match(rowdRegX);
    const columnIn = coordinate.match(colRegX);
    switch (rowLetter[0]) {
      case "a":
      case "A":
        row = 0;
        break;
      case "b":
      case "B":
        row = 1;
        break;
      case "c":
      case "C":
        row = 2;
        break;
      case "d":
      case "D":
        row = 3;
        break;
      case "e":
      case "E":
        row = 4;
        break;
      case "f":
      case "F":
        row = 5;
        break;
      case "g":
      case "G":
        row = 6;
        break;
      case "h":
      case "H":
        row = 7;
        break;
      case "i":
      case "I":
        row = 8;
        break;
    }
    column = (parseInt(columnIn[0]) - 1);
    console.log("row", rowLetter[0], "to ", row, "column", column);

    return { row: row, column: column }
  }

  validate(puzzleString, coordinate, value, type) {
    const charRegx = /^[\.*1-9*\.*]+$/g;
    const numCharRegx = /^.{81}$/g;
     if ((!puzzleString || puzzleString === " " || !coordinate || coordinate === " " || !value || value === " ") && type === "solve") {
          return { error: 'Required field missing' };
        }
    if ((!puzzleString || puzzleString === " " || !coordinate || coordinate === " " || !value || value === " ") && type === "check") {
      return { error: 'Required field(s) missing' };
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
      console.log(value, "is in row ", row + 1)
      return false;
    }
    console.log(value, "is NOT in row ", row + 1)
    return true
  }

  checkColPlacement(puzzleString, column, value) {
    let arrCols = ["", "", "", "", "", "", "", "", ""];
    puzzleString = puzzleString.map((el) => el.join("")).reduce((acc, curr) => acc + curr, "");
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arrCols[i] += puzzleString[(j * 9 + i)];
      }
      arrCols[i] = arrCols[i].split("")
    }
    // console.log("cols", arrCols);
    if (arrCols[column].includes(value.toString())) {
      console.log(value, "is in column", column + 1)
      return false;
    }
    console.log(value, "is NOT in column", column + 1)
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let arrRegions = ["", "", "", "", "", "", "", "", ""];
    puzzleString = puzzleString.map((el) => el.join("")).reduce((acc, curr) => acc + curr, "");

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
    if (arrRegions[index].includes(value.toString())) {
      console.log(value, "is in region ", index + 1)
      return false;
    }
    console.log(value, "is Not in region ", index + 1)
    return true
  }
  checkCanPlace(solution, row, column, value) {


    if (this.checkRowPlacement(solution, row, value) &&
      this.checkColPlacement(solution, column, value) &&
      this.checkRegionPlacement(solution, row, column, value)) {
      console.log(value, "can be placed at", row + 1, column + 1);
      return true;
    } else {
      console.log(value, "cannot be placed at", row + 1, column + 1);
      return false;

    }
  }
  checkCanPlaceOne(solution, row, column, value) {
    let valid = false;
    let conflict = "";

    if (!this.checkRowPlacement(solution, row, value)) {
      conflict += "row "
    }
    if (!this.checkColPlacement(solution, column, value)) {
      conflict += "column "
    }
    if (!this.checkRegionPlacement(solution, row, column, value)) {
      conflict += "region";
    }
    if (!conflict) {
      return {valid: true}
    }else {
      return {valid: false, conflict: conflict}
    };

    
  }
  solve(puzzleString) {
    console.log("trying to solve");
    console.log(puzzleString);
    let badPuzzle = false;
    let resultInitVerify = false;

    // create board array
    let board = this.createBoard(puzzleString);
    console.log("board", board);


    let solution = board.slice();

    //if board starts with double numbers in any row, column or region
    const verifyInitial = (solution, row, column) => {
      // if no more rows
      if (row > 8) {
        console.log("puzzle passed initial scan after # ☑️");
        resultInitVerify = false;
        return;
      }
      console.log("verify initial row ", row + 1, "column", column + 1);
      console.log("value ", solution[row][column])
      // if square is Not empty
      if (solution[row][column] != ".") {
        // see is can be placed
        let temp = solution[row][column];
        console.log("temp", temp);
        solution[row][column] = ".";
        if (this.checkCanPlace(solution, row, column, temp)) {
          solution[row][column] = temp;
          // if can be placed
          // go to next column
          column++
          // if no more columns
          if (column > 8) {
            // go to next row
            row++;
            column = 0;
          }
          // else repeat from new position
          verifyInitial(solution, row, column)
          // in other words, I want to see if each number can be placed where it already is
        } else {
          solution[row][column] = temp;
          console.log("puzzle went bad at", row + 1, column + 1);
          console.log(solution[row][column], "won't fit");
          resultInitVerify = true;
          return;
        }

      } else {
        column++
        // if no more columns
        if (column > 8) {
          // go to next row
          row++;
          column = 0;
        }

        console.log("No number SKIP")
        verifyInitial(solution, row, column);
      }

    }
    verifyInitial(solution, 0, 0);
    if (resultInitVerify) {
      return false;
    }

    // recursive function
    const placeLoop = (solution, row, column, indX, placeRecord = []) => {
      // possible numbers which can be placed
      const possibles = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      // recursion safety net
      if (indX > 8) {
        console.log("no more possibles");
        console.log(solution);
        badPuzzle = true;
        return;
      }
      // if square is empty
      if (solution[row][column] == ".") {
        // see is can be placed
        if (this.checkCanPlace(solution, row, column, possibles[indX])) {
          // place if can be placed
          solution[row][column] = possibles[indX];
          // record where placed for backpacking
          placeRecord.push(row, column);
          console.log("placeRecord", placeRecord.map((el) => el + 1));
          console.log("placed ", possibles[indX], "at", row + 1, column + 1);
          // go to next column
          column++
          // if no more columns
          if (column > 8) {
            // go to next row
            row++;
            column = 0;
          }
          // if no more rows
          if (row > 8) {
            console.log("puzzle solved 🥳🥳🥳");
            return { solution: solution };
          }
          // else repeat from new position
          placeLoop(solution, row, column, 0, placeRecord)
          // if no more possible numbers to try
        } else if (indX === 8) {
          // go back one column
          column--;
          // if no more columns
          if (column < 0) {
            // go back one row 
            row--;
            column = 8;
          }
          // if no more rows
          if (row < 0) {
            console.log("puzzle cannot be solved");
            badPuzzle = true;
            return;
          }
          // get position of last number placed
          console.log("popping ", solution[row][column], "at", row + 1, column + 1);
          column = placeRecord.pop();
          row = placeRecord.pop();
          console.log("trying to undo", row + 1, column + 1);
          // if number is a 9
          while (solution[row][column] === "9") {
            console.log("popping ", solution[row][column], "at", row + 1, column + 1);
            // set to blank
            solution[row][column] = ".";
            // go back one more number
            column = placeRecord.pop();
            row = placeRecord.pop();
          }
          // increment possibles index so not to replace same number
          indX = possibles.indexOf(solution[row][column]) + 1;
          // set number to blank
          solution[row][column] = ".";
          // try next possible number at new position
          placeLoop(solution, row, column, indX, placeRecord);
        } else {
          // have not tried all possibles numbers yet so try next
          placeLoop(solution, row, column, indX + 1, placeRecord)
        }
      } else {
        // the number at this position was part of original puzzle string
        // inc column if no more columns inc you row
        if (column++ > 8) {
          row++;
          column = 0;
        }
        // if no more rows
        if (row > 8) {
          console.log("puzzle solved 🥳🥳🥳");
          return { solution: solution };
        }
        //  else cycle through all possible numbers at this position
        placeLoop(solution, row, column, 0, placeRecord);
      }
    }
    // call solve recursion function
    placeLoop(solution, 0, 0, 0);
    // console.log(typeof solution.map((el) => [el]).join(""), solution.map((el) => [el]).join("").replace(/\,/g, ""));
    // when can't be solved
    if (badPuzzle) {
      return false;
    } else {
      // when solved
      return solution.map((el) => [el]).join("").replace(/\,/g, "")
    }

  }
}

module.exports = SudokuSolver;

