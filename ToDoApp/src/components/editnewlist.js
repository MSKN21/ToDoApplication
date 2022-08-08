import React from "react";
import "../styles/newlist.css";

const Editlistname = (props) => {
  return (
    <div className="newlistbox">
      <div className="listform">
        <label id="listhead">New List: </label>
        <input
          id="listinp"
          type="text"
          placeholder={props.name}
          onChange={(e) => props.namefunc(e.target.value)}
          required
        />
        <div className="listbtns">
          <div>
            <button onClick={() => props.editfunc()} className="addbtn">
              ADD
            </button>
          </div>
          <div>
            <div onClick={() => props.funccheck(false)} className="cancelbtn">
              CANCEL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editlistname;
