import React from "react";
import { Link } from "react-router-dom";
import "./Colors.css";

function Colors({colors}) {
    const links = Object.keys(colors).map(color => (
        <Link key={color} to={`/colors/${color}`} >
            {color}
        </Link>
    ));

    return (
        <div className="Colors">
            <h2>Welcome to the color factory.</h2>
            <h1>
                <Link exact to="/colors/new">Add a color</Link>
            </h1>

            <div>
                <h3>Please select a color.</h3>
                <ul>{links}</ul>
            </div>
        </div>
    )

}

export default Colors;

