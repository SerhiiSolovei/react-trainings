import { Link } from "react-router-dom";
import  * as Routes  from '../constants/Routes';

import styles from './Header.module.scss'

const Header = () => {
    return <ul className={styles.Container}>
        <li className={styles.Link}>
            <Link to={Routes.RECOMMENDATIONS}>Личные рекомендации</Link>
        </li>
        <li className={styles.Link}>
            <Link to="/">Обзоры</Link>
        </li>
        <li className={styles.Link}>
            <Link to={Routes.AUTHORS}>Об Авторах</Link>
        </li>
        <li className={styles.Link}>
            <Link to={Routes.POST_CREATION}>Написать новый пост</Link>
        </li>
    </ul>
}

export default Header
