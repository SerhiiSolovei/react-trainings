import styles from './PasswordMessage.module.scss';

const PasswordMessage = ({ state, passwordInputOnFocus }) => {
  const { containLowerCaseLetter, containUpperCaseLetter, containNumber, containMinCharNumber } = state;
  if (passwordInputOnFocus === true) {
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
