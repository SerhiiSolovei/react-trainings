import React from 'react';
import firebase from 'firebase/app';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as Routes from '../constants/Routes';

import Header from './Header';
import PostList from './PostList';
import CreateForm from './Posts/CreateForm';
import EditForm from './Posts/EditForm';

import Login from './auth/Login';
import Registration from './auth/Registration';

import { FirebaseContext } from './services/FirebaseProvider';

import styles from './App.module.scss';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <FirebaseContext.Consumer>
      {({ authenticated }) => (
        <Route
          {...rest}
          render={props =>
            authenticated === true ? (
              component(props)
            ) : (
              <Redirect to={{ pathname: Routes.LOGIN, state: { from: props.location } }} />
            )
          }
        />
      )}
    </FirebaseContext.Consumer>
  );
};

const PublicRoute = ({ component, ...rest }) => {
  return (
    <FirebaseContext.Consumer>
      {({ authenticated, loading }) => (
        <Route
          {...rest}
          render={props =>
            authenticated === false && loading === false ? component(props) : <Redirect to={Routes.MAIN} />
          }
        />
      )}
    </FirebaseContext.Consumer>
  );
};

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

          <PrivateRoute
            path={Routes.POST_CREATION}
            component={props => <CreateForm createPost={this.addNewPost} {...props} />}
          />
          <PrivateRoute
            path={Routes.EDIT_POST}
            component={({ match, history }) => {
              const { id } = match.params;
              return (
                <EditForm
                  postId={id}
                  posts={this.state.posts}
                  changePost={this.updatePost}
                  deletePost={this.deletedPost}
                  history={history}
                />
              );
            }}
          />
          <PublicRoute path={Routes.LOGIN} component={() => <Login />} />
          <PublicRoute path={Routes.REGISTRATION} component={() => <Registration />} />

          <Route path={Routes.MAIN}>
            <PostList posts={this.state.posts} deletePost={this.deletedPost} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
