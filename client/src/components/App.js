import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import AddCollege from "./pages/AddCollege.js";
import { navigate } from "@reach/router";
import Dashboard from "./pages/Dashboard.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userIdentity, setUserIdentity] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserIdentity (user.name);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} userIdentity={userIdentity} />
        <Profile path="/Profile" 
        userId={userId} 
        userIdentity={userIdentity}
        />
        <AddCollege path="/AddCollege" userId={userId}/>
        <Dashboard path="/dashboard" userId={userId} userIdentity={userIdentity}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;