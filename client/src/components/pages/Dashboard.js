import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import { get, post } from "../../utilities";


const Dashboard = (props) => {

  const handleHome = () => {
    navigate("/");
  }
  const handleAddCollege = () => {
    navigate("/AddCollege");
  }
  const handleProfile= () => {
    navigate("/Profile");
  }

  return (
    <div>
      <nav className="header"> 
          <font>
            <strong>{props.userIdentity}'s Dashboard             </strong>
            <button onClick={handleAddCollege} className="button-54"> Add College </button>
            <button onClick={handleProfile} className="button-54"> Your Profile </button>
            <button onClick={handleHome} className="button-54"> Home Page </button>

          </font>
          </nav>
    </div>
  )
}

export default Dashboard;