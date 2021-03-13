import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import FormFilling from './FormFilling';

export default class App extends Component {
  constructor() {
    super();
    this.changeFormValidity = this.changeFormValidity.bind(this);
    this.state = {
      showingScreen: 0,
      steps: ['Contact Info', 'Areas', 'Address', 'Password', 'Completed'],
      isValidForm: [false, false, false, false],
      formControls: [
        {
          salutation: '',
          firstName: '',
          lastName: '',
          company: '',
          title: '',
          email: '',
          confirmEmail: '',
          phone: '',
        },
        {
          businessAreas: [],
          comments: '',
        },
        {
          country: '',
          officeName: '',
          address: '',
          state: '',
        },
        {
          password: '',
          confirmPassword: '',
          captcha: '',
        },
      ],
    };
    this.showPreviousStep = this.showPreviousStep.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
  }
  showPreviousStep(event) {
    event.preventDefault();
    if (this.state.showingScreen !== 0) {
      if (this.state.showingScreen === 1) {
        document.querySelector('.previous-step-btn').classList.add('invisible');
      }
      let showingScreen = this.state.showingScreen;
      showingScreen--;
      this.setState({ showingScreen });
    }
  }
  showNextStep(event) {
    event.preventDefault();
    if (this.state.showingScreen < 4) {
      console.log(this.state.isValidForm, this.state.isValidForm[this.state.showingScreen]);
      if (this.state.isValidForm[this.state.showingScreen]) {
        let showingScreen = this.state.showingScreen;
        showingScreen++;
        this.setState({ showingScreen });
        document
          .querySelector('.previous-step-btn')
          .classList.remove('invisible');
      }
    } else {
      document.querySelector('.buttons').classList.add('invisible');
    }
  }
  changeFormValidity() {
    console.log(this.state, this.state.showingScreen, this.state.isValidForm);
    const isValidForm = this.state.isValidForm;
    isValidForm[this.state.showingScreen] = true;
    this.setState({ isValidForm });
  }
  componentDidUpdate() {
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
            <span className='step-number'>{this.state.showingScreen + 1}</span>
            :&nbsp;
            <span className='step-name'>
              {this.state.steps[this.state.showingScreen]}
            </span>
          </p>
        </header>
        <section>
          <Sidebar showingScreen={this.state.showingScreen} />
          <FormFilling
            showingScreen={this.state.showingScreen}
            changeFormValidity={this.changeFormValidity}
          />
        </section>
        <footer className='App-footer'>
          <a href='#'>Back to login</a>
          <div className='buttons'>
            <button
              className='previous-step-btn btn invisible'
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
