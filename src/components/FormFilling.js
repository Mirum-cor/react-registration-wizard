import React, { Component } from 'react';
import './FormFilling.css';

export default class FormFilling extends Component {
  state = {};
  render() {
    return (
      <div className="form-filling">
        <div className="first-screen hidden-screen">
          <form>
            <div className="field-form">
              <label htmlFor="salutation" className="required-field-sign">salutation:</label>
              <select id="salutation">
                <option></option>
                <option>Hello!</option>
                <option>Hi!</option>
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
        <div className="second-screen hidden-screen">
          <form>
            <div className="field-form">
              <p className="required-field-sign">Business Areas:</p>
              <div className="checkbox-row">
                <input type="checkbox" name="finance" id="finance" />
                <label htmlFor="finance">Finance</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="operations" id="operations" />
                <label htmlFor="operations">Operations</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="IT" id="IT" />
                <label htmlFor="IT">IT</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="sales" id="sales" />
                <label htmlFor="sales">Sales</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="administrative" id="administrative" />
                <label htmlFor="administrative">Administrative</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="legal" id="legal" />
                <label htmlFor="legal">Legal</label>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" name="marketing" id="marketing" />
                <label htmlFor="marketing">Marketing</label>
              </div>
            </div>
          </form>
          <form>
            <div className="field-form">
              <p className="required-field-sign">Comments:</p>
              <textarea></textarea>
              <p className="note">let us know for which network you are requesting access, and any other comments you'd like to leave us</p>
            </div>
          </form>
        </div>
        <div className="third-screen">
          <form>
            <div className="field-form">
              <label htmlFor="country" className="required-field-sign">country:</label>
              <select id="country">
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field-form">
              <label htmlFor="office-name" className="required-field-sign">office name:</label>
              <input id="office-name" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="address" className="required-field-sign">address:</label>
              <input id="address" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="postal-code">postal code:</label>
              <input id="postal-code" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="city">city:</label>
              <input id="city" type="text"></input>
            </div>
            <div className="field-form">
              <label htmlFor="state" className="required-field-sign">state:</label>
              <select id="state">
                <option></option>
                <option>Texas</option>
                <option>Michigan</option>
                <option>Other</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
