import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/newlist.css";
import { addList } from "../actions/allactions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const Newlist = (props) => {
  const { alllists } = props;
  let newlists = alllists;
  if (alllists.length == 1) {
    newlists = alllists[0].lists.filter((lst) => lst);
    // console.log(newlists);
  }
  const [name, setname] = useState("");
  const [checkname, setcheckname] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    const newname = name;
    let cnt = 0;

    newlists.forEach((element) => {
      if (element === newname) {
        cnt++;
      }
    });
    if (cnt === 0) {
      props.addlist(newname);
      props.func(false);
    } else {
      setcheckname(true);
      setTimeout(setcheckname, 2000, false);
    }
  };

  return (
    <div className="newlistbox">
      <form onSubmit={handlesubmit} className="listform">
        <label id="listhead">New List</label>
        <input
          placeholder="Enter New Task"
          id="listinp"
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        {checkname && (
          <h4 id="reddit">This list is already present enter another</h4>
        )}
        <div className="listbtns">
          <div>
            <button className="addbtn">ADD</button>
          </div>
          <div>
            <p onClick={() => props.func(false)} className="cancelbtn">
              CANCEL
            </p>
          </div>
        </div>
      </form>
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
    addlist: (newname) => dispatch(addList(newname)),
  };
};

export default compose(
  connect(mapPropsToState, mapDispatchToProps),
  firestoreConnect([{ collection: "AllLists" }])
)(Newlist);
