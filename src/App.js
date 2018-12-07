import React, { Component } from 'react';
import './App.css';
import TableDene from './TableDene.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TableDene/>
        </header>
      </div>
    );
  }
}

export default App;
