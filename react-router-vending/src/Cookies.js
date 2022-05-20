import React from "react";
import { Link } from "react-router-dom";

function Cookies() {
  return (
    <div>
      <h1>Did someone say cookies?!</h1>
      <img
        src="https://c.tenor.com/Px4lboKQYbYAAAAC/champagne-barbie-cookie-monster.gif"
        alt="Cookie Monster."
      />
      <h2><Link to="/">Go Back.</Link></h2>
    </div>
  );
}

export default Cookies;