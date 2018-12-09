import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faMinusCircle, faTrashAlt, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import EmployeeTable from './EmployeeTable.js';

library.add(faPlusCircle, faMinusCircle, faTrashAlt, faPen, faTimes)
class App extends Component {
  render() {
    return (
        <div className="App-header">
          <EmployeeTable/>
        </div>
    );
  }
}

export default App;
