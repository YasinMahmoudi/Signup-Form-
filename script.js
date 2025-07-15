'use strict';

///////////////////////////////////////////////////
/////////// ELEMENTS

const registerForm = document.querySelector('.form--register');
const btnRegister = document.querySelector('.btn-register');
const inputUsername = document.querySelector('#userName');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputPasswordConfirm = document.querySelector('#confirmPassword');
const loadingCircle = document.querySelector('.loading');

///////////////////////////////////////////////////
/////////// FUNCTIONALITY

class Register {
  constructor(usename, email, password, passwordConfirm) {
    this.usename = usename;
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;

    this._initFormState();

    registerForm.addEventListener('submit', this._register.bind(this));
  }

  _initFormState() {
    // Active username input on loading page
    inputUsername.focus();
  }

  _register(e) {
    // Prevent default behavior of form
    e.preventDefault();

    // Get input values
    const username = inputUsername.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const passwordConfirm = inputPasswordConfirm.value;

    setTimeout(() => {
      // Username Validation
      if (!username) this._errorFn(inputUsername);
      else if (username.length < 4) this._errorFn(inputUsername, 'Username must be at least 4 characters');
      else this._successFn(inputUsername);

      // Email Validation
      const regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email) this._errorFn(inputEmail);
      else if (!regEmail.test(email)) this._errorFn(inputEmail, 'Please enter a valid email ');
      else this._successFn(inputEmail);

      // Password Validation
      if (!password) this._errorFn(inputPassword);
      else if (password.length < 8) this._errorFn(inputPassword, `Password must be at least 8 characters`);
      else if (passwordConfirm.length > 0 && password !== passwordConfirm)
        this._errorFn(inputPassword, `Passwords are not matched !`);
      // Check match passsword and confirmed password
      else this._successFn(inputPassword);

      // Confirmed register
      if (
        username &&
        username.length > 3 &&
        email &&
        regEmail.test(email) &&
        password &&
        password.length > 7 &&
        passwordConfirm.length > 0 &&
        password === passwordConfirm
      ) {
        this._confirmedRegister();
      }
    }, 1000);

    // Loading state
    this._loadingState(1000);
  }

  _errorFn(inputName, errorMessage = '') {
    const errorInputName = inputName.id.charAt(0).toUpperCase() + inputName.id.slice(1);
    const errorMsg = `${errorInputName} is required`;
    inputName.nextElementSibling.textContent = errorMessage || errorMsg;
    inputName.classList.add('form__input--error');
  }

  _successFn(inputName) {
    inputName.classList.remove('form__input--error');
    inputName.nextElementSibling.textContent = '';
  }

  _loadingState(time) {
    btnRegister.innerHTML = '<div class="loading"></div>';
    btnRegister.setAttribute('disabled', 'disabled');
    btnRegister.style.cursor = 'not-allowed';
    btnRegister.removeAttribute('type');

    setTimeout(() => {
      btnRegister.setAttribute('type', 'submit');
      btnRegister.innerHTML = '<span> Sign up </span>';
      btnRegister.removeAttribute('disabled', 'disabled');
      btnRegister.style.cursor = 'pointer';
    }, time);
  }

  _confirmedRegister() {
    // Empry inputs
    inputUsername.value = inputEmail.value = inputPassword.value = inputPasswordConfirm.value = '';
    inputUsername.focus();
    console.log('Register successfuly');
  }
}

const yasin = new Register();

// console.log(yasin);
