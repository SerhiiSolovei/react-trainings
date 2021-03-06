import { Link } from 'react-router-dom';
import * as Routes from '../constants/Routes';

import { FirebaseContext } from './services/FirebaseProvider';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <ul className={styles.Container}>
      <li className={styles.Link}>
        <Link to={Routes.RECOMMENDATIONS}>Личные рекомендации</Link>
      </li>
      <li className={styles.Link}>
        <Link to="/">Обзоры</Link>
      </li>
      <li className={styles.Link}>
        <Link to={Routes.AUTHORS}>Об Авторах</Link>
      </li>
      <FirebaseContext.Consumer>
        {({ authenticated }) =>
          authenticated && (
            <li className={styles.Link}>
              <Link to={Routes.POST_CREATION}>Написать новый пост</Link>
            </li>
          )
        }
      </FirebaseContext.Consumer>
      <FirebaseContext.Consumer>
        {({ authenticated, loading }) =>
          !authenticated && !loading ? (
            <>
              <li className={styles.Link}>
                <Link to={Routes.LOGIN}>Войти</Link>
              </li>{' '}
              <li className={styles.Link}>
                <Link to={Routes.REGISTRATION}>Зарегестрироваться</Link>
              </li>
            </>
          ) : null
        }
      </FirebaseContext.Consumer>
    </ul>
  );
};

export default Header;
