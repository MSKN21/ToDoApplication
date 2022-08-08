import projectreducer from "./projectreducer";
import authreducer from "./authreducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootreducer = combineReducers({
  reduxauth: authreducer,
  project: projectreducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootreducer;
