import React, { useState } from 'react';
import firebase from 'firebase/app';

import { validateEmail } from './utils';
import Input from '../ReusableComponents/Input';

import styles from './styles.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    if (!validateEmail(email)) {
      alert('Your email is incorect');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('user', userCredential, userCredential.user);
        // Signed in
        // ...
      })
      .catch(error => {
        alert(`You noname bastard!!!, ERROR: ${error.message}`);
      });
  };

  return (
    <div className={styles.Form}>
      <Input
        label={'Почта'}
        id={'email'}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={'example@email.com'}
        className={styles.Input}
      />
      <Input
        label={'Пароль'}
        id={'password'}
        value={password}
        type={'password'}
        onChange={e => setPassword(e.target.value)}
        placeholder={'Пароль...'}
        className={styles.Input}
      />
      <button onClick={loginUser}>Войти</button>
    </div>
  );
};

export default Login;
