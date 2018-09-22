import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA0Ptb8S_ic-XynBYuNw6VM53D7pPFJ7jo',
  authDomain: 'm-city-e5700.firebaseapp.com',
  databaseURL: 'https://m-city-e5700.firebaseio.com',
  projectId: 'm-city-e5700',
  storageBucket: 'm-city-e5700.appspot.com',
  messagingSenderId: '1011852017988'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

export const reqToFirebase = refTo => firebaseDB.ref(refTo);

export { firebase, firebaseDB };
