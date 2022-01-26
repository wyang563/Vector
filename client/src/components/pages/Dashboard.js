import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import { get, post } from "../../utilities";
import "./Dashboard.css";


const Dashboard = (props) => {
  const [deadlines, setDeadlines] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [types, setTypes] = useState([]);
  const handleHome = () => {
    navigate("/");
  }
  const handleAddCollege = () => {
    navigate("/AddCollege");
  }
  const handleProfile= () => {
    navigate("/Profile");
  }
  if (!props.userId){
    return (
      <>
        <p>Please login before using Vector</p>
        <button onClick={handleHome}>Homepage</button>
      </>
    )
  }
  else{
    get("/api/user", {userid: props.userId}).then((user) => {
      setColleges(user.colleges);
      setDeadlines(user.app_deadlines);
      setDecisions(user.decision_dates); 
      setTypes(user.college_type);
    })
    let tableItemsList = [];
    tableItemsList.push(
      <thead>
        <colgroup className="dashBoardheader"></colgroup>
        <tr>
          <th>College</th>
          <th>App Deadline</th>
          <th>Decision Date</th>
          <th>Essay Status</th>
          <th>Recs</th>
          <th>Submitted</th>
          <th>Final Decision</th>
        </tr>
      </thead>
    )
    for (var i=0; i<colleges.length; i++){
      
    }

    return (
    
      <div>
        <nav className="header"> 
          <font>
            <strong>Welcome back {props.userIdentity}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleAddCollege} className="button-54"> Add College </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleProfile} className="button-54"> Your Profile </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleHome} className="button-54"> Home Page </button>

          </font>
          </nav>
          <table className="table">
            {tableItemsList}
          </table>

    </div>
  )

  }

}

export default Dashboard;