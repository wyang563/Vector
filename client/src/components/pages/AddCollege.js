import React, { Component, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";
import "./Profile.css";

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

  var arr = null;

  const handleSubmit = e => {
    e.preventDefault();
    const body = {
      id_num: userId_Num,
      new_college: nameEl.current.value
    }
    console.log (nameEl.current.value)
    post("/api/addCollege", body);
  };

  return (
    <>
     {userId ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameEl} />
            <button type="submit" className="myButton">Submit</button>
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