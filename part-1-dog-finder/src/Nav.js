import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css"

function Nav({ dogs }) {
    const links = dogs.map(dog => (
        <NavLink key={dog.name} to={`/dogs/${dog.name.toLowerCase()}`} >
            {dog.name}
        </NavLink>
    ));

    return (
        <div className="Nav">
            <NavLink exact to="/dogs">Home</NavLink>
            {links}
        </div>
        // <ul>
        //     {/* <li><Link to="/dogs">Home</Link></li> */}
        //     {dogs.map(dog => (
        //         <li key={dog.name}>
        //         <Link to={`/dogs/${dog.name}`}>{dog.name}</Link>
        //         </li>
        //     ))}
        // </ul>
    );
}
// end

export default Nav;
