import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import FormFilling from './FormFilling';

// function App() {
export default class App extends Component {
  constructor() {
    super();
    this.state = { showingScreen: 0, steps: ['Contact Info', 'Areas', 'Address', 'Password', 'Completed'] };
    this.showPreviousStep = this.showPreviousStep.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
  }
  /*   state = {
    showingScreen: 3,
  }; */
  showPreviousStep(event) {
    event.preventDefault();
    if (this.state.showingScreen !== 0) {
      let showingScreen = this.state.showingScreen;
      showingScreen--;
      this.setState({ showingScreen });
      // document.querySelector('.next-step-btn').removeAttribute('disabled');
    }
  }
  showNextStep(event) {
    event.preventDefault();
    if (this.state.showingScreen < 4) {
      let showingScreen = this.state.showingScreen;
      showingScreen++;
      this.setState({ showingScreen });
    } else {
      document.querySelector('.buttons').classList.add('invisible');
      // document.querySelector('.next-step-btn').setAttribute('disabled', 'true');
    }
  }
  /*   componentDidMount() {
    console.log(this.state);
  } */
  componentDidUpdate() {
    // console.log(this.state);
    if (this.state.showingScreen === 4) {
      document.querySelector('.buttons').classList.add('invisible');
    }
  }
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>New User Registration</h1>
          <p>
            STEP&nbsp;
            <span className='step-number'>{this.state.showingScreen + 1}</span>:&nbsp;
            <span className='step-name'>{this.state.steps[this.state.showingScreen]}</span>
          </p>
        </header>
        <section>
          <Sidebar showingScreen={this.state.showingScreen} />
          <FormFilling showingScreen={this.state.showingScreen} />
        </section>
        <footer className='App-footer'>
          <a href='#'>Back to login</a>
          <div className="buttons">
            <button
              className='previous-step-btn btn'
              onClick={this.showPreviousStep}
            >
              back
            </button>
            <button className='next-step-btn btn' onClick={this.showNextStep}>
              next
            </button>
          </div>
        </footer>
      </div>
    );
  }
}

// export default App;
