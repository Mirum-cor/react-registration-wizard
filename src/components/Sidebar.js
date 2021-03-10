import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
  state = {};
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
