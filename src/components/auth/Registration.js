import React from 'react';
import firebase from 'firebase/app';

import { validateEmail, validatePassword, lowerCaseLetters, upperCaseLetters, numbers } from './utils';
import Input from '../ReusableComponents/Input';

import PasswordMessage from './PasswordMessage';

import styles from './styles.module.scss';

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showPasswordConfirmField: false,
    validPassword: false,
    inputPassword: false,
    containLowerCaseLetter: false,
    containUpperCaseLetter: false,
    containNumber: false,
    containMinCharNumber: false,
  };

  registerUser = () => {
    if (!validateEmail(this.state.email)) {
      alert('Неверный адрес почтового ящика');
      return;
    }

    if (!this.state.password.match(validatePassword)) {
      alert('Ошибочно созданный пароль');
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert('Неверное подтверждение пароля! Повторите еще раз!');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredential => {
        console.log('user', userCredential, userCredential.user);
        // Signed in
        // ...
        this.setState(prevState => ({
          ...prevState,
          email: '',
          password: '',
          confirmPassword: '',
        }));
      })
      .catch(error => {
        alert(`ERROR: ${error.message}`);
      });
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      ...prevState,
      showPassword: this.state.showPassword ? false : true,
    }));
  };

  togglePasswordConfirmVisibility = () => {
    this.setState(prevState => ({
      ...prevState,
      showPasswordConfirmField: this.state.showPasswordConfirmField ? false : true,
    }));
  };

  validationChecking = () => {
    this.setState(prevState => ({
      ...prevState,
      validPassword: this.state.password.match(validatePassword) ? true : false,
      containLowerCaseLetter: this.state.password.match(lowerCaseLetters) ? true : false,
      containUpperCaseLetter: this.state.password.match(upperCaseLetters) ? true : false,
      containNumber: this.state.password.match(numbers) ? true : false,
      containMinCharNumber: this.state.password.length >= 6 ? true : false,
    }));
  };

  render() {
    return (
      <div className={styles.Form}>
        <Input
          label={'Почта'}
          id={'email'}
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          placeholder={'example@email.com'}
          className={styles.Input}
        />

        <PasswordMessage state={this.state} />

        <Input
          label={'Пароль'}
          id={'password'}
          value={this.state.password}
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={e => this.setState({ password: e.target.value })}
          onKeyUp={this.validationChecking}
          onFocus={() => this.setState({ inputPassword: true })}
          onBlur={() => this.setState({ inputPassword: false })}
          placeholder={'Пароль...'}
          className={this.state.validPassword ? styles.ValidPassword : styles.InvalidPassword}
        />
        <div className={styles.Checkbox}>
          <input type="checkbox" onClick={this.togglePasswordVisibility} />
          Показать пароль
        </div>

        <Input
          label={'Подтвердите Пароль'}
          id={'confirmPassword'}
          value={this.state.confirmPassword}
          type={this.state.showPasswordConfirmField ? 'text' : 'password'}
          onChange={e => this.setState({ confirmPassword: e.target.value })}
          placeholder={'Подтвердите Пароль...'}
          className={styles.Input}
        />
        <div className={styles.Checkbox}>
          <input type="checkbox" onClick={this.togglePasswordConfirmVisibility} />
          Показать пароль
        </div>

        <button
          onClick={() => {
            this.registerUser();
            this.setState(prevState => ({ ...prevState, password: '', confirmPassword: '' }));
          }}
        >
          Зарегестрироваться
        </button>
      </div>
    );
  }
}

export default Registration;
