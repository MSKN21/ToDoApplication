import React, { useState } from "react";
import "../../styles/signin.css";
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { signup } from "../../actions/authactions";
import { connect } from "react-redux";
import avatar from "../../styles/pics/avatar.png";

const Signup = (props) => {
  const [username, setusername] = useState(null);
  const [usermail, setusermail] = useState(null);
  const [password, setpassword] = useState(null);
  const [reentrpass, setreentrpass] = useState(null);
  const [phoneno, setphoneno] = useState(null);
  const [lenerror, setlenerror] = useState(null);
  const [matcherr, setmatcherr] = useState(null);
  const [forerr2, setforerr2] = useState(false);

  const timer = () => {
    setlenerror(null);
    setmatcherr(null);
  };

  const { authdetail } = props;

  const erroff = () => {
    let x = document.getElementById("errmsgup");
    if (x) {
      x.style.display = "none";
      setforerr2(false);
    }
  };

  if (forerr2 && authdetail !== null) {
    document.getElementById("errmsgup").style.display = "block";
    setTimeout(erroff, 2000);
  }

  const handlesignupsubmit = (e) => {
    e.preventDefault();
    const creds = { username, usermail, password, phoneno };
    if (password.length < 6) {
      setlenerror("Password min length should be 6");
      setTimeout(timer, 2000);
    } else if (password === reentrpass) {
      props.submitsignup(creds);
      setforerr2(true);
    } else {
      setmatcherr("Passwords Doesn't Match");
      setTimeout(timer, 2000);
    }
  };

  return (
    <div id="signincomp">
      <div id="signoutbox">
        <img src={avatar} id="image" />
        <h4 id="h4">WELCOME</h4>
        <h4 id="h4">Create your account </h4>
        <p id="infotext">Sign up by entering the information below</p>
        <form onSubmit={handlesignupsubmit}>
          <div id="inputs">
            <span id="faiconspans">
              <FaUser size="25px" id="faicons" />
            </span>
            <input
              onChange={(e) => {
                setusername(e.target.value);
                setforerr2(false);
              }}
              id="usrmail2"
              placeholder="Username"
              type="text"
              required
            />
          </div>
          <div id="inputs2">
            <span id="faiconspans">
              <MdEmail size="25px" id="faicons" />
            </span>
            <input
              onChange={(e) => {
                setusermail(e.target.value);
                setforerr2(false);
              }}
              id="usrmail"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <p id="errmsgup">{authdetail}</p>
          <div id="inputs2">
            <span id="faiconspans">
              <FaLock size="25px" id="faicons" />
            </span>
            <input
              id="usrpass"
              onChange={(e) => {
                setpassword(e.target.value);
                setforerr2(false);
              }}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          {lenerror && <p id="errmsg2">{lenerror}</p>}
          <div id="inputs2">
            <span id="faiconspans">
              <FaLock size="25px" id="faicons" />
            </span>
            <input
              id="usrpass"
              onChange={(e) => {
                setreentrpass(e.target.value);
                setforerr2(false);
              }}
              placeholder="Re enter password"
              type="password"
              required
            />
          </div>
          {matcherr && <div id="errmsg2">{matcherr}</div>}
          <div id="inputs2">
            <span id="faiconspans">
              <FaPhoneAlt size="25px" id="faicons" />
            </span>
            <input
              id="usrpass"
              onChange={(e) => {
                setphoneno(e.target.value);
                setforerr2(false);
              }}
              placeholder="Enter a 10 digit number"
              type="tel"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <button id="signinbtn">Create account</button>
        </form>
        <p>Already have an account?</p>
        <div onClick={props.func} id="h5">
          SIGN IN
        </div>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    authdetail: state.reduxauth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitsignup: (creds) => dispatch(signup(creds)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Signup);
