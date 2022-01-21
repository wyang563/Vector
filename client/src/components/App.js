import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import AddColleges from "./pages/AddColleges.js";
import { navigate } from "@reach/router";

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
        setUserIdentity(user.name);
      }
    });
  }, []);

  // useEffect(() => {
  //   const query = { userid: userId};
  //   get("/api/user", query).then((userInfo) => {
  //     setUserIdentity(userInfo.name);
  //   })
  // })

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserIdentity(user.name);
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
        <AddColleges path="/AddColleges" userId={userId}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
