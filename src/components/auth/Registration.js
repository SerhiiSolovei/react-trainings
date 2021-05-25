import React, { useState } from 'react';
import firebase from 'firebase/app';

import { validateEmail, validatePassword, lowerCaseLetters, upperCaseLetters, numbers } from './utils';
import Input from '../ReusableComponents/Input';

import PasswordMessage from './PasswordMessage';

import styles from './styles.module.scss';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordField, changePasswordVisibility] = useState(false);
  const [showConfirmPasswordField, changeConfirmPasswordVisibility] = useState(false);
  const [passwordInputOnFocus, changePasswordInputOnFocus] = useState(false);
  const [validPassword, checkValidation] = useState(false);
  const [validationDetails, checkValidationDetails] = useState({
    containLowerCaseLetter: false,
    containUpperCaseLetter: false,
    containNumber: false,
    containMinCharNumber: false,
  });

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
      alert('Неверное подтверждение пароля! Повторите еще раз!');
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

  const validationChecking = () => {
    checkValidation(password.match(validatePassword) ? true : false);
    checkValidationDetails(() => ({
      containLowerCaseLetter: password.match(lowerCaseLetters) ? true : false,
      containUpperCaseLetter: password.match(upperCaseLetters) ? true : false,
      containNumber: password.match(numbers) ? true : false,
      containMinCharNumber: password.length >= 6 ? true : false,
    }));
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

      <PasswordMessage state={validationDetails} passwordInputOnFocus={passwordInputOnFocus} />

      <Input
        label={'Пароль'}
        id={'password'}
        value={password}
        type={showPasswordField ? 'text' : 'password'}
        onChange={e => setPassword(e.target.value)}
        onKeyUp={validationChecking}
        onFocus={() => changePasswordInputOnFocus(true)}
        onBlur={() => changePasswordInputOnFocus(false)}
        placeholder={'Пароль...'}
        inputClassName={validPassword ? styles.ValidPassword : styles.InvalidPassword}
      />
      <div className={styles.Checkbox}>
        <input type="checkbox" onClick={() => changePasswordVisibility(showPasswordField ? false : true)} />
        Показать пароль
      </div>

      <Input
        label={'Подтвердите Пароль'}
        id={'confirmPassword'}
        value={confirmPassword}
        type={showConfirmPasswordField ? 'text' : 'password'}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder={'Подтвердите Пароль...'}
        inputClassName={styles.Input}
      />
      <div className={styles.Checkbox}>
        <input
          type="checkbox"
          onClick={() => changeConfirmPasswordVisibility(showConfirmPasswordField ? false : true)}
        />
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
