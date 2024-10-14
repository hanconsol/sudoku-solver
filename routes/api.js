'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let validation = solver.validate(puzzle);
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
      }catch (error) {
        // todo find way to avoid timeout when can't be solved
        console.log({error: error.message});
        res.send({ error: 'Puzzle cannot be solved' })
      }
    }
    });
};
