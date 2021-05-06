import { Link } from "react-router-dom";
import  * as Routes  from '../constants/Routes';

import styles from './PostList.module.scss';

const PostList = (props) => {
    const {posts} = props
    console.log(posts)
    return <section>
       {posts.map(post => {
           return <article>
                <h3>{post.title}
                    <Link to={Routes.EDIT_POST}><span className={styles.EditLink}>изменить</span></Link>
                </h3>
                <time dateTime={post.date}>{post.date}</time>
                <p>{post.content}</p>
        </article>
       })}
    </section>
}

export default PostList
