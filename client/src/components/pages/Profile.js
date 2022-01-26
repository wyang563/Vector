import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import { get, post } from "../../utilities";
import "./Profile.css";


const Profile = (props) => {

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
  const handleDashboard = () => {
    navigate("/dashboard");
  }

  const handleDelete = (index) => {
    
  }



  let deadlinesList = [];
  let decisionsList = [];
  let hasStuff = null;

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

    if (colleges == null){
      hasStuff = false;
    }
    else{
      hasStuff = true;
    }

    var bigList = [];

    if (hasStuff){
      for (var j=0; j<colleges.length; j++){
        var temp = [deadlines[j], decisions[j], colleges[j]];
        console.log(temp);
        bigList.push(temp);
      }

      bigList.sort(function(x, y) {
        if (Date.parse(x[0])-Date.parse(y[0]) < 0){
          return -1;
        }
        else if (Date.parse(x[0])-Date.parse(y[0])>0){
          return 1;
        }
        else{
          return 0;
        }
      });
      for (var i=0; i<colleges.length; i++){
        deadlinesList.push(
          <div>
            <h2>{bigList[i][2]}</h2>
            <h3>App Deadline: {bigList[i][0]}</h3>
            <h3>Decision Date: {bigList[i][1]}</h3>
            <hr></hr>
          </div>
        )
      }
    }
    else{
      deadlinesList = <div>No App Deadlines or Decisions!</div>
    }
    var reaches = 0;
    var targets = 0;
    var safeties = 0;
    for (var i=0; i<types.length; i++){
      if (types[i] == 'R') reaches++;
      else if (types[i] == 'T') targets++;
      else safeties++;
    }

    return (
      // Welcome back {props.userIdentity}
      // <button  onClick={handleAdd}>Add a College</button>

      <>
     {props.userId ? (
        <div>
          <nav className="header"> 
          <font>
            <strong>Welcome back {props.userIdentity}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleAddCollege} className="button-54"> Add College </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleDashboard} className="button-54"> Your Dashboard </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleHome} className="button-54"> Home Page </button>

          </font>
          </nav>
          <div className="grid">
            <div className="grid-item item-1">
              <h1>Profile Info</h1> 
              <h2>Name: {props.userIdentity}</h2>
              <h2>Number of Applications: {deadlinesList.length}</h2>
              <h2>Number of Reaches: {reaches}</h2>
              <h2>Number of Targets: {targets}</h2>
              <h2>Number of Safeties: {safeties}</h2>
            </div>
            <div className="grid-item item-2">
            </div>
            <div className="grid-item item-3"> 
            <h1>Dates: </h1>
            <hr></hr>
            {deadlinesList}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please return to main and sign up</p>
        </div>
      )}
    </>
      // <div>
      //   <h1>{props.userIdentity}'s Planner</h1>
      //   {deadlinesList}
      //   <button onClick={handleAdd}>Add a College</button>
      // </div>
    )
  }
}


export default Profile;