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
const Story = require("./models/story");
const Comment = require("./models/comment");
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socket = require("./server-socket");

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({}).then((stories) => res.send(stories));
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory
    .save()
    .then((story) => User.findOne({ _id: req.user._id }))
    .then((user) => {
      user.last_post = req.body.content;
      user.save();
    });
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then(() => res.send({}));
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/initsocket", auth.authenticateSocket);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/chat", (req, res) => {
  console.log(`Received a chat message: ${req.body.message}`);
  console.log(req.body.recipient);
  const chatdata = {
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  };
  if (req.body.recipient._id == "ALL_CHAT") {
    socket.getIo().emit("chat", chatdata);
  } else {
    const recipientSocketID = socket.getSocketFromUserID(req.body.recipient._id);
    socket
      .getIo()
      .to(recipientSocketID)
      .emit("chat", chatdata);
    const senderSocketID = socket.getSocketFromUserID(req.user._id);
    socket
      .getIo()
      .to(senderSocketID)
      .emit("chat", chatdata);
  }
});

router.get("/activeUsers", (req, res) => {
  res.send(socket.getAllConnectedUsers());
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;