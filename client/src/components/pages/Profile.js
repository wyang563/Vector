import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../utilities";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    document.title = "News Feed";
    get("/api/user").then((userObj) => {
      setUseInfo(userObj);
    });
  }, []);
  return (
    <div>
      <p>Really advanced web design</p>
    </div>
  );
};

export default Profile;
