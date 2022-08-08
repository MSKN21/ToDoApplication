import React, { useState, useEffect } from "react";
import emptypic1 from "../styles/pics/emptypic1.png";

const Empty = (props) => {
  const { name } = props;
  const [namecheck, setnamecheck] = useState(true);
  useEffect(() => {
    if (name === "notsearch") setnamecheck(true);
    else setnamecheck(false);
  });
  return (
    <div>
      <div id="emptydiv">
        <img id="emptyimage" src={emptypic1} />
        {namecheck && <h2 id="emptymsg">Your Task's List is Empty</h2>}
        {!namecheck && (
          <h2 id="emptymsg">Task You are searching is not there</h2>
        )}
      </div>
    </div>
  );
};

export default Empty;
