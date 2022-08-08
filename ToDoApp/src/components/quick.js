import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/quick.css";
import { MdDone } from "react-icons/md";
import { addTask } from "../actions/allactions";

function Quick(props) {
  const [task, settask] = useState("");
  const [activeinp, setactiveinp] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    const newtask = {
      task,
      date: null,
      time: null,
      check: false,
      list: "Default",
      mode: "No Repeat",
    };

    props.addtask(newtask);
    setactiveinp(false);
    settask("");
    document.getElementById("quickinput").style.width = "100%";
    document.getElementById("quickinput").style.marginLeft = "23px";
  };

  return (
    <div className="quickdiv">
      <div className="quickdivinput">
        <input
          placeholder="Enter Quick Task Here"
          id="quickinput"
          type="text"
          value={task}
          onChange={(e) => {
            if (e.target.value !== "") {
              settask(e.target.value);
              setactiveinp(true);
              document.getElementById("quickinput").style.width = "95%";
              document.getElementById("quickinput").style.marginLeft = "10px";
            } else {
              settask(e.target.value);
              setactiveinp(false);
              document.getElementById("quickinput").style.width = "100%";
              document.getElementById("quickinput").style.marginLeft = "23px";
            }
          }}
          required
        />
      </div>
      {activeinp && (
        <div className="quickdivadd">
          <MdDone className="addbtnquick" onClick={(e) => handlesubmit(e)} />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addtask: (task) => dispatch(addTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(Quick);
