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

router.get("/colleges", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user.colleges);
  })
})

router.post("/user", (req, res) => {
  // req contains 3 attributes: user, attribute of user you want to change, and the val the attribute should be changed to
  User.findById(req.body.id_num).then((user) => {
    user.name = req.body.new_name;
    user.save();
  })
});

router.post("/addCollege", (req, res) => {
  // req contains 3 attributes: user, attribute of user you want to change, and the val the attribute should be changed to
  User.findById(req.body.id_num).then((user) => {
    user.colleges.push (req.body.new_college);
    user.college_type.push (req.body.type);
    user.app_deadlines.push (req.body.deadline);
    user.decision_dates.push (req.body.ddate);
    if (req.body.main==='Y'){
      user.main_essays.push (true);
    }
    else{
      user.main_essays.push (false);
    }
    user.num_supps.push (req.body.nsupps);
    user.recs.push (req.body.nrecs);
    if (req.body.std==='Y'){
      user.std_tests.push (true);
    }
    else{
      user.std_tests.push (false);
    }
    if (req.body.port==='Y'){
      user.portfolio.push (true);
    }
    else{
      user.portfolio.push (false);
    }
    user.submitted.push (false); //default is false
    user.save();
  })
});

// name: String,
// googleid: String,
// colleges: [String],
// college_type: [String],
// app_deadlines: [String],
// decision_dates: [String],
// main_essays: [Boolean],
// num_supps: [Number],
// portfolio: [Boolean],
// recs: [Number],
// std_tests: [Boolean],
// submitted: [Boolean]

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
