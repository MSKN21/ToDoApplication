export const signin = (credentials) => {
  return (dispatch, useState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.username, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE", err });
      });
  };
};

export const signout = () => {
  return (dispatch, useState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "SIGNOUT_FAILURE", err });
      });
  };
};

export const signup = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        credentials.usermail,
        credentials.password
      )
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: credentials.username,
          phoneno: credentials.phoneno,
        });
      })
      .then((resp) => {
        return firestore
          .collection("AllLists")
          .doc(getState().firebase.auth.uid)
          .set({
            lists: [
              "Default",
              "Personal",
              "Work",
              "Shopping",
              "WishList",
              "Finished",
            ],
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_FAILURE", err });
      });
  };
};
