const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapasync")
const passport = require('passport')

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      let user = new User({
        email: email,
        username: username,
        cartData: cart,
      });
      await new Promise((resolve, reject) => {
        User.register(user, password, (err, registeredUser) => {
          if (err) {
            reject(err); // Reject promise with error
          } else {
            resolve(registeredUser);
            req.login(registeredUser, (err) => {
              if (err) {
                res.status(400).json("something went wrong")
              } else {
                res.json({ success: true });
              }
            });
          }
        });
      })
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      // Handle failed login attempt
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // If authentication is successful, send success response
      return res.json({ success: true });
    });
  })(req, res, next);
});




router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({
        success: false,
        message: "not logout",
      });
    } else {
      res.json({
        success: true,
        message: "logout",
      });
    }
  });
});

module.exports = router;
