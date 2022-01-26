import React, { Component, useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Skeleton.css";
import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "400347907603-e5992vs3iq7e7jes7t4h9874f43ps9e1.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {

  const [userIdentity, setIdentity] = useState(undefined);

  const profileClick = () => {
    navigate("/Profile");
  }
  const dashboardClick = () => {
    navigate("/dashboard");
  }

  get("/api/whoami").then((user) => {
    if (user._id) {
      setIdentity(user.name);
      // const body = {id_num: user._id, new_name: "penis"}
      // post("/api/user", body);
    }
  });
  
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="center">
        <h1>Vector</h1>
        <h2>College App Planning Done Smart</h2>
        {userId ? (
          <div>
            <h2>Welcome back {userIdentity}!</h2>
            <br></br>
            <button className="button-54" onClick={profileClick}>Your Profile</button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="button-54" onClick={dashboardClick}>Your Dashboard</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogout}
              onFailure={(err) => console.log(err)}
            />
          </div>
        ) : (
      <div>
        <h2>Log-in/signup below</h2> 
         <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      </div>
      )}
      </div>
    </div>
  );
};

export default Skeleton;