/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const user = require("./models/user");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  })
})

router.post("/user", (req, res) => {
  // req contains 3 attributes: user, attribute of user you want to change, and the val the attribute should be changed to
  User.findById(req.body.id_num).then((user) => {
    user.name = req.body.new_name;
    user.save();
  })
  
  // const newUser = new User({
  //   name: req.name,
  //   googleid: req.googleid,
  //   colleges: req.colleges,
  //   college_type: req.college_type,
  //   app_deadlines: req.app_deadlines,
  //   decision_dates: req.decision_dates,
  //   main_essays: req.main_essays,
  //   num_supps: req.num_supps,
  //   portfolio: req.portfolio,
  //   recs: req.recs,
  //   std_tests: req.std_tests
  // })
  // newUser.save();
});

router.post("/addCollege", (req, res) => {
  // req contains 3 attributes: user, attribute of user you want to change, and the val the attribute should be changed to
  User.findById(req.body.id_num).then((user) => {
    user.colleges.push(req.body.new_college);
    user.save();
  })
});

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
