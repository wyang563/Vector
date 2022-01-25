import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

const Deadlines = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    document.title = "News Feed";
    get("/api/user").then((userObj) => {
      setUser(userObj);
    });
  }, []);

  //let colleges = user.colleges;
  //let app_deadlines = user.app_deadlines;
  let colleges = ["MIT", "Harvard", "Stanford"];
  let app_deadlines = ["1/5", "2/6", "3/7"];
  let collegesList = null;
  const hasColleges = colleges.length !== 0;

  function createTable(tableArr) {
    //input 2D array to create an HTML table
    //create a Table Object
    let table = document.createElement("table");
    //iterate over every array(row) within tableArr
    for (let row of tableArr) {
      //Insert a new row element into the table element
      table.insertRow();
      //Iterate over every index(cell) in each array(row)
      for (let cell of row) {
        //While iterating over the index(cell)
        //insert a cell into the table element
        let newCell = table.rows[table.rows.length - 1].insertCell();
        //add text to the created cell element
        newCell.textContent = cell;
      }
    }
    //append the compiled table to the DOM
    document.body.appendChild(table);
  }
  if (hasColleges) {
    collegesList = colleges.map((user) => createTable([colleges, app_deadlines]));
  } else {
    collegesList = <div>No stories!</div>;
  }
  return <>{collegesList}</>;
};

export default Deadlines;
