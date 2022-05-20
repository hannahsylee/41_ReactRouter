import React from "react";
import { Link } from "react-router-dom";
import VendingMachineImg from "./VendingMachine.png";

function VendingMachine() {
  return (
    <div 
      className="VendingMachine"
      style={{  backgroundImage: `url(${VendingMachineImg})`  }}>
      <h1>Hello I am a vending machine. What would you like to eat?</h1>
      <h2><Link to="/soda">soda</Link></h2>
      <h2><Link to="/chips">chips</Link></h2>
      <h2><Link to="/cookies">cookies</Link></h2>
    </div>
  );
}

export default VendingMachine;