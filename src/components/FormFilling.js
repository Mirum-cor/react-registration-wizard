import React, { Component } from 'react';
import './FormFilling.css';
import captcha from '../img/captcha-img.png';

export default class FormFilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screensArray: [],
    };
  }
  componentDidMount() {
    const screensArray = [...document.querySelector('.form-filling').children];
    this.setState({ screensArray, showingScreen: this.props.showingScreen });
    // console.log(screensArray[this.props.showingScreen]);
/*     screensArray.forEach(screen => {
      screen.classList.add('hidden-screen');
    });
    screensArray[this.props.showingScreen].classList.remove('hidden-screen'); */
  }
    componentDidUpdate() {
    const screensArray = this.state.screensArray;
    screensArray.forEach(screen => {
      screen.classList.add('hidden-screen');
    });
    screensArray[this.props.showingScreen].classList.remove('hidden-screen');
  }
  render() {
    return (
      <div className='form-filling'>
        <div className='first-screen'>
          <form>
            <div className='field-form'>
              <label htmlFor='salutation' className='required-field-sign'>
                salutation:
              </label>
              <select id='salutation'>
                <option></option>
                <option>Hello!</option>
                <option>Hi!</option>
              </select>
            </div>
            <div className='field-form'>
              <label htmlFor='first-name' className='required-field-sign'>
                first name:
              </label>
              <input id='first-name' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='middle-name'>middle name:</label>
              <input id='middle-name' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='last-name' className='required-field-sign'>
                last name:
              </label>
              <input id='last-name' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='company' className='required-field-sign'>
                company:
              </label>
              <input id='company' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='title' className='required-field-sign'>
                title:
              </label>
              <input id='title' type='text'></input>
            </div>
          </form>
          <form>
            <div className='field-form'>
              <label htmlFor='email' className='required-field-sign'>
                email:
              </label>
              <input id='email' type='email'></input>
              <p className='note'>email wiil be your login</p>
            </div>
            <div className='field-form'>
              <label htmlFor='confirm-email' className='required-field-sign'>
                confirm email:
              </label>
              <input id='confirm-email' type='email'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='phone' className='required-field-sign'>
                phone:
              </label>
              <input id='phone' type='tel' placeholder='(   )   -'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='fax'>fax:</label>
              <input id='fax' type='tel' placeholder='(   )   -'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='mobile'>mobile:</label>
              <input id='mobile' type='tel' placeholder='(   )   -'></input>
            </div>
          </form>
        </div>
        <div className='second-screen hidden-screen'>
          <form>
            <div className='field-form'>
              <p className='required-field-sign'>Business Areas:</p>
              <div className='checkbox-row'>
                <input type='checkbox' name='finance' id='finance' />
                <label htmlFor='finance'>Finance</label>
              </div>
              <div className='checkbox-row'>
                <input type='checkbox' name='operations' id='operations' />
                <label htmlFor='operations'>Operations</label>
              </div>
              <div className='checkbox-row'>
                <input type='checkbox' name='IT' id='IT' />
                <label htmlFor='IT'>IT</label>
              </div>
              <div className='checkbox-row'>
                <input type='checkbox' name='sales' id='sales' />
                <label htmlFor='sales'>Sales</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='administrative'
                  id='administrative'
                />
                <label htmlFor='administrative'>Administrative</label>
              </div>
              <div className='checkbox-row'>
                <input type='checkbox' name='legal' id='legal' />
                <label htmlFor='legal'>Legal</label>
              </div>
              <div className='checkbox-row'>
                <input type='checkbox' name='marketing' id='marketing' />
                <label htmlFor='marketing'>Marketing</label>
              </div>
            </div>
          </form>
          <form>
            <div className='field-form'>
              <p className='required-field-sign'>Comments:</p>
              <textarea></textarea>
              <p className='note'>
                let us know for which network you are requesting access, and any
                other comments you'd like to leave us
              </p>
            </div>
          </form>
        </div>
        <div className='third-screen hidden-screen'>
          <form>
            <div className='field-form'>
              <label htmlFor='country' className='required-field-sign'>
                country:
              </label>
              <select id='country'>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>
            <div className='field-form'>
              <label htmlFor='office-name' className='required-field-sign'>
                office name:
              </label>
              <input id='office-name' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='address' className='required-field-sign'>
                address:
              </label>
              <input id='address' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='postal-code'>postal code:</label>
              <input id='postal-code' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='city'>city:</label>
              <input id='city' type='text'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='state' className='required-field-sign'>
                state:
              </label>
              <select id='state'>
                <option></option>
                <option>Texas</option>
                <option>Michigan</option>
                <option>Other</option>
              </select>
            </div>
          </form>
        </div>
        <div className='fourth-screen hidden-screen'>
          <form>
            <div className='field-form'>
              <label htmlFor='password' className='required-field-sign'>
                password:
              </label>
              <input id='password' type='password'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='confirm-password' className='required-field-sign'>
                confirm password:
              </label>
              <input id='confirm-password' type='password'></input>
            </div>
            <div className='field-form'>
              <label htmlFor='captcha' className='required-field-sign'>
                captcha:
              </label>
              <div className='captcha-wrapper'>
                <img src={captcha} alt='Captcha image'></img>
                <p className='show-another-captcha'>Show another code</p>
                <input id='captcha' type='text'></input>
                <p className='note'>put in the answer to the math equation</p>
                <div className='checkbox-row'>
                  <input type='checkbox' name='agreement' id='agreement' />
                  <label htmlFor='agreement'>
                    I have read and accept the terms of use
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className='password-instructions'>
            <h6>Instructions:</h6>
            <p>Password must include:</p>
            <ul>
              <li>at least 8 characters</li>
              <li>an UPPER case letter</li>
              <li>a lower case letter</li>
              <li>a number</li>
            </ul>
          </div>
        </div>
        <div className='fifth-screen hidden-screen'>
          <h3>Thank you for registering!</h3>
          <p>
            A registration confirmation email was sent to the email address
            provided. Your registration will be sent for approval and activation
            to the Administrator.{' '}
            <span>
              You will receive an email when your account is ready to use.
            </span>
          </p>
        </div>
      </div>
    );
  }
}
