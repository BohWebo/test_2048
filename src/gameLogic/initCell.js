import { generate }  from 'randomstring';

const createCell = (x, y, value) => ({
  x,
  y, 
  value,
  id: generate({
    length: 16,
    charset: 'hex',
  })
}) 

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomCoordinate = () => {
  return getRandomNumber(0, 4);
}


export const initCells = () => {
  const cell1 = createCell(getRandomCoordinate(), getRandomCoordinate(), 2)
  const cell2 = createCell(getRandomCoordinate(), getRandomCoordinate(), 2)

  if (cell1.x === cell2.x && cell1.y === cell2.y) {
    cell1.x = cell1.x === 0 ? 1 : cell1.x - 1
  }

  return [cell1, cell2]
}

