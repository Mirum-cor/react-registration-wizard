import React, { Component } from 'react';
import './FormFilling.css';

export default class FormFilling extends Component {
  state = {};
  render() {
    return (
      <div className="form-filling">
        <div className="first-screen">
          <form>
            <div className="field-form">
              <label htmlFor="salutation" className="required-field-sign">salutation:</label>
              <select id="salutation">
                <option></option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="field-form">
              <label htmlFor="first-name" className="required-field-sign">first name:</label>
              <input id="first-name" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="middle-name">middle name:</label>
              <input id="middle-name" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="last-name" className="required-field-sign">last name:</label>
              <input id="last-name" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="company" className="required-field-sign">company:</label>
              <input id="company" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="title" className="required-field-sign">title:</label>
              <input id="title" type="text"></input>
            </div>
          </form>
          <form>
            <div className="field-form">
              <label htmlFor="email" className="required-field-sign">email:</label>
              <input id="email" type="email"></input>
              <p className="note">email wiil be your login</p>
            </div>
            <div className="field-form">
              <label htmlFor="confirm-email" className="required-field-sign">confirm email:</label>
              <input id="confirm-email" type="email"></input>
            </div>
            <div className="field-form">
              <label htmlFor="phone" className="required-field-sign">phone:</label>
              <input id="phone" type="tel" placeholder="(   )   -"></input>
            </div>
            <div className="field-form">
              <label htmlFor="fax">fax:</label>
              <input id="fax" type="tel" placeholder="(   )   -"></input>
            </div>
            <div className="field-form">
              <label htmlFor="mobile">mobile:</label>
              <input id="mobile" type="tel" placeholder="(   )   -"></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
