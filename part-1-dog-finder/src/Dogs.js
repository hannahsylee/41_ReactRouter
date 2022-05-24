import React from "react";
import { Link } from "react-router-dom";

function Dogs({ dogs }) {
  return (
    <div>
      {dogs.map(dog => (
        <div key={dog.name}>
            <img
                src={dog.src}
                alt={dog.name}
            />
            <h2>
                <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
            </h2>
        </div>
      ))}
    </div>
  );
}

export default Dogs;