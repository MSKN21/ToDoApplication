const initialstate = {
  authError: null,
};

const authreducer = (state = initialstate, action) => {
  if (action.type === "LOGIN_FAILURE") {
    console.log("login failure ", action.err);
    let errmsg;
    if (action.err.code === "auth/user-not-found") {
      errmsg = "User doesn't exist or Wrong credentials";
    } else if (action.err.code === "auth/wrong-password") {
      errmsg = "Incorrect Password";
    } else if (action.err.code === "auth/too-many-requests") {
      errmsg = "Too many attempts account is temporarily disabled";
    }
    return {
      ...state,
      authError: errmsg,
    };
  } else if (action.type === "LOGIN_SUCCESS") {
    console.log("login success");
    return {
      ...state,
      authError: null,
    };
  } else if (action.type === "SIGNOUT_SUCCESS") {
    console.log("signout success");
    return {
      ...state,
    };
  } else if (action.type === "SIGNOUT_FAILURE") {
    console.log("signout failure", action.err);
    return {
      ...state,
    };
  } else if (action.type === "SIGNUP_SUCCESS") {
    console.log("signup success");
    return {
      ...state,
      authError: null,
    };
  } else if (action.type === "SIGNUP_FAILURE") {
    console.log("signup failure", action.err);
    let errmsg;
    if (action.err.code === "auth/invalid-email") {
      errmsg = "The email address is badly formatted";
    } else if (action.err.code === "auth/email-already-in-use") {
      errmsg = "Email is already in use";
    }
    return {
      ...state,
      authError: errmsg,
    };
  }
  return state;
};

export default authreducer;
