const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const goodPuzzle2 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const goodPuzzle2Answer = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
const puzzleInvalid = "Inv..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const puzzleShort = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.";
const badPuzzle1 = "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const puzzle81 = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const puzzleLong = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";


suite('Functional Tests', () => {
    suite('Solve a puzzle: POST request to /api/solve', () => {
        test('With valid puzzle string', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: goodPuzzle2 })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.isNotFalse(res.body.solution);
                    assert.equal(res.body.solution, goodPuzzle2Answer);
                });
            done();
        }).timeout(10000);

        test('With missing puzzle string', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: "" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Required field missing' });
                });
            done();
        }).timeout(10000);

        test('With invalid characters', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: puzzleInvalid })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
                });
            done();
        }).timeout(10000);
        test('With incorrect length', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: puzzleShort })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
                });
            done();
        }).timeout(10000);
        test('Cannot be solved', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: badPuzzle1 })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
                });
            done();
        }).timeout(10000);
    });
    suite('Check a puzzle placement: POST request to /api/check', () => {
        test('All fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "a1", value: "7" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { "valid": true });
                });
            done();
        }).timeout(10000);
        test('Single placement conflict', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "g3", value: "1" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { "valid": false, "conflict": "row " });
                });
            done();
        }).timeout(10000);
        test('Multiple placement conflicts', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "c6", value: "5" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: false, conflict: 'column region' });
                });
            done();
        }).timeout(10000);
        test('All placement conflicts', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "b6", value: "5" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: false, conflict: 'row column region' });
                });
            done();
        }).timeout(10000);
        test('Missing required fields', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "b6", value: "" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                });
            done();
        }).timeout(10000);
        test('Invalid characters', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzleInvalid, coordinate: "b6", value: "5" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { "error": "Invalid characters in puzzle" });
                });
            done();
        }).timeout(10000);
        test('Incorrect length', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzleLong, coordinate: "b6", value: "5" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { "error": "Expected puzzle to be 81 characters long" });
                });
            done();
        }).timeout(10000);
        test('Invalid placement coordinate', (done) => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle81, coordinate: "b0", value: "5" })
                .end((req, res) => {
                    console.log(res.body);
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'Invalid coordinate' });
                });
            done();
        }).timeout(10000);
          test('Invalid placement value', (done) => {
                    chai
                        .request(server)
                        .keepOpen()
                        .post('/api/check')
                        .send({ puzzle: puzzle81, coordinate: "b5", value: "0" })
                        .end((req, res) => {
                            console.log(res.body);
                            assert.equal(res.status, 200);
                            assert.deepEqual(res.body, { error: 'Invalid value' });
                        });
                    done();
                }).timeout(10000);
    });
});
/*
Check a puzzle placement with invalid placement coordinate: POST request to /api/check
Check a puzzle placement with invalid placement value: POST request to /api/check
*/

