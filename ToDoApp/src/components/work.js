import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Task from "./task";
import Quick from "./quick";
import "../styles/work.css";
import Newlist from "./newlist";
import { GrAdd } from "react-icons/gr";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { IoMdCheckboxOutline } from "react-icons/io";
import Signin from "./accounts/signin";
import Signup from "./accounts/signup";
import Empty from "./empty";
import Feedback from "./feedback";
import { FaUsers } from "react-icons/fa";
import title from "../styles/pics/title.png";

const Work = (props) => {
  const { alllists, authdetails } = props;
  const [txt, settxt] = useState("");
  const [filteractive, setfilteractive] = useState(null);
  const [filteredtasks, setfilteredtasks] = useState([]);
  const [feedbackform, setfeedbackform] = useState(false);
  const [emptycheck, setemptycheck] = useState(false);
  const [FTemptycheck, setFTemptycheck] = useState(false);

  let todaycheck = false;
  let weekcheck = false;
  let monthcheck = false;
  let latercheck = false;
  let nodatecheck = false;
  let overduecheck = false;

  useEffect(() => {
    if (alllists.length === 0) setemptycheck(true);
    else setemptycheck(false);
  });

  useEffect(() => {
    if (filteredtasks.length === 0) setFTemptycheck(true);
    else setFTemptycheck(false);
  });

  // console.log(alllists);
  let todaytsk = [],
    weektsk = [],
    monthtsk = [],
    latertsk = [],
    overduetsk = [],
    noduetsk = [];

  const splitting = (list) => {
    var time = new Date(list.date + " " + list.time).getTime();
    var presenttime = new Date().getTime();
    if (isNaN(time)) {
      noduetsk.push(list);
      nodatecheck = true;
    } else if (time - presenttime <= 0) {
      overduetsk.push(list);
      overduecheck = true;
    } else if (time - presenttime <= 86400000) {
      todaytsk.push(list);
      todaycheck = true;
    } else if (time - presenttime <= 604800000) {
      weektsk.push(list);
      weekcheck = true;
    } else if (time - presenttime <= 2592000000) {
      monthtsk.push(list);
      monthcheck = true;
    } else if (time - presenttime > 2592000000) {
      latertsk.push(list);
      latercheck = true;
    }
  };

  const sorting = (lists) => {
    lists.slice().sort(function sortFunction(a, b) {
      var dateA = new Date(a.date + " " + a.time).getTime();
      var dateB = new Date(b.date + " " + b.time).getTime();
      return dateA > dateB ? 1 : -1;
    });
    // console.log(lists);
    lists.forEach((list) => splitting(list));
  };

  sorting(alllists);

  const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date()); // default value can be anything you want

  useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 3000);
  }, [fakeCurrentDate]);

  const handlefilter = (txt) => {
    settxt(txt);
    if (txt === "") {
      setfilteractive(null);
    } else {
      setfilteredtasks(alllists.filter((list) => list.task.search(txt) !== -1));
      setfilteractive(1);
      // console.log(filteredtasks);
    }
  };

  const [newlistbox, setnewlistbox] = useState(false);
  const newlistcheck = (val) => {
    setnewlistbox(val);
  };

  const feedbackcheck = (val) => {
    setfeedbackform(val);
  };

  //authentication checking starts

  // console.log(authdetails);

  const [signincheck, setsignincheck] = useState(true);
  const usercheck = authdetails.uid ? true : false;
  const [signupcheck, setsignupcheck] = useState(false);

  const showsignin = () => {
    setsignincheck(true);
    setsignupcheck(false);
  };

  const showsignup = () => {
    setsignincheck(false);
    setsignupcheck(true);
  };

  //authentication checking ends

  return (
    <>
      {!usercheck && (
        <div className="navbar2">
          <div className="logo">
            <Link to="/">
              <img title="Home" id="logo" src={title} />
            </Link>
          </div>
          <div>
            <h3 id="titlehead">ToDoList</h3>
          </div>
          <div onClick={showsignin} className="signbtns">
            SignIn
          </div>
          <div onClick={showsignup} className="signbtns">
            SignUp
          </div>
          <div>
            <Link to="/aboutus">
              <FaUsers id="abouticon" />
            </Link>
          </div>
        </div>
      )}
      {!usercheck && signincheck && <Signin func={showsignup} />}
      {!usercheck && signupcheck && <Signup func={showsignin} />}
      {usercheck && (
        <Navbar
          props={props.props}
          func={newlistcheck}
          func2={feedbackcheck}
          name="nothome"
          filtering={handlefilter}
          searchactive={setfilteractive}
        />
      )}
      {usercheck && newlistbox && <Newlist func={newlistcheck} />}
      {usercheck && feedbackform && <Feedback func={feedbackcheck} />}
      {usercheck && (
        <div className="workmaindiv">
          <div id="mainboxfrpadd">
            {!filteractive && emptycheck && <Empty name="notsearch" />}
            {!filteractive && overduecheck && (
              <>
                <h1 id="allmainheads">Over Due</h1>
                <div>
                  {overduetsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {!filteractive && todaycheck && (
              <>
                <h1 id="allmainheads">Today</h1>
                <div>
                  {todaytsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {!filteractive && weekcheck && (
              <>
                <h1 id="allmainheads">This Week</h1>
                <div>
                  {weektsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {!filteractive && monthcheck && (
              <>
                <h1 id="allmainheads">This Month</h1>
                <div>
                  {monthtsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {!filteractive && latercheck && (
              <>
                <h1 id="allmainheads">Later</h1>
                <div>
                  {latertsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {!filteractive && nodatecheck && (
              <>
                <h1 id="allmainheads">No Date</h1>
                <div>
                  {noduetsk.map((list) => (
                    <Task lists={list} />
                  ))}
                </div>
              </>
            )}
            {filteractive && FTemptycheck && <Empty name="search" />}
            {filteractive && (
              <div>
                {filteredtasks.map((list) => (
                  <Task lists={list} />
                ))}
              </div>
            )}
            <Link to="/create">
              <div id="addtaskbtn">
                <GrAdd id="plus" />
              </div>
            </Link>
          </div>
        </div>
      )}
      {usercheck && <Quick />}
    </>
  );
};

const mapPropsToState = (state, ownProps) => {
  // console.log(state);
  const type = ownProps.props.match.params.listtype;
  const authId = state.firebase.auth.uid;
  const ans = state.firestore.ordered.AllTodos || state.project.all_todos;
  if (
    type === "Default" ||
    type === "undefined" ||
    ownProps.props.match.path === "/"
  ) {
    return {
      alllists: ans.filter(
        (task) => task.authorId === authId && task.check !== true
      ),
      authdetails: state.firebase.auth,
    };
  } else if (type === "Finished") {
    return {
      alllists: ans.filter(
        (task) => task.authorId === authId && task.check !== false
      ),
      authdetails: state.firebase.auth,
    };
  } else {
    return {
      alllists: ans.filter(
        (task) => task.authorId === authId && task.list === type
      ),
      authdetails: state.firebase.auth,
    };
  }
};

export default compose(
  connect(mapPropsToState),
  firestoreConnect([{ collection: "AllTodos" }])
)(Work);
