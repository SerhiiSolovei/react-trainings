import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { initializeFirebaseApp } from './firebase';

export const FirebaseContext = React.createContext({
  authenticated: false,
  user: null,
  loading: true,
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props);
    initializeFirebaseApp();

    this.state = {
      authenticated: false,
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          user,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    const { children } = this.props;
    return <FirebaseContext.Provider value={this.state}>{children}</FirebaseContext.Provider>;
  }
}

export default FirebaseProvider;
