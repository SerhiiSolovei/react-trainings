import styles from './Header.module.scss'

const Header = () => {
    return <ul className={styles.Container}>
        <li className={styles.Link}>Личные рекомендации</li>
        <li className={styles.Link}>Обзоры</li>
        <li className={styles.Link}>Об Авторах</li>
    </ul>
}

export default Header