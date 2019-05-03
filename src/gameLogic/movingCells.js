import matrixRotate from 'matrix-rotate';
import { cellState } from './initCell'

export const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

export const movingCells = (initCells, direction) => {
  const cells = [ ...initCells ];

  const matrix = Array.from(new Array(4), () =>
    Array.from(new Array(4), () => 0),
  );

  cells.forEach(cell => {
    matrix[cell.y][cell.x] = cell
  });

  rotateMatrixFromDirection(matrix, direction);

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (matrix[y][x] === 0) continue;
      moveCell(matrix, x, y);
    }
  }

  rotateMatrixToDirection(matrix, direction);

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (matrix[y][x] === 0) continue;
      matrix[y][x].y = y;
      matrix[y][x].x = x;
    }
  }

  cells.filter(cell => cell.by != null).forEach(cell => {
    cell.x = cell.by.x;
    cell.y = cell.by.y;
    delete cell.by;
  })

  return cells;
}

function moveCell(matrix, x, y) {
  let nextRow = y - 1;
  let currentRow = y;

  while (nextRow >= 0) {
    if (matrix[nextRow][x] === 0) {
      matrix[nextRow][x] = matrix[currentRow][x]
      matrix[currentRow][x].state = cellState.MOVING;
      matrix[currentRow][x] = 0;

      currentRow = nextRow;
    } else if (
      matrix[nextRow][x].value === matrix[currentRow][x].value &&
      (matrix[nextRow][x].state === cellState.IDLE ||
        matrix[nextRow][x].state === cellState.MOVING)
    ) {
      matrix[nextRow][x].state = cellState.DYING;
      matrix[nextRow][x].by = matrix[currentRow][x];
      matrix[currentRow][x].state = cellState.INCREASE;
      matrix[nextRow][x] = matrix[currentRow][x];
      matrix[currentRow][x] = 0;
      currentRow = nextRow;
    } else {
      break
    }

    nextRow -= 1;
  }
};

function rotateMatrixFromDirection(matrix, direction) {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(matrix);
      break;
    case directions.DOWN:
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.RIGHT:
      matrixRotate(matrix);
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    default:
      break;
  }
};
function rotateMatrixToDirection(matrix, direction) {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(matrix);
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.DOWN:
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.RIGHT:
      matrixRotate(matrix);
      break;
    default:
      break;
  }
};
