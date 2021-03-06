import { lowerCaseLetters, upperCaseLetters, numbers } from './utils';

import styles from './PasswordMessage.module.scss';

const PasswordMessage = ({ password, shouldShow }) => {
  const containLowerCaseLetter = password.match(lowerCaseLetters) ? true : false;
  const containUpperCaseLetter = password.match(upperCaseLetters) ? true : false;
  const containNumber = password.match(numbers) ? true : false;
  const containMinCharNumber = password.length >= 6 ? true : false;

  if (shouldShow === true) {
    return (
      <div className={styles.Message}>
        <h4 className={styles.Header}>Пароль должен содержать минимум:</h4>
        <div className={containLowerCaseLetter ? styles.Valid : styles.Invalid}>
          Одну строчную букву английского алфавита
        </div>
        <div className={containUpperCaseLetter ? styles.Valid : styles.Invalid}>
          Одну заглавную букву английского алфавита
        </div>
        <div className={containNumber ? styles.Valid : styles.Invalid}>Одну цифру</div>
        <div className={containMinCharNumber ? styles.Valid : styles.Invalid}>Шесть символов</div>
      </div>
    );
  }
  return null;
};

export default PasswordMessage;
