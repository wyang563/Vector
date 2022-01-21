import React, { Component, useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Skeleton.css";
import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "400347907603-e5992vs3iq7e7jes7t4h9874f43ps9e1.apps.googleusercontent.com";

const Skeleton = ({ handleLogin, handleLogout, userId, userIdentity }) => {

  const profileClick = () => {
    navigate("/Profile");
  }

  
  return (
    <>
      <h1>Vector</h1>
      <h2>College App Planning Done Smart</h2>
      {userId ? (
        <div>
          <h2>Welcome back {userIdentity}!</h2>
          <br></br>
          <button onClick={profileClick}>View Your Profile</button>
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
          <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
        <h2>Login/Signup Above</h2>
        </div>
      )}
      
    </>
  );
};

export default Skeleton;
