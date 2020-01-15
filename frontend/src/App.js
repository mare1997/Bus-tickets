import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Header/>
      </div>
    );
  }
}

export default App;
