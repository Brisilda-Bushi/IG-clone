import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDebG8MJxosXOxqJhkFJ4U9kFN9C7c0mbg',
  authDomain: 'ig-clone-rn-39050.firebaseapp.com',
  projectId: 'ig-clone-rn-39050',
  storageBucket: 'ig-clone-rn-39050.appspot.com',
  messagingSenderId: '5656136888',
  appId: '1:5656136888:web:30e34e42df403ab0dff84d',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
