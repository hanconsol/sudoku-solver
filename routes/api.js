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
    let result =  solver.validate(puzzle);
    if (result != "valid") { 
    res.send(result);
    return
    } else { 
    res.send({error: result});
    console. log(result )
    }
    });
};
