import React, { Fragment } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { FaListUl } from "react-icons/fa";

const Alllisttypes = (props) => {
  const { alllists } = props;
  let newlists = alllists;
  if (alllists.length == 1) {
    if (props.type === "normal") {
      newlists = alllists[0].lists;
    } else if (props.type === "create") {
      newlists = alllists[0].lists.filter((list) => list);
      newlists.pop();
    }
  }
  return (
    <>
      {newlists.map((list) => (
        <>
          <Fragment>
            <FaListUl />
          </Fragment>
          <option value={list}>{list}</option>
        </>
      ))}
    </>
  );
};

const mapPropsToState = (state) => {
  const authId = state.firebase.auth.uid;
  const ans = state.firestore.ordered.AllLists || state.project.all_lists;
  return {
    alllists: ans.filter((list) => list.id === authId),
  };
};

export default compose(
  connect(mapPropsToState),
  firestoreConnect([{ collection: "AllLists" }])
)(Alllisttypes);
