import React from 'react';
import firebase from 'firebase/app';

import { validateEmail } from './utils';

import styles from './styles.module.scss';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  loginUser = () => {
    if (!validateEmail(this.state.email)) {
      alert('Your email is incorect');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredential => {
        console.log('user', userCredential, userCredential.user);
        // Signed in
        // ...
      })
      .catch(error => {
        alert(`You noname bastard!!!, ERROR: ${error.message}`);
      });
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
        />
        <label htmlFor="password" className={styles.InputLabel}>
          Пароль
        </label>
        <input
          id="password"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Пароль..."
          className={styles.Input}
        />

        <button onClick={this.loginUser}>Войти</button>
      </div>
    );
  }
}

export default Login;
