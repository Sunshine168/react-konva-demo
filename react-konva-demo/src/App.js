import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoBang from './container/GoBang';
import { Provider } from 'react-redux';
import configuerStore from './store/index'
let store = configuerStore;
class App extends Component {
  render() {
    return (
      <Provider
        store = {store}
      >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <GoBang/>
        </div>
        </Provider>
    );
  }
}

export default App;
