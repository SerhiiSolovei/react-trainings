import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as Routes from '../constants/Routes';

import Header from './Header';
import PostList from './PostList';
import CreateForm from './Posts/CreateForm';
import EditForm from './Posts/EditForm';

import Login from './auth/Login';
import Registration from './auth/Registration';

import { useFirebase } from './services/FirebaseProvider';

import styles from './App.module.scss';

const PrivateRoute = ({ component, ...rest }) => {
  const { authenticated } = useFirebase();

  return (
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
  );
};

const PublicRoute = ({ component, ...rest }) => {
  const { authenticated, loading } = useFirebase();

  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false && loading === false ? component(props) : <Redirect to={Routes.MAIN} />
      }
    />
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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

        setPosts(postsFromDB);
      });
  }, []);

  const addNewPost = newPost => {
    setPosts(prevPosts => [...prevPosts, newPost]);
  };

  const updatePost = ({ id: postId, ...post }) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .update(post)
      .then(() => {
        console.log('BLa');
      })
      .catch(() => {
        alert('Error updating document');
      });

    setPosts(prevPosts => {
      return prevPosts.map(oldPost => {
        if (oldPost.id === post.id) {
          return post;
        } else {
          return oldPost;
        }
      });
    });
  };

  const deletePost = postId => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(post => postId !== post.id));
      })
      .catch(() => {
        alert('Error removing document');
      });
  };

  return (
    <div className={styles.Container}>
      <Header />
      <Switch>
        <Route path={Routes.RECOMMENDATIONS}>Рекомендации от профанов</Route>
        <Route path={Routes.AUTHORS}>Информация об Авторах</Route>

        <PrivateRoute
          path={Routes.POST_CREATION}
          component={props => <CreateForm createPost={addNewPost} {...props} />}
        />
        <PrivateRoute
          path={Routes.EDIT_POST}
          component={({ match, history }) => {
            const { id } = match.params;
            return (
              <EditForm postId={id} posts={posts} changePost={updatePost} deletePost={deletePost} history={history} />
            );
          }}
        />
        <PublicRoute path={Routes.LOGIN} component={() => <Login />} />
        <PublicRoute path={Routes.REGISTRATION} component={() => <Registration />} />

        <Route path={Routes.MAIN}>
          <PostList posts={posts} deletePost={deletePost} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
