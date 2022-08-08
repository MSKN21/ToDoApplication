import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/task.css";
import {
  deleteTask,
  moveToFinished,
  reloadTask,
  notToFinished,
} from "../actions/allactions";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiRepeat } from "react-icons/fi";

function task(props) {
  const { lists: list } = props;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handlecheckbox = (e, post) => {
    if (e.target.checked != true) {
      props.reloadtask(post.id);
    } else {
      if (post.mode === "No Repeat") {
        props.movetofinished(post.id);
      } else {
        props.deletetask(post.id);
        setTimeout(props.nottofinished, 500, post);
      }
    }
  };

  const dateconverter = (date) => {
    let x = new Date(date);
    let min = "",
      hr = "";
    if (x.getMinutes() < 10) {
      min = `0${x.getMinutes()}`;
    } else {
      min = x.getMinutes();
    }
    if (x.getHours() < 10) {
      hr = `0${x.getHours()}`;
    } else {
      hr = x.getHours();
    }
    let ans =
      days[x.getDay()] +
      ", " +
      x.getDate() +
      " " +
      months[x.getMonth()] +
      " " +
      x.getFullYear() +
      ", " +
      hr +
      ":" +
      min;
    return ans;
  };

  const checkrepeat = (task) => {
    if (task.mode === "No Repeat") return false;
    else return true;
  };

  const handledelete = (e, id) => {
    props.deletetask(id);
  };

  return (
    <div className="taskbox" key={list.id}>
      <div id="taskbtnsbox">
        <div>
          <input
            className="checkfield"
            type="checkbox"
            onClick={(e) => handlecheckbox(e, list)}
            defaultChecked={list.check}
          />
        </div>
        <div>
          <div>
            <Link to={`/taskedit/${list.id}`}>
              <MdEdit id="taskediticon" />
            </Link>
          </div>
        </div>
        <div>
          <MdDelete
            id="taskdelicon"
            onClick={(e) => handledelete(e, list.id)}
          />
        </div>
      </div>
      <div id="infodiv">
        <h4 className="tasktext">{list.task}</h4>
        {list.date && list.time && (
          <p className="datentime">
            {dateconverter(list.date + " " + list.time)}
            {checkrepeat(list) && <FiRepeat id="repeaticon" />}
          </p>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    movetofinished: (id) => dispatch(moveToFinished(id)),
    nottofinished: (post) => dispatch(notToFinished(post)),
    deletetask: (id) => dispatch(deleteTask(id)),
    reloadtask: (id) => dispatch(reloadTask(id)),
  };
};

export default connect(null, mapDispatchToProps)(task);
