import React from "react";
import "../styles/profile.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoMdListBox } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signout } from "../actions/authactions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import avatar from "../styles/pics/avatar.png";

const profilecomp = (props) => {
  const { authdetails, authextradetails, cnt } = props;
  if (!authdetails.uid) return <Redirect to="/" />;

  return (
    <div id="profileback">
      <nav id="profilenav">
        <div>
          <Link to="/">
            <IoArrowBackOutline id="backicon" />
          </Link>
        </div>
        <div id="proheader">My Profile</div>
      </nav>
      <div id="profiledata">
        <div id="profilebox">
          <div id="imgbox">
            <img src={avatar} id="imagepro" />
            <h4 id="h4head">My Account</h4>
          </div>
          <div id="detailbox">
            <div id="detailsgrid">
              <span>
                <FaUser id="profileicons" />
              </span>
              <div id="profiletitles">User Name</div>
              <div id="profileinfo">{authextradetails.name}</div>
            </div>
            <div id="detailsgrid">
              <span>
                <MdEmail id="profileicons" />
              </span>
              <div id="profiletitles">Email </div>
              <div id="profileinfo">{authdetails.email}</div>
            </div>
            <div id="detailsgrid">
              <span>
                <FaPhoneAlt id="profileicons" />
              </span>
              <div id="profiletitles">Phone No.</div>
              <div id="profileinfo">{authextradetails.phoneno}</div>
            </div>
            <div id="detailsgrid">
              <span>
                <IoMdListBox size="38px" id="profileicons" />
              </span>
              <div id="profiletitles">Total Tasks</div>
              <div id="profileinfo">{cnt.count1}</div>
            </div>
            <div id="detailsgrid">
              <span>
                <ImCheckboxChecked id="profileicons" />
              </span>
              <div id="profiletitles">Finished</div>
              <div id="profileinfo">{cnt.count3}</div>
            </div>
            <div id="detailsgrid">
              <span>
                <IoIosCheckboxOutline size="38px" id="profileicons" />
              </span>
              <div id="profiletitles">Not Finished</div>
              <div id="profileinfo">{cnt.count2}</div>
            </div>
          </div>
          <div id="outbtn">
            <button onClick={props.signoutfunc} id="signoutbtn">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  let count1 = 0,
    count2 = 0,
    count3 = 0;
  const authId = state.firebase.auth.uid;
  const ans = state.firestore.ordered.AllTodos || state.project.all_todos;
  ans.forEach((post) => {
    if (post.authorId === authId) {
      if (post.check === false) {
        count2++;
      } else {
        count3++;
      }
      count1++;
    }
  });

  return {
    authdetails: state.firebase.auth,
    authextradetails: state.firebase.profile,
    cnt: { count1, count2, count3 },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signoutfunc: () => dispatch(signout()),
  };
};

export default compose(
  connect(mapPropsToState, mapDispatchToProps),
  firestoreConnect([{ collection: "AllTodos" }])
)(profilecomp);
