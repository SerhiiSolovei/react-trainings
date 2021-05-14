import React from 'react';
import firebase from 'firebase/app';

import { validateEmail, validatePassword } from './utils';

import styles from './styles.module.scss';

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showPasswordConfirmField: false,
  };

  registerUser = () => {
    if (!validateEmail(this.state.email)) {
      alert('Неверный адрес почтового ящика');
      return;
    }

    if (!validatePassword(this.state.password)) {
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

  render() {
    return (
      <div className={styles.Form}>
        <label htmlFor="email" className={styles.InputLabel}>
          Почта
        </label>
        <input
          id="email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="example@email.com"
          className={styles.Input}
          required
        />

        <label htmlFor="password" className={styles.InputLabel}>
          Пароль
        </label>
        <input
          id="password"
          value={this.state.password}
          type={this.state.showPassword ? 'text' : 'password'}
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Пароль..."
          className={styles.Input}
          required
        />
        <div className={styles.Checkbox}>
          <input type="checkbox" onClick={this.togglePasswordVisibility} />
          Показать пароль
        </div>

        <label htmlFor="confirmPassword" className={styles.InputLabel}>
          Подтвердите Пароль
        </label>
        <input
          id="confirmPassword"
          value={this.state.confirmPassword}
          type={this.state.showPasswordConfirmField ? 'text' : 'password'}
          onChange={e => this.setState({ confirmPassword: e.target.value })}
          placeholder="Подтвердите Пароль..."
          className={styles.Input}
          required
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
