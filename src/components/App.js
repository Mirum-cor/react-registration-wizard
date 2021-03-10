import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import FormFilling from './FormFilling';

// function App() {
export default class App extends Component {
  state = {};
  showNextStep(event) {
    event.preventDefault();
  }
  render() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>New User Registration</h1>
          <p>
            STEP&nbsp;
            <span className="step-number">1</span>:&nbsp;
            <span className="step-name">Contact Info</span>
          </p>
        </header>
        <section>
          <Sidebar />
          <FormFilling />
        </section>
        <footer className="App-footer">
          <a href="#">Back to login</a>
          <button className="btn" onClick={this.showNextStep}>next</button>
        </footer>
      </div>
    );
  }
}

// export default App;
