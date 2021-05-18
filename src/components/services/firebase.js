// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

export const initializeFirebaseApp = () => {
  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyCIAYVT9G3WMH9zSfJel7szfK8dJs3QITY',
      authDomain: 'boardgamesblog-218e0.firebaseapp.com',
      projectId: 'boardgamesblog-218e0',
      storageBucket: 'boardgamesblog-218e0.appspot.com',
      messagingSenderId: '456454012886',
      appId: '1:456454012886:web:e72a2e4264acca9a7a6e77',
      measurementId: 'G-38K1LMCJ99',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.error('Firebase Initialization Failed!!!');
  }
};
