import React, { useState } from "react";
import { connect } from "react-redux";
import { signin } from "../../actions/authactions";
import "../../styles/signin.css";
import { FaUser, FaLock } from "react-icons/fa";
import avatar from "../../styles/pics/avatar.png";

const Sigin = (props) => {
  const { authdetails } = props;
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  // const [remember, setremember] = useState(false);
  // const [forgotpass, setforgotpass] = useState(false);
  const [forerr, setforerr] = useState(false);
  const erroff = () => {
    let x = document.getElementById("errmsg");
    if (x) {
      x.style.display = "none";
      setforerr(false);
    }
  };
  if (forerr && authdetails !== null) {
    document.getElementById("errmsg").style.display = "block";
    setTimeout(erroff, 2000);
  }

  const handlesiginsubmit = (e) => {
    e.preventDefault();
    const details = { username, password };
    props.submitsignin(details);
    setforerr(true);
  };

  return (
    <div id="signincomp">
      <div id="signinbox">
        <img src={avatar} id="image" />
        <h4 id="h4">WELCOME</h4>
        <p id="infotext">Sign in by entering the information below</p>
        <form onSubmit={handlesiginsubmit}>
          <div id="inputs">
            <span id="faiconspans">
              <FaUser size="25px" id="faicons" />
            </span>
            <input
              onChange={(e) => {
                setusername(e.target.value);
                setforerr(false);
              }}
              id="usrmail"
              placeholder="Your Email"
              type="email"
              required
            />
          </div>
          <div id="passinputs">
            <span id="faiconspans">
              <FaLock size="25px" id="faicons" />
            </span>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
                setforerr(false);
              }}
              id="usrpass"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <p id="errmsg">{authdetails}</p>
          {false && (
            <div id="extrabox">
              <div id="remember">
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <div id="forgot">Forgot password</div>
            </div>
          )}
          <button id="signinbtn">Sign in</button>
        </form>
        <p>Don't have an account?</p>
        <div onClick={props.func} id="h5">
          SIGN UP
        </div>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    authdetails: state.reduxauth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitsignin: (creds) => dispatch(signin(creds)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Sigin);
