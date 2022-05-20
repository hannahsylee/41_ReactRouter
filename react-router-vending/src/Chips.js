import React from "react";
import {  Link  } from "react-router-dom";

function Chips() {
  return (
    <div>
      <h1>So many flavors of Lays!</h1>
      <img
        src="https://c.tenor.com/Bc64OLZg7rYAAAAC/lays-chips-potato-chips.gif"
        alt="Different flavors of Lays"
      />
      <h2><Link to="/">Go Back.</Link></h2>
    </div>
  );
}

export default Chips;