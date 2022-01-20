import React, { Component, useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Skeleton.css";
import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {

  const [userIdentity, setIdentity] = useState(undefined);

  const profileClick = () => {
    navigate("/Profile");
  }

  get("/api/whoami").then((user) => {
    if (user._id) {
      setIdentity(user.name);
      const body = {id_num: user._id, new_name: "penis"}
      post("/api/user", body);
    }
  });

  
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
