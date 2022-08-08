import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/listmenuchild.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteList } from "../actions/allactions";

const Listmenuchild = (props) => {
  const { lists } = props;
  const { cnt, alllists } = props;
  let check = true;
  if (lists === "Default") check = false;
  else check = true;
  const [checkbtns, setcheckbtns] = useState(check);

  const handledelete = (list) => {
    props.dellists(list);
  };

  return (
    <>
      <div className="listbox">
        <div>
          <Link to={`/${lists}`}>
            <div>
              <h3 id="listh3">{lists}</h3>
              <p id="listnumber">Tasks: {cnt}</p>
            </div>
          </Link>
        </div>
        {checkbtns && (
          <>
            <div id="listeditbtn">
              <MdEdit
                size="30px"
                id="editicon"
                onClick={() => {
                  props.editbtn(1);
                  props.getfunc(lists);
                }}
              />
            </div>
            <div id="listdelbtn">
              <MdDelete
                id="delicon"
                size="30px"
                onClick={() => handledelete(lists)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapPropsToState = (state, ownprops) => {
  let count = 0;
  const authId = state.firebase.auth.uid;
  const ans = state.firestore.ordered.AllTodos || state.project.all_todos;
  ans.forEach((post) => {
    if (
      post.authorId === authId &&
      (post.list === ownprops.lists || "Default" === ownprops.lists)
    ) {
      count++;
    }
  });
  return {
    cnt: count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dellists: (task) => dispatch(deleteList(task)),
  };
};

export default compose(
  connect(mapPropsToState, mapDispatchToProps),
  firestoreConnect([{ collection: "AllTodos" }])
)(Listmenuchild);
