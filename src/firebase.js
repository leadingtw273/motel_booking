import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
    apiKey: 'AIzaSyAL-kM0DAddoT6vzSfhIWaaM4jpD8u9fmE',
    authDomain: 'motelbooking-85870.firebaseapp.com',
    databaseURL: 'https://motelbooking-85870.firebaseio.com',
    projectId: 'motelbooking-85870',
    storageBucket: 'motelbooking-85870.appspot.com',
    messagingSenderId: '1013731614296'
});

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
