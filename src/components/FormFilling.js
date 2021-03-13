import React, { Component } from 'react';
import './FormFilling.css';
import captcha from '../img/captcha-img.png';

export default class FormFilling extends Component {
  constructor(props) {
    super(props);
    this.changingFormData = this.changingFormData.bind(this);
    this.setCheckboxFormControl = this.setCheckboxFormControl.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.highlightCurrentInput = this.highlightCurrentInput.bind(this);
    this.state = {
      screensArray: [],
      isValidForm: [false, false, false, false],
      formControls: [
        {
          salutation: { value: '', required: true },
          'first name': { value: '', required: true },
          'last name': { value: '', required: true },
          'middle name': { value: '', required: false },
          company: { value: '', required: true },
          title: { value: '', required: true },
          email: { value: '', required: true },
          'confirm email': { value: '', required: true },
          phone: { value: '', required: true },
          fax: { value: '', required: false },
          mobile: { value: '', required: false },
        },
        {
          'business areas': { value: [], required: true },
          comments: { value: '', required: true },
        },
        {
          country: { value: '', required: true },
          'office name': { value: '', required: true },
          address: { value: '', required: true },
          'postal code': { value: '', required: false },
          city: { value: '', required: false },
          state: { value: '', required: true },
        },
        {
          password: { value: '', required: true },
          'confirm password': { value: '', required: true },
          captcha: { value: '', required: true },
        },
      ],
    };
  }
  componentDidMount() {
    const screensArray = [...document.querySelector('.form-filling').children];
    this.setState({ screensArray, showingScreen: this.props.showingScreen });
  }
  componentDidUpdate() {
    const screensArray = this.state.screensArray;
    screensArray.forEach((screen) => {
      screen.classList.add('hidden-screen');
    });
    screensArray[this.props.showingScreen].classList.remove('hidden-screen');
  }
  changingFormData(event) {
    if (
      /* event.target.previousElementSibling && */
      event.target.previousElementSibling.classList.contains(
        'required-field-sign',
      )
    ) {
      if (this.inputValidation(event)) {
        this.setFormControl(event);
      }
    } else {
      this.setFormControl(event);
    }
    this.validationForm();
    // console.log(this.state.isValidForm[this.props.showingScreen]);
    if (this.state.isValidForm[this.props.showingScreen] === true) {
      // if (this.validationForm()) {
      this.props.changeFormValidity();
    }
  }
  setFormControl(event) {
    const dataValue = event.target.value;
    let labelValue = '';
    // if (event.target.previousElementSibling) {
    labelValue = event.target.previousElementSibling.textContent.slice(0, -1);
    /*     } else {
      labelValue = event.target.parentNode.parentNode.firstElementChild.textContent.slice(
        0,
        -1,
      );
    } */
    const formControls = this.state.formControls;
    // console.log(formControls[this.props.showingScreen], labelValue, event.target);
    formControls[this.props.showingScreen][labelValue].value = dataValue;
    if (
      /* event.target.previousElementSibling && */
      event.target.previousElementSibling.classList.contains(
        'required-field-sign',
      ) /* ||
      (event.target.parentNode.parentNode.firstElementChild &&
        event.target.parentNode.parentNode.firstElementChild.classList.contains(
          'required-field-sign',
        )) */
    ) {
      formControls[this.props.showingScreen][labelValue].required = true;
    } else {
      formControls[this.props.showingScreen][labelValue].required = false;
    }
    this.setState({ formControls });
  }
  setCheckboxFormControl(event) {
    const checkboxName = event.target.nextElementSibling.textContent;
    const checkboxChecked = event.target.checked;
    const formControls = this.state.formControls;
    const checkboxValueArray = formControls[1]['business areas'].value;
    let isValueInArray = false;
    if (checkboxValueArray.length) {
      for (let i = 0; i < checkboxValueArray.length; i++) {
        if (checkboxValueArray[i]['checkbox name'] === checkboxName) {
          // console.log(checkboxValueArray[i]['checkbox name']);
          checkboxValueArray[i]['checkbox checked'] = checkboxChecked;
          isValueInArray = true;
          break;
        }
      }
    }
    if (!isValueInArray) {
      checkboxValueArray.push({
        'checkbox name': checkboxName,
        'checkbox checked': checkboxChecked,
      });
    }
    formControls[1]['business areas'].value = checkboxValueArray.filter(
      (obj) => obj['checkbox checked'],
    );
    this.setState({ formControls });
    this.validationForm();
    if (this.state.isValidForm[this.props.showingScreen] === true) {
      this.props.changeFormValidity();
    }
  }
  inputBlur(event) {
    this.changingFormData(event);
    event.target.classList.remove('current-input');
  }
  inputValidation(event) {
    let regexp = '';
    // console.log(event.target.type);
    switch (event.target.type) {
      case 'select-one':
        return true;
      case 'textarea':
      case 'text':
        if (event.target.value.length > 2) {
          event.target.classList.remove('error-background');
          return true;
        } else {
          event.target.classList.add('error-background');
          return false;
        }
      case 'email':
        const email = event.target.value;
        regexp = /(\w+\.)+\w+/g;
        if (email && email.match(regexp)) {
          event.target.classList.remove('error-background');
          return true;
        } else {
          event.target.classList.add('error-background');
          return false;
        }
      case 'tel':
        regexp = /\d/g;
        const phoneMatch = event.target.value.match(regexp);
        if (phoneMatch && phoneMatch.length === 11) {
          event.target.classList.remove('error-background');
          return true;
        } else {
          event.target.classList.add('error-background');
          return false;
        }
      case 'password':
        break;
    }
  }
  // inputErrorBackground() {}
  validationForm() {
    const formControls = this.state.formControls;
    const isValidForm = this.state.isValidForm;
    for (let key in formControls[this.props.showingScreen]) {
      // console.log(formControls[this.props.showingScreen][key].value.length);
      if (
        /* this.props.showingScreen !== 1 && */
        formControls[this.props.showingScreen][key].required &&
        !formControls[this.props.showingScreen][key].value.length
      ) {
        isValidForm[this.props.showingScreen] = false;
        this.setState({ isValidForm });
        return false;
      }
    }
    if (
      this.props.showingScreen === 0 &&
      formControls[this.props.showingScreen]['email'].value !== '' &&
      formControls[this.props.showingScreen]['confirm email'].value !== '' &&
      formControls[this.props.showingScreen]['email'].value !==
        formControls[this.props.showingScreen]['confirm email'].value
    ) {
      isValidForm[0] = false;
      this.setState({ isValidForm });
      return false;
    }
    /*     if (this.props.showingScreen === 1 && formControls[this.props.showingScreen]['business areas'].value) {
      console.log(this.props.showingScreen);
      isValidForm[0] = true;
      this.setState({ isValidForm });
      return true;
    } */
    isValidForm[this.props.showingScreen] = true;
    this.setState({ isValidForm });
    return true;
  }
  highlightCurrentInput(event) {
    event.target.classList.add('current-input');
  }
  render() {
    return (
      <div className='form-filling'>
        <div className='first-screen'>
          <form>
            <div className='field-form error-sign'>
              <label htmlFor='salutation' className='required-field-sign'>
                salutation:
              </label>
              <select
                id='salutation'
                defaultValue=''
                onInput={this.changingFormData}
              >
                <option></option>
                <option>Hello!</option>
                <option>Hi!</option>
              </select>
            </div>
            <div className='field-form'>
              <label htmlFor='first-name' className='required-field-sign'>
                first name:
              </label>
              <input
                id='first-name'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='middle-name'>middle name:</label>
              <input
                id='middle-name'
                type='text'
                onInput={this.changingFormData}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='last-name' className='required-field-sign'>
                last name:
              </label>
              <input
                id='last-name'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='company' className='required-field-sign'>
                company:
              </label>
              <input
                id='company'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='title' className='required-field-sign'>
                title:
              </label>
              <input
                id='title'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
          </form>
          <form>
            <div className='field-form'>
              <label htmlFor='email' className='required-field-sign'>
                email:
              </label>
              <input
                id='email'
                type='email'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
              <p className='note'>email wiil be your login</p>
            </div>
            <div className='field-form'>
              <label htmlFor='confirm-email' className='required-field-sign'>
                confirm email:
              </label>
              <input
                id='confirm-email'
                type='email'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='phone' className='required-field-sign'>
                phone:
              </label>
              <input
                id='phone'
                type='tel'
                placeholder='(   )   -'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='fax'>fax:</label>
              <input
                id='fax'
                type='tel'
                placeholder='(   )   -'
                onInput={this.changingFormData}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='mobile'>mobile:</label>
              <input
                id='mobile'
                type='tel'
                placeholder='(   )   -'
                onInput={this.changingFormData}
              ></input>
            </div>
          </form>
        </div>
        <div className='second-screen hidden-screen'>
          <form>
            <div className='field-form'>
              <p className='required-field-sign'>business areas:</p>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='finance'
                  id='finance'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='finance'>Finance</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='operations'
                  id='operations'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='operations'>Operations</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='IT'
                  id='IT'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='IT'>IT</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='sales'
                  id='sales'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='sales'>Sales</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='administrative'
                  id='administrative'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='administrative'>Administrative</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='legal'
                  id='legal'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='legal'>Legal</label>
              </div>
              <div className='checkbox-row'>
                <input
                  type='checkbox'
                  name='marketing'
                  id='marketing'
                  onInput={this.setCheckboxFormControl}
                />
                <label htmlFor='marketing'>Marketing</label>
              </div>
            </div>
          </form>
          <form>
            <div className='field-form'>
              <p className='required-field-sign'>comments:</p>
              <textarea
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></textarea>
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
              <select
                id='country'
                defaultValue='United States'
                onInput={this.changingFormData}
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>
            <div className='field-form'>
              <label htmlFor='office-name' className='required-field-sign'>
                office name:
              </label>
              <input
                id='office-name'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='address' className='required-field-sign'>
                address:
              </label>
              <input
                id='address'
                type='text'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='postal-code'>postal code:</label>
              <input
                id='postal-code'
                type='text'
                onInput={this.changingFormData}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='city'>city:</label>
              <input
                id='city'
                type='text'
                onInput={this.changingFormData}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='state' className='required-field-sign'>
                state:
              </label>
              <select
                id='state'
                defaultValue=''
                onInput={this.changingFormData}
              >
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
              <input
                id='password'
                type='password'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
            </div>
            <div className='field-form'>
              <label htmlFor='confirm-password' className='required-field-sign'>
                confirm password:
              </label>
              <input
                id='confirm-password'
                type='password'
                onInput={this.changingFormData}
                onBlur={this.inputBlur}
                onFocus={this.highlightCurrentInput}
              ></input>
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
