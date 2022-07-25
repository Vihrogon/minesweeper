function safePosition(width, height, position) {
    let result = [0,0];
    // return random vector in range
    return result;
}

function openCell(matrix, position) {
    let result = matrix;
    // return recalculated matrix
    return result;
}

function countMines(matrix) {
    let result = matrix;

    result.forEach(function (row, y) {
        row.forEach(function (cell, x) {
            if (cell !== 9) {
                // todo
                result[y][x] += 1;
            }
        });
    });

    return result;
}

function populateMatrix(matrix, position, mines) {
    let result = matrix;
    let width = matrix[0].length;
    let height = matrix.length;
    let newPosition;

    while (mines) {
        // todo make array of positions
        newPosition = safePosition(width, height, position);

        // todo forEach
        result[newPosition[1]][newPosition[0]] = 9;
        mines--;
    }

    result = countMines(result);
    result = openCell(result, position);

    return result;
}

function minesweeper(matrix, position, action, mines) {
    let result = {
        matrix: [],
        message: ''
    }

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

console.log(minesweeper([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], [0, 0], 0, 5));