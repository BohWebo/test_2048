import { createCell, getRandomNumber } from './initCell';


export const populateField = cells => {
  const occupiedCoords = new Set();
  cells.forEach(cell => {
    occupiedCoords.add(cell.x * 4 + cell.y);
  });

  if (occupiedCoords.size === 16) return;
  let x;
  let y;
  let startSize = occupiedCoords.size;
  do {
    x = getRandomNumber(0, 4);
    y = getRandomNumber(0, 4);

    const sum = x * 4 + y;
    occupiedCoords.add(sum);
  } while (startSize === occupiedCoords.size);


  return [...cells, createCell(x, y, 2)];
}
