import React from 'react';

import Header from './components/Header';
import Field from './components/Field/Field';



class App extends React.Component {
 
    state = {
      cells: [
        {
          id:1,
          x:0,
          y:3,
          value: 2,
        }
      ],
    }
  
  render() {
    const { cells } = this.state;
    return (
      <div className="App">
        <Header />
        <Field cells={cells} />
      </div>
    );  
  
  }
}

export default App;
