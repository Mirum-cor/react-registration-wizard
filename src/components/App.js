import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import FormFilling from './FormFilling';

export default class App extends Component {
  constructor() {
    super();
    this.showPreviousStep = this.showPreviousStep.bind(this);
    this.showNextStep = this.showNextStep.bind(this);
    this.changeFormValidity = this.changeFormValidity.bind(this);
    this.state = {
      showingScreen: 0,
      steps: ['Contact Info', 'Areas', 'Address', 'Password', 'Completed'],
      isValidForm: [false, false, false, false],
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
      if (this.state.isValidForm[this.state.showingScreen]) {
        let showingScreen = this.state.showingScreen;
        showingScreen++;
        this.setState({ showingScreen });
        document
          .querySelector('.previous-step-btn')
          .classList.remove('invisible');
      } else {
        const currentScreen = [
          ...document.querySelector('.form-filling').children,
        ][this.state.showingScreen];
        let inputDivs = [];
        [...currentScreen.children].forEach((form) => {
          inputDivs = inputDivs.concat(
            [...form.children].filter((fieldForm) => {
              if (
                fieldForm.classList.contains('field-form') &&
                (fieldForm.lastElementChild.classList.contains('error-sign') ||
                  fieldForm.lastElementChild.classList.contains(
                    'textarea-error-sign',
                  ) ||
                  (fieldForm.lastElementChild.lastElementChild &&
                    fieldForm.lastElementChild.lastElementChild.classList.contains(
                      'captcha-error-sign',
                    )))
              ) {
                return fieldForm;
              }
            }),
          );
        });
        inputDivs.forEach((div) => {
          if (div.lastElementChild.lastElementChild) {
            div.lastElementChild.lastElementChild.classList.add('error-sign-visible');
          } else {
            div.lastElementChild.classList.add('error-sign-visible');
          }
        });
      }
    } else {
      document.querySelector('.buttons').classList.add('invisible');
    }
  }
  changeFormValidity() {
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
