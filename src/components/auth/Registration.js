import React, { useState } from 'react';
import firebase from 'firebase/app';

import { validateEmail, validatePassword } from './utils';
import Input from '../ReusableComponents/Input';

import PasswordMessage from './PasswordMessage';

import styles from './styles.module.scss';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const registerUser = () => {
    if (!validateEmail(email)) {
      alert('Неверный адрес почтового ящика');
      return;
    }

    if (!password.match(validatePassword)) {
      alert('Ошибочно созданный пароль');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают! Повторите еще раз!');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('user', userCredential, userCredential.user);
        // Signed in
        // ...
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        alert(`ERROR: ${error.message}`);
      });
  };

  const isPasswordValid = password.match(validatePassword);

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

      <PasswordMessage password={password} isVisible={isPasswordFocused} />

      <Input
        label={'Пароль'}
        id={'password'}
        value={password}
        type={isPasswordVisible ? 'text' : 'password'}
        onChange={e => setPassword(e.target.value)}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        placeholder={'Пароль...'}
        inputClassName={isPasswordValid ? styles.ValidPassword : styles.InvalidPassword}
      />
      <div className={styles.Checkbox}>
        <input type="checkbox" onClick={() => setPasswordVisibility(!isPasswordVisible)} />
        Показать пароль
      </div>

      <Input
        label={'Подтвердите Пароль'}
        id={'confirmPassword'}
        value={confirmPassword}
        type={isConfirmPasswordVisible ? 'text' : 'password'}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder={'Подтвердите Пароль...'}
        inputClassName={styles.Input}
      />
      <div className={styles.Checkbox}>
        <input type="checkbox" onClick={() => setConfirmPasswordVisibility(!isConfirmPasswordVisible)} />
        Показать пароль
      </div>

      <button
        onClick={() => {
          registerUser();
          setPassword('');
          setConfirmPassword('');
        }}
      >
        Зарегестрироваться
      </button>
    </div>
  );
};

export default Registration;
