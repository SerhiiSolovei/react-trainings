import React from 'react';
import { Switch, Route } from "react-router-dom";

import  * as Routes  from '../constants/Routes';

import Header from './Header'
import PostList from './PostList'
import CreateForm from './Posts/CreateForm'
import EditForm from './Posts/EditForm';

import myPosts from '../constants/posts.json'

import styles from './App.module.scss';


class App extends React.Component {
    state = {
        posts: myPosts
    }

  addNewPost = (newPost) => {
      this.setState((prevState) => ({
        ...prevState,
        posts: [...prevState.posts, newPost]
      }))
  }

  render () {
    return (
        <div className={styles.Container}>
            <Header />

            <Switch>
                <Route path={Routes.RECOMMENDATIONS}>Рекомендации от профанов</Route>
                <Route path={Routes.AUTHORS}>Информация об Авторах</Route>
                <Route path={Routes.POST_CREATION}>
                    <CreateForm createPost={this.addNewPost}/>
                </Route>
                <Route path={Routes.EDIT_POST}
                       render={({match}) => {
                         const { id } = match.params;
                         return <EditForm postId={id} posts={this.state.posts} changePost={this.addNewPost}/>
                       }
                }/>
                <Route path="/">
                    <PostList posts={this.state.posts} />
                </Route>

            </Switch>
        </div>
      );
  }
}

export default App;
