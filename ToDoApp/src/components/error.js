import React from "react";
import errorpic from "../styles/pics/errorpic.png";
import { Link } from "react-router-dom";

const error = () => {
  return (
    <div>
      <div id="loadmainbox">
        <div id="emptydiv">
          <img id="errorimage" src={errorpic} />
          <h2 id="emptymsg">OOP's</h2>
          <h2 id="emptymsg">This page doesn't exist</h2>
          <Link to="/">
            <div id="errorbtn">Go Back To Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default error;
