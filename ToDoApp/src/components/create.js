import { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import Alllisttypes from "./alllisttypes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/createtask.css";
import { BsCalendar } from "react-icons/bs";
import { RiMenuAddLine } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import Newlist from "./newlist";
import { addTask } from "../actions/allactions";

const Create = (props) => {
  const [task, settask] = useState("");
  const [date, setdate] = useState(new Date());
  const [time, settime] = useState("");
  const [list, setlist] = useState("Default");
  const [mode, setmode] = useState("No Repeat");
  const [focus, setfocus] = useState(false);
  const [value, setvalue] = useState(new Date());
  let history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();
    // const id = null;
    const newtask = { task, date, time, list, mode, check: false };
    // console.log(newtask);
    let strdate =
      newtask.date.getFullYear() +
      "/" +
      (newtask.date.getMonth() + 1) +
      "/" +
      newtask.date.getDate();
    newtask.date = strdate;

    props.addtask(newtask);
    history.push("/");
  };

  const [newlistbox, setnewlistbox] = useState(false);
  const newlistcheck = (val) => {
    setnewlistbox(val);
  };

  const { authdetails } = props;
  if (!authdetails.uid) return <Redirect to="/" />;

  return (
    <div>
      <nav className="tasknavbar">
        <div className="taskbarback">
          <Link to="/">
            <div id="backbtn">
              <IoArrowBackOutline id="back" />
            </div>
          </Link>
        </div>
        <div>
          <h1 className="taskbarh1">Add New Task</h1>
        </div>
      </nav>
      {newlistbox && <Newlist func={newlistcheck} />}
      <div className="tasksdatabox">
        <form onSubmit={handlesubmit} id="formid">
          <label id="label">What is to be done?</label>
          <input
            placeholder="Enter Task Here"
            type="text"
            value={task}
            onChange={(e) => settask(e.target.value)}
            id="inptask"
            required
          />
          <label id="label">Due date</label>
          <div id="datebox">
            <div>
              <DatePicker
                required
                selected={date}
                dateFormat="dd/MM/y"
                onChange={(dat) => {
                  setdate(dat);
                }}
                placeholderText="Date not set"
                className="datepick"
                showYearDropdown
                scrollableYearDropdown
                minDetail="decade"
                isClearable
                open={focus}
                onClickOutside={() => setfocus(false)}
              />
            </div>
            <div>
              <div id="caldiv">
                <BsCalendar
                  id="calicon"
                  size="26px"
                  onClick={() => setfocus(true)}
                />
              </div>
            </div>
          </div>
          <label id="label">Due time</label>
          <input
            id="timeinp"
            type="time"
            placeholder="enter"
            isClearable
            value={time}
            onChange={(e) => settime(e.target.value)}
            required
          />
          <label id="label">Repeat</label>
          <select
            value={mode}
            onChange={(e) => setmode(e.target.value)}
            id="taskselect"
          >
            <option id="option" value="No Repeat">
              No Repeat
            </option>
            <option value="Once a Day">Once a Day</option>
            <option value="Once a Week">Once a Week</option>
            <option value="Once a Month">Once a Month</option>
            <option value="Once a Year">Once a Year</option>
            <option value="Once a Year">Other</option>
          </select>
          <label id="label">Add to List</label>
          <div id="datebox">
            <div>
              <select
                id="taskselect"
                value={list}
                onChange={(e) => setlist(e.target.value)}
              >
                <Alllisttypes type="create" />
              </select>
            </div>
            <div>
              <div id="caldiv">
                <RiMenuAddLine
                  id="calicon"
                  size="26px"
                  onClick={() => setnewlistbox(true)}
                />
              </div>
            </div>
          </div>
          <button id="submitbtn">
            <MdDone id="tick" />
          </button>
        </form>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    authdetails: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addtask: (task) => dispatch(addTask(task)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Create);
