import React, { Component } from 'react';
import Tesseract from 'tesseract.js';
import './FormFilling.css';
import captcha from '../img/captcha-img.png';

export default class FormFilling extends Component {
  constructor(props) {
    super(props);
    this.recognizingCaptcha = this.recognizingCaptcha.bind(this);
    this.changingFormData = this.changingFormData.bind(this);
    this.setFormControl = this.setFormControl.bind(this);
    this.setCheckboxFormControl = this.setCheckboxFormControl.bind(this);
    this.captchaHandler = this.captchaHandler.bind(this);
    this.captchaBlur = this.captchaBlur.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.highlightCurrentInput = this.highlightCurrentInput.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
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
          captcha: {
            value: '',
            imgText: '',
            captchaAnswer: '',
            required: true,
          },
        },
      ],
    };
  }
  componentDidMount() {
    const screensArray = [...document.querySelector('.form-filling').children];
    const formControls = this.state.formControls;
    formControls[3].captcha.imgText = this.recognizingCaptcha();
    /*     const captchaToCount = formControls[3].captcha.imgText.slice(0, -2).split('');
    const dividerPosition = Math.max(captchaToCount.includes('+'), captchaToCount.includes('-'), captchaToCount.includes('*'), captchaToCount.includes('/'));
    const divider = captchaToCount[dividerPosition];
    const firstNumber = captchaToCount.slice(0, divider - 1).join(''),
    const lastNumber = captchaToCount.slice(divider).join('');
    let captchaAnswer = 0;
    switch (divider) {
      case '+':
        captchaAnswer = +firstNumber + (+lastNumber);
        break;
      case '-':
        captchaAnswer = firstNumber - lastNumber;
        break;
      case '*':
        captchaAnswer = firstNumber * lastNumber;
        break;
      case '/':
        captchaAnswer = firstNumber / lastNumber;
        break;
    } */
    const captchaAnswer = 38;
    formControls[3].captcha.captchaAnswer = captchaAnswer;
    this.setState({
      screensArray,
      formControls,
      showingScreen: this.props.showingScreen,
    });
  }
  componentDidUpdate() {
    const screensArray = this.state.screensArray;
    screensArray.forEach((screen) => {
      screen.classList.add('hidden-screen');
    });
    screensArray[this.props.showingScreen].classList.remove('hidden-screen');
  }
  recognizingCaptcha() {
    const file = document
      .querySelector('.captcha-wrapper')
      .firstElementChild.getAttribute('src');
    const lang = 'eng';
    return Tesseract.recognize(file, lang, {
      logger: (data) => {},
    }).then(({ data: { text } }) => {
      //  console.log(text);
      return text;
    });
  }
  changingFormData(event) {
    if (
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
    if (this.state.isValidForm[this.props.showingScreen] === true) {
      this.props.changeFormValidity();
    }
  }
  setFormControl(event) {
    const dataValue = event.target.value;
    let labelValue = '';
    labelValue = event.target.previousElementSibling.textContent.slice(0, -1);
    const formControls = this.state.formControls;
    formControls[this.props.showingScreen][labelValue].value = dataValue;
    if (
      event.target.previousElementSibling.classList.contains(
        'required-field-sign',
      )
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
    if (formControls[1]['business areas'].value.length) {
      event.target.parentNode.parentNode.lastElementChild.classList.remove(
        'error-sign-visible',
      );
    } else {
      event.target.parentNode.parentNode.lastElementChild.classList.add(
        'error-sign-visible',
      );
    }
    this.setState({ formControls });
    this.validationForm();
    if (this.state.isValidForm[this.props.showingScreen] === true) {
      this.props.changeFormValidity();
    }
  }
  captchaHandler(event) {
    const formControls = this.state.formControls;
    if (Number(event.target.value) === formControls[3].captcha.captchaAnswer) {
      event.target.classList.remove('error-background');
      event.target.parentNode.lastElementChild.classList.remove(
        'error-sign-visible',
      );
      formControls[3].captcha.value = Number(event.target.value);
    } else {
      event.target.classList.add('error-background');
      event.target.parentNode.lastElementChild.classList.add(
        'error-sign-visible',
      );
    }
    this.validationForm();
    if (this.state.isValidForm[this.props.showingScreen] === true) {
      this.props.changeFormValidity();
    }
  }
  captchaBlur(event) {
    this.captchaHandler(event);
    event.target.classList.remove('current-input');
  }
  inputBlur(event) {
    this.changingFormData(event);
    event.target.classList.remove('current-input');
  }
  inputValidation(event) {
    let regexp = '';
    switch (event.target.type) {
      case 'select-one':
        if (event.target.value) {
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
        } else {
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
        }
        return true;
      case 'textarea':
        if (event.target.value.length > 2) {
          event.target.classList.remove('error-background');
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
          return true;
        } else {
          event.target.classList.add('error-background');
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
          return false;
        }
      case 'text':
        if (event.target.value.length > 2) {
          event.target.classList.remove('error-background');
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
          return true;
        } else {
          event.target.classList.add('error-background');
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
          return false;
        }
      case 'password':
        regexp = /[a-z][A-Z][0-9]/g;
        const password = event.target.value;
        if (
          password.match(/[a-z]/) &&
          password.match(/[A-Z]/) &&
          password.match(/[0-9]/) &&
          password.length >= 8
        ) {
          event.target.classList.remove('error-background');
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
          return true;
        } else {
          event.target.classList.add('error-background');
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
          return false;
        }
      case 'email':
        const email = event.target.value;
        regexp = /(\w+\.)+\w+/g;
        if (email && email.match(regexp)) {
          event.target.classList.remove('error-background');
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
          return true;
        } else {
          event.target.classList.add('error-background');
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
          return false;
        }
      case 'tel':
        regexp = /\d/g;
        const phoneMatch = event.target.value.match(regexp);
        if (phoneMatch && phoneMatch.length === 11) {
          event.target.classList.remove('error-background');
          event.target.parentNode.lastElementChild.classList.remove(
            'error-sign-visible',
          );
          return true;
        } else {
          event.target.classList.add('error-background');
          event.target.parentNode.lastElementChild.classList.add(
            'error-sign-visible',
          );
          return false;
        }
    }
  }
  validationForm() {
    const formControls = this.state.formControls;
    const isValidForm = this.state.isValidForm;
    for (let key in formControls[this.props.showingScreen]) {
      if (
        this.props.showingScreen !== 3 &&
        formControls[this.props.showingScreen][key].required &&
        !formControls[this.props.showingScreen][key].value.length
      ) {
        isValidForm[this.props.showingScreen] = false;
        this.setState({ isValidForm });
        return false;
      }
    }
    if (
      formControls[0]['email'].value !== formControls[0]['confirm email'].value
    ) {
      document
        .querySelector('#email')
        .parentNode.lastElementChild.classList.add('error-sign-visible');
      document
        .querySelector('#confirm-email')
        .parentNode.lastElementChild.classList.add('error-sign-visible');
    } else {
      document
        .querySelector('#email')
        .parentNode.lastElementChild.classList.remove('error-sign-visible');
      document
        .querySelector('#confirm-email')
        .parentNode.lastElementChild.classList.remove('error-sign-visible');
    }
    if (
      this.props.showingScreen === 0 &&
      formControls[this.props.showingScreen]['email'].value !== '' &&
      formControls[this.props.showingScreen]['confirm email'].value !== '' &&
      formControls[this.props.showingScreen]['email'].value !==
        formControls[this.props.showingScreen]['confirm email'].value
    ) {
      isValidForm[this.props.showingScreen] = false;
      this.setState({ isValidForm });
      return false;
    }
    if (
      this.props.showingScreen === 3 &&
      (formControls[this.props.showingScreen].captcha.value === '' ||
        formControls[this.props.showingScreen]['password'].value === '' ||
        formControls[this.props.showingScreen]['confirm password'].value ===
          '' ||
        formControls[this.props.showingScreen]['password'].value !==
          formControls[this.props.showingScreen]['confirm password'].value)
    ) {
      isValidForm[this.props.showingScreen] = false;
      this.setState({ isValidForm });
      return false;
    }
    isValidForm[this.props.showingScreen] = true;
    this.setState({ isValidForm });
    return true;
  }
  highlightCurrentInput(event) {
    event.target.classList.add('current-input');
  }
  showErrorMessage(event) {
    if (
      event.target.classList.contains('textarea-error-sign') ||
      event.target.classList.contains('captcha-error-sign')
    ) {
      event.target.previousElementSibling.classList.add(
        'visible-textarea-error-message',
      );
    } else {
      event.target.previousElementSibling.classList.add(
        'visible-error-message',
      );
    }
  }
  hideErrorMessage(event) {
    if (
      event.target.classList.contains('textarea-error-sign') ||
      event.target.classList.contains('captcha-error-sign')
    ) {
      event.target.previousElementSibling.classList.remove(
        'visible-textarea-error-message',
      );
    } else {
      event.target.previousElementSibling.classList.remove(
        'visible-error-message',
      );
    }
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
              <select
                id='salutation'
                defaultValue=''
                onInput={this.changingFormData}
              >
                <option></option>
                <option>Hello!</option>
                <option>Hi!</option>
              </select>
              <div className='error-message'>
                <p>Error</p>
                <p>Salutation is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>First Name is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Last Name is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Company is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Title is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Email is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>You should confirm your email</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Phone is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Please select your personal business area</p>
              </div>
              <div
                className='textarea-error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Comments are required</p>
              </div>
              <div
                className='textarea-error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
                defaultValue=''
                onInput={this.changingFormData}
              >
                <option></option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
              <div className='error-message'>
                <p>Error</p>
                <p>Country is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Office Name is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Address is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>State is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>Password is required</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
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
              <div className='error-message'>
                <p>Error</p>
                <p>You should confirm your password</p>
              </div>
              <div
                className='error-sign'
                onMouseEnter={this.showErrorMessage}
                onMouseOut={this.hideErrorMessage}
              ></div>
            </div>
            <div className='field-form'>
              <label htmlFor='captcha' className='required-field-sign'>
                captcha:
              </label>
              <div className='captcha-wrapper'>
                <img src={captcha} alt='Captcha image'></img>
                <p className='show-another-captcha'>Show another code</p>
                <input
                  id='captcha'
                  type='text'
                  onInput={this.captchaHandler}
                  onBlur={this.captchaBlur}
                ></input>
                <p className='note'>put in the answer to the math equation</p>
                <div className='checkbox-row'>
                  <input type='checkbox' name='agreement' id='agreement' />
                  <label htmlFor='agreement'>
                    I have read and accept the terms of use
                  </label>
                </div>
                <div className='error-message'>
                  <p>Error</p>
                  <p>You should input correct answer</p>
                </div>
                <div
                  className='captcha-error-sign'
                  onMouseEnter={this.showErrorMessage}
                  onMouseOut={this.hideErrorMessage}
                ></div>
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
