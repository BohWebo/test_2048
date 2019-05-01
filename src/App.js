import React from 'react';

import Header from './components/Header';
import Field from './components/Field/Field';
import { initCells } from './gameLogic/initCell';
import ControlPanel from './components/ControlPanel/ControlPanel';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  
  getInitialState = () => ({
    cells: initCells(),
    score: 0,
  })

  handleRestartGame = () => {
    this.setState(this.getInitialState())
  }

  componentDidMount() {
    document.addEventListener('keyup', (event) => {
      console.log(event.keyCode)
    })
  }

  render() {
    const { cells, score } = this.state;
    return (
      <div className="App">
        <Header />
        <ControlPanel score={score} restartGame={this.handleRestartGame}  />
        <Field cells={cells} />
      </div>
    );  
  
  }
}

export default App;
