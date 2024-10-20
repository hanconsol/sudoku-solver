'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      console.log(puzzle, "coordinate", coordinate, "value", value);
      // convert coordinate into row column
      const coordRegX = /^[a-i][1-9]$/i;
      const valueRegX = /^[1-9]$/;
      let type = "check";
      let validation = solver.validate(puzzle, coordinate, value, type);
      if (validation != "valid") {
        res.send(validation);
        console.log(validation);
        return
      } else {
        // res.send({ error: validation });
        console.log(validation)
      }

      if (!coordRegX.test(coordinate)) {
        res.send({ error: 'Invalid coordinate' });
        console.log({ error: 'Invalid coordinate' });
        return;
      }

      if (!valueRegX.test(value)) {
        res.send({ error: 'Invalid value' });
        console.log({ error: 'Invalid value' });
        return;
      }
      let { row, column } = solver.convertCoordinate(coordinate);
      console.log("row", row, "column", column);
      let board = solver.createBoard(puzzle);
      if (board[row][column] === value) {
        res.send({ valid: true });
        return;
      }
      let checkOne = solver.checkCanPlaceOne(board, row, column, value);
      res.send(checkOne);
      console.log(checkOne);
    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let type = "solve";
      let validation = solver.validate(puzzle, "a1", "1", type);
      if (validation != "valid") {
        res.send(validation);
        return
      } else {
        // res.send({ error: validation });
        console.log(validation)
      }
      if (validation === "valid") {
        try {
          let solution = solver.solve(puzzle);
          if (!solution) {
            res.send({ error: 'Puzzle cannot be solved' });
            console.log("{ error: 'Puzzle cannot be solved' }");
          } else {
            res.send({ solution: solution });
            console.log(solution);
          }
        } catch (error) {
          console.log({ error: error.message }, puzzle);
          res.send({ error: 'Puzzle cannot be solved' })
        }
      }
    });
};
