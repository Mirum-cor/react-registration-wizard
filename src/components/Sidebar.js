import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
    };
  }
  componentDidMount() {
    const steps = [
      ...document.querySelector('.sidebar-wrapper').firstElementChild.children,
    ];
    this.setState({ steps });
  }
  componentDidUpdate() {
    const steps = this.state.steps;
    for (let i = 0; i < 5; i++) {
      steps[i].classList.remove('current-step');
      steps[i].firstElementChild.textContent = i + 1;
      if (i < this.props.showingScreen) {
        steps[i].firstElementChild.classList.add('passed-steps');
        steps[i].lastElementChild.classList.add('passed-steps-name');
      } else {
        steps[i].firstElementChild.classList.remove('passed-steps');
        steps[i].lastElementChild.classList.remove('passed-steps-name');
      }
      if (this.props.showingScreen === 4) {
        steps[i].lastElementChild.classList.add('all-steps-completed');
      }
    }
    steps[this.props.showingScreen].classList.add('current-step');
    steps[this.props.showingScreen].firstElementChild.innerHTML = '&nbsp;';
  }
  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-wrapper'>
          <ul>
            <li className='current-step'>
              <span className='next-steps'>&nbsp;</span>
              <span className='next-steps-name'>Contact Info</span>
            </li>
            <li>
              <span className='next-steps'>2</span>
              <span className='next-steps-name'>Areas</span>
            </li>
            <li>
              <span className='next-steps'>3</span>
              <span className='next-steps-name'>Address</span>
            </li>
            <li>
              <span className='next-steps'>4</span>
              <span className='next-steps-name'>Password</span>
            </li>
            <li>
              <span className='next-steps'>5</span>
              <span className='next-steps-name'>Completed</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
