import { cellState } from './initCell'

export const increaseCell = (cells = []) => {
  
  return cells
    .filter(cell => cell.state !== cellState.DYING)
    .map(cell => {
      if (cell.state === cellState.INCREASE) {
        cell.value *= 2;
        cell.increased = true;
       }

      cell.state = cellState.IDLE;

      return cell;
  })
}
