/**
 * State
 * @typedef {Object} State
 * @property {Matrix} matrix
 * @property {Size} size
 * @property {number} mines
 * @property {Position} position
 * @property {Action} action
 * @property {string} message
 */

/**
 * Matrix
 * @typedef {Array<Array<number>>} Matrix
 */

/**
 * Size
 * @typedef {Object} Size
 * @property {number} w - width
 * @property {number} h - height
 */

/**
 * Position
 * @typedef {Object} Position
 * @property {number} x - x axis
 * @property {number} y - y axis
 */

/**
 * Action
 * @typedef {0 | 1 | 2} Action
 */

const MINE = 9;

/**
 * Returns a random position within the given size
 * @param {Size} size
 * @returns {Position}
 */
function randomPosition(size) {
    return {
        x: Math.floor(Math.random() * size.w),
        y: Math.floor(Math.random() * size.h)
    };
}

/**
 * Returns an array with all valid neighboring positions
 * @param {Size} size 
 * @param {Position} position 
 * @returns {Array<Position>}
 */
function neighbors(size, position) {
    result = [];

    if (position.x - 1 >= 0 && position.y - 1 >= 0)         {result.push({x: position.x - 1, y: position.y - 1})};
    if (position.x - 1 >= 0)                                {result.push({x: position.x - 1, y: position.y    })};
    if (position.x - 1 >= 0 && position.y + 1 < size.h)     {result.push({x: position.x - 1, y: position.y + 1})};
    if (position.y - 1 >= 0)                                {result.push({x: position.x    , y: position.y - 1})};
    if (true)                                               {result.push({x: position.x    , y: position.y    })};
    if (position.y + 1 < size.h)                            {result.push({x: position.x    , y: position.y + 1})};
    if (position.x + 1 < size.w && position.y - 1 >= 0)     {result.push({x: position.x + 1, y: position.y - 1})};
    if (position.x + 1 < size.w)                            {result.push({x: position.x + 1, y: position.y    })};
    if (position.x + 1 < size.w && position.y + 1 < size.h) {result.push({x: position.x + 1, y: position.y + 1})};

    return result;
}

/**
 * returns an array of unique positions with given length
 * that are not inside a 3x3 square around the given position
 * @param {Matrix} matrix
 * @param {Size} size
 * @param {Position} position
 * @param {number} mines
 * @returns {Matrix}
 */
function fillMines(matrix, size, mines, position) {
    let result = matrix;
    let positionsToAvoid = neighbors(size, position);

    while (mines) {
        let newPosition = randomPosition(size);

        if (
            positionsToAvoid.every(function (positionToAvoid) {
                return (
                    positionToAvoid.x !== newPosition.x || positionToAvoid.y !== newPosition.y
                );
            })
        ) {
            result[newPosition.y][newPosition.x] = MINE;
            positionsToAvoid.push(newPosition);
            mines--;
        }
    }

    return result;
}

function openCell(state) {
    let result = state;
    
    if (state.matrix[state.position.y][state.position.x] === MINE) {
        // game over
    } else if (0 < state.matrix[state.position.y][state.position.x] < MINE) {
        // open cell
    } else if (state.matrix[state.position.y][state.position.x] === 0) {
        // open surrounding cells
    }

    return result;
}

/**
 * Returns a Matrix with updated amounts of neghboring mines
 * @param {Matrix} matrix
 * @param {Size} size
 * @returns 
 */
function countMines(matrix, size) {
    let result = matrix;

    result.forEach(function (row, y) {
        row.forEach(function (cell, x) {
            if (cell !== MINE) {
                let neighboringCells = neighbors(size, {x, y});
                let count = 0;
                neighboringCells.forEach(function (position) {
                    if (result[position.y][position.x] === MINE) {
                        count += 1;
                    }
                });
                result[y][x] = count;
            }
        });
    });

    return result;
}

/**
 * The entry point to the minesweeper game
 * @param {State} state 
 * @returns {State}
 */
function minesweeper(state) {
    let result = state;

    // validate the inputs

    if (result.action === 0) {// equivalent to new game
        result.matrix = fillMines(result.matrix, result.size, result.mines, result.position);
        result.matrix = countMines(result.matrix, result.size);
        result = openCell(result);

        console.log('fillMines() =>', result);
        console.log('countMines() =>', result);
        console.log('openCell() =>', result);
    } else if (result.action === 1) {// equivalent to open cell
        // calculate a left click on the given position
    } else if (result.action === 2) {// equivalent to flag or chord depending on position
        // calculate a right click on the given position
    }

    return result;
}

let state = {
    matrix: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    size: {w: 5, h: 5},
    mines: 5,
    position: {x: 0, y: 0},
    action: 0,
    message: ''
}

let newState = minesweeper(state);

console.log('minesweeper() =>', newState);
