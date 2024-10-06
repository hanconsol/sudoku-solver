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

  }
}

module.exports = SudokuSolver;

