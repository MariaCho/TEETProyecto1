import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAxQJngQW4thgOJlRE5H7t5XWywkcxiGnk",
    authDomain: "teetproeycto1.firebaseapp.com",
    databaseURL: "https://teetproeycto1.firebaseio.com",
    projectId: "teetproeycto1",
    storageBucket: "teetproeycto1.appspot.com",
    messagingSenderId: "287608994546"
};
const fire = firebase.initializeApp(config);
export default fire;

