import React from 'react';

import Header from './components/Header';
import Field from './components/Field/Field';
import ControlPanel from './components/ControlPanel/ControlPanel';
import { initCells } from './gameLogic/initCell';
import { directions } from './gameLogic/moveCells';
import { moveCells } from './gameLogic/moveCells';
import { increaseCell } from './gameLogic/increaseCell';
import { populateField } from './gameLogic/populateField';
 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  KeyCodeToDirection = {
    '37': directions.LEFT,
    '38': directions.UP,
    '39': directions.RIGHT,
    '40': directions.DOWN,
  }
  
  getInitialState = () => ({
    cells: initCells(),
    score: 0,
    isWin: false,
    isGameOver: false,
  })

  calculateNewState(state) {
    const increasedCells = increaseCell(state.cells);
    const cellsWitIncreasedProp = increasedCells.filter(cell => cell.increased);
    const score = cellsWitIncreasedProp.reduce((prevScore, plusScore) => prevScore + plusScore.value, state.score )      
    const cells = increasedCells.map(cell => {
      cell.increased = false
      return cell;      
    }); 
    const isWin = cells.some(cell => cell.value === 2048);

    return {
      ...state,
      cells,
      score,
      isWin,
      }
  }

  restartGame = () => {
    this.setState(this.getInitialState());
  }

  continueGame = () => {
    this.setState({isWin: false});
  }
  
  handleKeyUp = async ({ keyCode }) => {
    if(this.state.isGameOver) {
      this.restartGame();

    }

    if ([37, 38, 39, 40].includes(keyCode)) {
      this.setState(state => {
        return {
        ...state,
        cells: moveCells(state.cells, this.KeyCodeToDirection[keyCode]),
        }
      })
    }

    await delay(100);
    
    this.setState(state => {
      return this.calculateNewState(state)
    });
    this.setState(state => ({
      ...state,
      cells: populateField(state.cells),
      isGameOver: !populateField(state.cells) ? true : false,
    }));
    
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.isGameOver && !this.state.isGameOver) document.addEventListener('keyup', this.handleKeyUp);
    
    if (!prevState.isGameOver && this.state.isGameOver) document.removeEventListener('keyup', this.handleKeyUp);

  }

  componentWillMount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { cells, score, isGameOver, isWin } = this.state;
    return (
      <div className="App">
        <Header />
        <ControlPanel score={score} restartGame={this.restartGame} />
        {isGameOver 
          ? <h1>Game Over</h1> 
          : <Field cells={cells} isWin={isWin} continueGame={this.continueGame}  
        />}
      </div>
    );  
  
  }
}


export default App;
