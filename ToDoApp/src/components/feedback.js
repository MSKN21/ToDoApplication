import React, { useState } from "react";
import "../styles/feedback.css";
import { AiFillStar } from "react-icons/ai";
import { feedbackform } from "../actions/allactions";
import { connect } from "react-redux";

const Feedback = (props) => {
  const [comment, setcomment] = useState(null);
  const [starcheck, setstarcheck] = useState(false);
  const [starcnt, setstarcnt] = useState(0);

  const countselected = (num) => {
    for (let i = 1; i <= num; i++) {
      document.getElementById(`str${i}`).style.color = "yellow";
    }
    for (let i = num + 1; i <= 5; i++) {
      document.getElementById(`str${i}`).style.color = "rgb(255, 255, 255)";
    }
    document.getElementById("starinfo").innerText = `Your rating: ${num}/5`;
    setstarcnt(num);
  };

  const hideit = () => {
    setstarcheck(false);
  };

  const feedbacksubmit = (e) => {
    e.preventDefault();
    if (starcnt !== 0) {
      const feedback = { comment, rating: starcnt };
      props.fdfrm(feedback);
      props.func(false);
      // console.log(feedback);
    } else {
      setstarcheck(true);
      setTimeout(hideit, 2000);
    }
  };

  return (
    <div className="newlistbox">
      <form onSubmit={(e) => feedbacksubmit(e)} className="fdbkform">
        <label id="fdbkhead">We'd Love some feedback</label>
        <textarea
          onChange={(e) => setcomment(e.target.value)}
          placeholder="Enter Your Comments"
          id="fdbkinp"
          required
        />
        <div id="starhead">Rate our app</div>
        <div id="starbox">
          <AiFillStar
            onClick={() => countselected(1)}
            className="stars"
            id="str1"
          />
          <AiFillStar
            onClick={() => countselected(2)}
            className="stars"
            id="str2"
          />
          <AiFillStar
            onClick={() => countselected(3)}
            className="stars"
            id="str3"
          />
          <AiFillStar
            onClick={() => countselected(4)}
            className="stars"
            id="str4"
          />
          <AiFillStar
            onClick={() => countselected(5)}
            className="stars"
            id="str5"
          />
          <div id="starinfo"></div>
        </div>
        {starcheck && <div id="starerrmsg">Give rating u want</div>}
        <div className="fdbkbtns">
          <div>
            <button className="fdbkaddbtn">SUBMIT</button>
          </div>
          <div>
            <p onClick={() => props.func(false)} className="fdbkcancelbtn">
              CANCEL
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fdfrm: (fdbk) => dispatch(feedbackform(fdbk)),
  };
};

export default connect(null, mapDispatchToProps)(Feedback);
