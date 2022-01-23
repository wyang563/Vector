import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import { get, post } from "../../utilities";
import "./Profile.css";


const Profile = (props) => {

  const [deadlines, setDeadlines] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [decisions, setDecisions] = useState([]);

  const handleHome = () => {
    navigate("/");
  }
  const handleAdd = () => {
    navigate("/AddCollege");
  }



  let deadlinesList = [];
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
    useEffect(() => {
      get("/api/user", {userid: props.userId}).then((user) => {
        setColleges(user.colleges);
        setDeadlines(user.app_deadlines);
        setDecisions(user.decision_dates); 
      })
    }, [])

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
          </div>
        )
      }

    }
    else{
      deadlinesList = <div>No App Deadlines or Decisions!</div>
    }

    return (
      // Welcome back {props.userIdentity}
      // <button  onClick={handleAdd}>Add a College</button>

      <>
     {props.userId ? (
        <div>
          <nav className="header"> 
          <font>
            <strong>Welcome back {props.userIdentity}</strong>
            <Link to="/AddCollege">
              Add College
            </Link>
          </font>
          </nav>
          <div className="grid">
            <div className="grid-item item-1"> <h1>Colleges List </h1>{deadlinesList}</div>
            <div className="grid-item item-2">Bar</div>
            <div className="grid-item item-3">Baz</div>
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