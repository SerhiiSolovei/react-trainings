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

  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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

      <PasswordMessage password={password} shouldShow={isPasswordFocused} />

      <Input
        label={'Пароль'}
        id={'password'}
        value={password}
        type={shouldShowPassword ? 'text' : 'password'}
        onKeyUp={() => setIsPasswordValid(password.match(validatePassword) ? true : false)}
        onChange={e => setPassword(e.target.value)}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        placeholder={'Пароль...'}
        inputClassName={isPasswordValid ? styles.ValidPassword : styles.InvalidPassword}
      />
      <div className={styles.Checkbox}>
        <input type="checkbox" onClick={() => setShouldShowPassword(!shouldShowPassword)} />
        Показать пароль
      </div>

      <Input
        label={'Подтвердите Пароль'}
        id={'confirmPassword'}
        value={confirmPassword}
        type={shouldShowConfirmPassword ? 'text' : 'password'}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder={'Подтвердите Пароль...'}
        inputClassName={styles.Input}
      />
      <div className={styles.Checkbox}>
        <input type="checkbox" onClick={() => setShouldShowConfirmPassword(!shouldShowConfirmPassword)} />
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
