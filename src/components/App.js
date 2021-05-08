import React from 'react';
import firebase from 'firebase/app';
import { Switch, Route } from 'react-router-dom';

import * as Routes from '../constants/Routes';

import Header from './Header';
import PostList from './PostList';
import CreateForm from './Posts/CreateForm';
import EditForm from './Posts/EditForm';

import styles from './App.module.scss';

class App extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        const postsFromDB = [];

        querySnapshot.forEach(doc => {
          postsFromDB.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.setState({ posts: postsFromDB });
      });
  }

  addNewPost = newPost => {
    this.setState(prevState => ({
      ...prevState,
      posts: [...prevState.posts, newPost],
    }));
  };

  updatePost = post => {
    this.setState(prevState => ({
      ...prevState,
      posts: prevState.posts.map(oldPost => {
        if (oldPost.id === post.id) {
          return post;
        }
        return oldPost;
      }),
    }));
  };

  deletedPost = postId => {
    this.setState(prevState => ({
      ...prevState,
      posts: prevState.posts.filter(post => postId !== post.id),
    }));
  };

  render() {
    return (
      <div className={styles.Container}>
        <Header />

        <Switch>
          <Route path={Routes.RECOMMENDATIONS}>Рекомендации от профанов</Route>
          <Route path={Routes.AUTHORS}>Информация об Авторах</Route>
          <Route path={Routes.POST_CREATION}>
            <CreateForm createPost={this.addNewPost} />
          </Route>
          <Route
            path={Routes.EDIT_POST}
            render={({ match, history }) => {
              const { id } = match.params;
              return <EditForm postId={id} posts={this.state.posts} changePost={this.updatePost} history={history} />;
            }}
          />
          <Route path={Routes.MAIN}>
            <PostList posts={this.state.posts} deletePost={this.deletedPost} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
