import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers

const firebaseConfig = {
  apiKey: 'AIzaSyBJGV_ZUsfqQszWzmIjjqyV9IMPr6CVvOQ',
  authDomain: 'phonedirectory-1724e.firebaseapp.com',
  databaseURL: 'https://phonedirectory-1724e.firebaseio.com',
  projectId: 'phonedirectory-1724e',
  storageBucket: 'phonedirectory-1724e.appspot.com',
  messagingSenderId: '163720571842'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const intialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  intialState,
  compose(reactReduxFirebase(firebase)) //might need redux dev tools
);

export default store;
