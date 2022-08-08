import React from "react";
import "../styles/navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alllisttypes from "./alllisttypes";
import { MdSearch, MdClear } from "react-icons/md";
import title from "../styles/pics/title.png";
import { RiMenuAddLine } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { signout } from "../actions/authactions";
import { connect } from "react-redux";

const Navbar = (props) => {
  let iconchar = "";
  if (props.authName !== null) {
    iconchar = props.authName.toUpperCase()[0];
  } else {
    iconchar = "";
  }
  let listtype = "";
  if (props.props.match.path === "/") {
    listtype = "Default";
  } else {
    listtype = props.props.match.params.listtype;
  }
  const [list, setlist] = useState(listtype);
  const [dropcheck, setdropcheck] = useState(false);
  const [searchcheck, setsearchcheck] = useState(false);

  const signoutcall = () => {
    props.signoutfunc();
  };

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => setdropcheck(false)}>
          <Link to="/">
            <img title="Home" id="logo" src={title} />
          </Link>
        </div>
        <div className="listselect" onClick={() => setdropcheck(false)}>
          <Link to={`/${list}`}>
            <select
              id="selectcat"
              value={list}
              onChange={(e) => setlist(e.target.value)}
            >
              <Alllisttypes type="normal" />
            </select>
          </Link>
        </div>
        <div className="more">
          <div onClick={() => props.func(true)}>
            <div id="addlistdiv" onClick={() => setdropcheck(false)}>
              <RiMenuAddLine id="listicon" size="26px" />
            </div>
          </div>
          <div onClick={() => setdropcheck(false)}>
            <MdSearch id="searchicon" onClick={() => setsearchcheck(true)} />
          </div>
          <div>
            <div id="outerdoticon">
              <div id="doticon" onClick={() => setdropcheck(true)}>
                {iconchar}
              </div>
            </div>
          </div>
        </div>
      </div>
      )
      {dropcheck && (
        <div id="dropmaindiv" onClick={() => setdropcheck(false)}>
          <div id="dropdownbox">
            <ul>
              <Link to="/listmenu">
                <li>Task Lists</li>
              </Link>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <li onClick={() => props.func2(true)}>Send feedback</li>
              <Link to="/aboutus">
                <li>About us</li>
              </Link>
              <li onClick={signoutcall}>Sign Out</li>
            </ul>
          </div>
        </div>
      )}
      {searchcheck && (
        <div>
          <div id="searchbox">
            <div
              id="searchbackbtn"
              onClick={() => {
                setsearchcheck(false);
                props.searchactive(null);
              }}
            >
              <div id="searchbackbtnin">
                <IoArrowBackOutline id="searchback" />
              </div>
            </div>
            <div id="searchinput">
              <input
                placeholder="Search"
                type="text"
                id="inpsearch"
                onChange={(e) => props.filtering(e.target.value)}
              />
            </div>
            <div
              id="searchclearbtn"
              onClick={() => {
                document.getElementById("inpsearch").value = "";
                props.filtering("");
              }}
            >
              <MdClear id="clearicon" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapPropsToState = (state) => {
  // console.log(state);
  return {
    authdetails: state.firebase.auth,
    authName: state.firebase.profile.name || null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signoutfunc: () => dispatch(signout()),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Navbar);
