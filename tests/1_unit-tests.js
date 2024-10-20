const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;
const puzzle81 = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const puzzleInvalid = "Inv..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const puzzleShort = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.";
const puzzleLong = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";
const goodPuzzle2 =     '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const goodPuzzle2Answer =     '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
const badPuzzle1 = "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const badPuzzle2 =     '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492..11';
const goodPuzzle3 =     '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
const goodPuzzle3Answer =     '568913724342687519197254386685479231219538467734162895926345178473891652851726943';






suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.validate(puzzle81, "a1", "1", "solve"), "valid")
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.deepEqual(solver.validate(puzzleInvalid, "a1", "1", "solve"), { error: "Invalid characters in puzzle" })
    });
    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.deepEqual(solver.validate(puzzleShort, "a1", "1", "solve"), { error: 'Expected puzzle to be 81 characters long' });
        assert.deepEqual(solver.validate(puzzleLong, "a1", "1", "solve"), { error: 'Expected puzzle to be 81 characters long' });
    });
    test('Logic handles a valid row placement', () => {
        assert.equal(solver.checkRowPlacement(solver.createBoard(puzzle81), 0, "7"), true);
        assert.equal(solver.checkRowPlacement(solver.createBoard(puzzle81), 1, "6"), true);
    });
    test('Logic handles an invalid row placement', () => {
        assert.isFalse(solver.checkRowPlacement(solver.createBoard(puzzle81), 0, "9"));
    });
    test('Logic handles a valid column placement', () => {
        assert.isTrue(solver.checkColPlacement(solver.createBoard(puzzle81), 0, "3"));
    });
    test('Logic handles an invalid column placement', () => {
        assert.isFalse(solver.checkColPlacement(solver.createBoard(puzzle81), 0, "4"));
    });
    test('Logic handles a valid region (3x3 grid) placement', () => {
        assert.isTrue(solver.checkRegionPlacement(solver.createBoard(puzzle81), 0, 1, "7"))
    });
    test('Logic handles an invalid region (3x3 grid) placement', () => {
        assert.isFalse(solver.checkRegionPlacement(solver.createBoard(puzzle81), 0, 2, "8"));
    });
    test('Valid puzzle strings pass the solver', () => {
        assert.isNotFalse(solver.solve(puzzle81));
        assert.equal(solver.solve(goodPuzzle2), goodPuzzle2Answer);
    });
    test('Invalid puzzle strings fail the solver', () => {
        assert.isFalse(solver.solve(badPuzzle1));
        assert.isFalse(solver.solve(badPuzzle2));
    });
    test('Solver returns the expected solution for an incomplete puzzle', () => {
        assert.equal(solver.solve(goodPuzzle3), goodPuzzle3Answer);
    });



});

/*
Solver returns the expected solution for an incomplete puzzle
*/