import React from 'react';

import Header from './components/Header';
import Field from './components/Field/Field';
import ControlPanel from './components/ControlPanel/ControlPanel';
import { initCells } from './gameLogic/initCell';
import { directions } from './gameLogic/movingCells';
import { movingCells } from './gameLogic/movingCells';
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
    isWinner: false,
    isGameOver: false,
  })

  handleRestartGame = () => {
    this.setState(this.getInitialState())
  }

  handleKeyUp = async ({ keyCode }) => {
    if(this.state.cells >= 16) this.setState({isGameOver: true});

    if ([37, 38, 39, 40].includes(keyCode)) {
      this.setState(state => {
        return {
        ...state,
        cells: movingCells(state.cells, this.KeyCodeToDirection[keyCode]),
        }
      })
    }

    await delay(100);
    
    this.setState(state => {
      const increasedCells = increaseCell(state.cells);
      const increasedCell = increasedCells.filter(cell => cell.increased === true);
      const score = increasedCell.length > 0 ? state.score + increasedCell[0].value : state.score;  
      increasedCells.map(cell => cell.increased = false);
      
      return {
      ...state,
      cells: increasedCells,
      score,
      isWinner: increaseCell(state.cells).some(cell => cell.value === 2048)
      }
    })
    
    this.setState(state => ({
      ...state,
      cells: populateField(state.cells),
      isGameOver: typeof populateField(state.cells) !== 'object' ? true : false,
    }))
    
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { cells, score, isGameOver } = this.state;
    return (
      <div className="App">
        <Header />
        <ControlPanel score={score} restartGame={this.handleRestartGame} />
        {isGameOver ? <h1>GameOver</h1> : <Field cells={cells} />}
      </div>
    );  
  
  }
}


export default App;
