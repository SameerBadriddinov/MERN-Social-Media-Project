const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
const login = require("../middleware/login");

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "All fields should be completed" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "This emasil is already exists" });
    }

    bcrypt.hash(password, 10).then((hashedPass) => {
      const user = new User({
        email,
        name,
        password: hashedPass,
        pic,
      });
      user
        .save()
        .then((user) => {
          res.json({ msg: "successfully signed in" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(422)
      .json({ error: "Please, fill in email and password fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Password or Email wrong" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({msg: "successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token: token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Password wrong" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
