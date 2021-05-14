import React from 'react';

import styles from './styles.module.scss';

class Registration extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
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
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Пароль..."
          className={styles.Input}
        />

        <label htmlFor="confirmPassword" className={styles.InputLabel}>
          Подтвердите Пароль
        </label>
        <input
          id="confirmPassword"
          value={this.state.confirmPassword}
          onChange={e => this.setState({ confirmPassword: e.target.value })}
          placeholder="Подтвердите Пароль..."
          className={styles.Input}
        />

        <button>Зарегестрироваться</button>
      </div>
    );
  }
}

export default Registration;
