import Header from './Header'
import PostList from './PostList'

import myPosts from '../posts.json' 

import styles from './App.module.scss'; 

function App() {

  const myBeautifulHandler = () => {
    console.log('Do you wanna know how i had these scars?')
  }

  return (
    <div className={styles.Container}>
        <Header />
        <PostList posts={myPosts} postsHandler={myBeautifulHandler} />
    </div>
  );
}

export default App;
