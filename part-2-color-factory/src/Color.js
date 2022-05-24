import React from "react";
import { Link } from "react-router-dom";

const Color = ({ hex, color, history }) => {

    if (!hex) {
        history.push("/colors");
    }

    return (

        <div style={{ backgroundColor: hex }}>
        <h1>This is {color}.</h1>
        <h1>Isn't it beautiful?</h1>
        <h3>
            <Link to="/">Go Back</Link>
        </h3>
        </div>

    );

}

export default Color;