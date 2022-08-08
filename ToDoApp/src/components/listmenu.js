import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Listmenuchild from "./listmenuchild";
import "../styles/listmenu.css";
import Newlist from "./newlist";
import Editlistname from "./editnewlist";
import { RiMenuAddLine } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { editList } from "../actions/allactions";

const Listmenu = (props) => {
  const { alllists } = props;
  let newlists = alllists;
  if (alllists.length == 1) {
    newlists = alllists[0].lists;
    // console.log(newlists);
  }
  let listfiltered = newlists.filter((post) => {
    return post !== "Finished";
  });
  const [newlistbox, setnewlistbox] = useState(false);
  const [editlistbox, seteditlistbox] = useState(false);

  //below two are for edit list
  const [listname, setlistname] = useState(null);
  const [newlist, setnewlist] = useState(null);

  const newlistcheck = (val) => {
    setnewlistbox(val);
  };

  const editlistcheck = (val) => {
    seteditlistbox(val);
  };

  const getlistname = (lstname) => {
    setlistname(lstname);
  };

  const editlistname = (lstname) => {
    setnewlist(lstname);
  };

  const handleedit = () => {
    // console.log(listname, newlist);
    props.editlists(listname, newlist);
    seteditlistbox(false);
  };

  const { authdetails } = props;
  if (!authdetails.uid) return <Redirect to="/" />;

  return (
    <div>
      <nav className="listnavbar">
        <div className="listbarback">
          <Link to="/">
            <div id="backbtn">
              <IoArrowBackOutline id="back" />
            </div>
          </Link>
        </div>
        <div>
          <h1 className="listbarh1">All Lists</h1>
        </div>
        <div>
          <div id="addlistdiv">
            <RiMenuAddLine
              id="listicon"
              size="26px"
              onClick={() => setnewlistbox(true)}
            />
          </div>
        </div>
      </nav>
      <div className="listsdatabox">
        <div className="forpadding">
          {listfiltered.map((list) => (
            <Listmenuchild
              lists={list}
              getfunc={getlistname}
              editbtn={editlistcheck}
            />
          ))}
        </div>
      </div>
      {editlistbox && (
        <Editlistname
          name={listname}
          funccheck={editlistcheck}
          namefunc={editlistname}
          editfunc={handleedit}
        />
      )}
      {newlistbox && <Newlist func={newlistcheck} />}
    </div>
  );
};

const mapPropsToState = (state) => {
  const authId = state.firebase.auth.uid;
  const ans = state.firestore.ordered.AllLists || state.project.all_lists;
  return {
    alllists: ans.filter((list) => list.id === authId),
    authdetails: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editlists: (task, newlist) => dispatch(editList(task, newlist)),
  };
};

export default compose(
  connect(mapPropsToState, mapDispatchToProps),
  firestoreConnect([{ collection: "AllLists" }])
)(Listmenu);
