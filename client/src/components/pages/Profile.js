import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
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
    navigate("/AddColleges");
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
        //setDeadlines(user.app_deadlines);
        //setDecisions(user.decision_dates); 
      })
    }, [])
    if (colleges == null){
      hasStuff = false;
    }
    else{
      hasStuff = true;
    }
    if (hasStuff){
      for (var i=0; i<colleges.length; i++){
        deadlinesList.push(
          <div>
            <h1>{colleges[i]}</h1>
            <h2>App Deadline: NA</h2>
          </div>
        )
      }
      // for (var i=0; i<user.app_deadlines.length; i++){
      //   deadlinesList.push (<Deadlines 
      //     college={user.colleges[i]}
      //     deadline={user.app_deadlines[i]}
      //     post_type="App Deadline!"
      //     />
      //   );
      //   deadlinesList.push(<Deadlines 
      //     college={user.colleges[i]}
      //     deadline={user.decision_dates[i]}
      //     post_type="Decision Date!"
      //   />)
      // }
    }
    else{
      deadlinesList = <div>No App Deadlines or Decisions!</div>
    }

    return (
      <>
     {props.userId ? (
        <div>
          <nav className="header"> Welcome back {props.userIdentity}</nav>
          <button onClick={handleAdd}>Add a College</button>
          <div className="grid">
            <div className="grid-item item-1">{deadlinesList}</div>
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