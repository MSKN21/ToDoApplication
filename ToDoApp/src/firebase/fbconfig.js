import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyA4-O1bk727ZNrWOMAbqb5QGBK2covMC38",
  authDomain: "todo-list-app-ba7f6.firebaseapp.com",
  projectId: "todo-list-app-ba7f6",
  storageBucket: "todo-list-app-ba7f6.appspot.com",
  messagingSenderId: "127360373248",
  appId: "1:127360373248:web:6d55a8cc243dd7ccaa3ee5",
  measurementId: "G-8E9B6FM39T",
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
