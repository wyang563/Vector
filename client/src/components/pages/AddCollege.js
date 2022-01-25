import React, { Component, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";

import "./AddCollege.css";

// TODO: route back to homepage upon submission


const AddCollege = ({userId}) => {

  const [userName, setName] = useState(undefined);
  const [userId_Num, setId_Num] = useState (undefined);
  const [userColleges, setColleges] = useState(undefined);
  const [userDeadlines, setDeadlines] = useState(undefined);
  const [userDdates, setDdates] = useState(undefined);
  const [userMain, setMain] = useState(undefined);
  const [userNsupps, setNsupps] = useState(undefined);
  const [userRecs, setRecs] = useState(undefined);
  const [userStd, setStd] = useState(undefined);
  const [userPortfolio, setPortfolio] = useState(undefined);
  const [userSubmit, setSubmit] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
    if (user._id) { // getting the current information about the user
    //will append new info to the end of each relevant array
      setId_Num (user._id);
      setName (user.name);
      setColleges (user.colleges);
      setDeadlines (user.app_deadlines);
      setDdates (user.decision_dates);
      setMain (user.main_essays);
      setNsupps (user.num_supps);
      setRecs (user.recs);
      setStd (user.std_tests);
      setPortfolio (user.Portfolio);
      setSubmit (user.submitted);
    }
  });

  }, [])

  const nameEl = React.useRef(null);
  const typeEl = React.useRef (null);
  const deadlineEl = React.useRef(null);
  const ddateEl = React.useRef(null);
  const mainEl = React.useRef(null);
  const nsuppsEl = React.useRef(null);
  const nrecsEl = React.useRef(null);
  const stdEl = React.useRef(null);
  const porEl = React.useRef(null);


  var arr = null;

  const handleSubmit = e => {
    e.preventDefault();
    const body = {
      id_num: userId_Num,
      new_college: nameEl.current.value,
      type: typeEl.current.value,
      deadline: deadlineEl.current.value,
      ddate: ddateEl.current.value,
      main: mainEl.current.value,
      nsupps: nsuppsEl.current.value,
      nrecs: nrecsEl.current.value,
      std: stdEl.current.value,
      port: porEl.current.value
    }
    post("/api/addCollege", body).then(navigate("/Profile"));
    // potentially refresh the profile page when routed back
  };

  return (
    <>
     {userId ? (
        <div>
          <form className={"form-style-1", "center"} onSubmit={handleSubmit}>
            <br></br>
            <font className="buttin-54" font size="+2"> <strong> Add a new college to apply to: </strong></font>
            <br></br>
            <br></br>
            <br></br>
            <input type="text" placeholder="College" size="50" ref={nameEl} />
            <br></br>
            <br></br>
            <input type="checkbox" value="Reach Target Safety" placeholder="Pick College Type" size="50" ref={typeEl}/>
            <br></br>
            <br></br>
            <input type="text" placeholder="Application Deadline (MM/DD/YY)" size="50" ref={deadlineEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="Decision Date (MM/DD/YY)" size="50" ref={ddateEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="Main essay required? ('Y' or 'N')" size="50" ref={mainEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="# of supplements?" size="50" ref={nsuppsEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="# of rec letters?" size="50" ref={nrecsEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="Standardized test(s) required? ('Y' or 'N')" size="50" ref={stdEl} />
            <br></br>
            <br></br>
            <input type="text" placeholder="Portfolio submission allowed? ('Y' or 'N')" size="50" ref={porEl} />
            <br></br>
            <br></br>
            <br></br>
            <button type="submit" className="button-54">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Please return to main and sign up / login first</p>
        </div>
      )}
    </>
  )

}

export default AddCollege;