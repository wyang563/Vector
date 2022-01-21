import React, { Component, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";
import "./Profile.css";


const Profile = () => {

  const [userName, setName] = useState(undefined);
  const [userId, setId] = useState(undefined);

  get("/api/whoami").then((user) => {
    if (user._id) {
      setName (user.name);
      setId (user._id);
    }
  });

  return (
    <>
     {userId ? (
        <div>
          <nav className="header"> Welcome back {userName}</nav>
          <div className="grid">
            <div className="grid-item item-1">Foo</div>
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
  )

}


export default Profile;
