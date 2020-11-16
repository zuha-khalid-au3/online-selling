import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCurWVjjxvVJAEBmQAavefVI6lIa0kRbkM",
  authDomain: "online-selling-91474.firebaseapp.com",
  databaseURL: "https://online-selling-91474.firebaseio.com",
  projectId: "online-selling-91474",
  storageBucket: "online-selling-91474.appspot.com",
  messagingSenderId: "926485017816",
  appId: "1:926485017816:web:4508134456b76d5edd93ad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();