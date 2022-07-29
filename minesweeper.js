/* This could be migrated to TypeScript
Class Position {
    x: Number, // width
    y: Number // height
}
Accessed in Matrix[y][x]
`matrix[position[1]][position[0]]` */

const MINE = 9;

/**
 * Returns a random position inside the given width and height
 * @param {Number} width 
 * @param {Number} height 
 * @returns {Array[Number]}
 */
function randomPosition(width, height) {
    return [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
    ];
}

/**
 * Returns an array with all valid neighboring positions
 * @param {Number} width 
 * @param {Number} height 
 * @param {Array[Number]} position 
 * @returns {Array[Array[Number]]}
 */
function neighbors(width, height, position) {
    result = [];

    if (position[0] - 1 >= 0 && position[1] - 1 >= 0)        {result.push([position[0] - 1, position[1] - 1])};
    if (position[0] - 1 >= 0)                                {result.push([position[0] - 1, position[1]    ])};
    if (position[0] - 1 >= 0 && position[1] + 1 < height)    {result.push([position[0] - 1, position[1] + 1])};
    if (position[1] - 1 >= 0)                                {result.push([position[0]    , position[1] - 1])};
    if (true)                                                {result.push([position[0]    , position[1]    ])};
    if (position[1] + 1 < height)                            {result.push([position[0]    , position[1] + 1])};
    if (position[0] + 1 < width && position[1] - 1 >= 0)     {result.push([position[0] + 1, position[1] - 1])};
    if (position[0] + 1 < width)                             {result.push([position[0] + 1, position[1]    ])};
    if (position[0] + 1 < width && position[1] + 1 < height) {result.push([position[0] + 1, position[1] + 1])};

    return result;
}

/**
 * returns an array of unique positions with given length
 * that are not inside a 3x3 square around the given position
 * @param {Array[Array[Number]]} matrix
 * @param {Number} width
 * @param {Number} height
 * @param {Array[Number]} position
 * @param {Number} mines
 * @returns {Array[Array[Number]]} Array of positions
 */
function fillMines(matrix, width, height, position, mines) {
    let result = matrix;
    let positionsToAvoid = neighbors(width, height, position);

    while (mines) {
        let newPosition = randomPosition(width, height);

        if (
            positionsToAvoid.every(function (value) {
                return (
                    value[0] !== newPosition[0] || value[1] !== newPosition[1]
                );
            })
        ) {
            result[newPosition[1]][newPosition[0]] = MINE;
            positionsToAvoid.push(newPosition);
            mines--;
        }
    }

    return result;
}

function openCell(matrix, position) {
    let result = matrix;
    // return recalculated matrix
    return result;
}

function countMines(matrix, width, height) {
    let result = matrix;

    result.forEach(function (row, y) {
        row.forEach(function (cell, x) {
            if (cell !== 9) {
                let neighboringCells = neighbors(width, height, [x, y]);
                let count = 0;
                neighboringCells.forEach(function (position) {
                    if (result[position[1]][position[0]] === MINE) {
                        count += 1;
                    }
                });
                result[y][x] = count;
            }
        });
    });

    return result;
}

function populateMatrix(matrix, position, mines) {
    let result = matrix;
    let width = matrix[0].length;
    let height = matrix.length;

    result = fillMines(result, width, height, position, mines);
    console.log('fillMines() =>', result);
    result = countMines(result, width, height);
    console.log('countMines() =>', result);
    result = openCell(result, position);
    console.log('openCell() =>', result);

    return result;
}

function minesweeper(matrix, position, action, mines) {
    let result = {
        matrix: [],
        message: "",
    };

    // validate the inputs

    if (action === 0) {
        // populate given matrix with a number of mines, avoiding the given position
        result.matrix = populateMatrix(matrix, position, mines);
    } else if (action === 1) {
        // calculate a left click on the given position
    } else if (action === 2) {
        // calculate a right click on the given position
    }

    return result;
}

console.log(
    'minesweeper() =>',
    minesweeper(
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [0, 0],
        0,
        5
    )
);
