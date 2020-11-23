const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get("/lgrg", (req, res) => {
  res.render("loginRegister");
});
router.get("/purchase", (req, res) => {
  res.render("purchase");
});
router.post("/register", (req, res) => {
  const { Username, Email, Password, CPassword } = req.body
  const errors = []
  const warning = []
  const strength = 0
  if (!Username || !Email || !Password || !CPassword) {
    errors.push({ massage: "please fill in all the required fields !" })
  }
  if (Password != CPassword) {
    errors.push({ massage: "Passwords doesn't match !" })
  }
  if (mlen(/[A-Z]./gmi, Password) > 0) {
    strength++
  }
  if (mlen(/[a-z]./gmi, Password) > 0) {
    strength++
  }
  if (mlen(/[0-9]./gmi, Password) > 0) {
    strength++
  }
  if (mlen(/\W./gmi, Password) > 0) {
    strength++
  }
  switch (strength) {
    case 0:
      errors.push({ massage: "Passwords Please :|" })
      break;
    case 1:
      errors.push({ massage: "Passwords is too weak !" })
      break;
    case 2:
      errors.push({ massage: "User numbers,symbols and etc for stronger password !" })
      break;
    case 3:
      warning.push({ massage: "Passwords is accepable !" })
      break;
    case 4:
      warning.push({ massage: "Great, Strong Passwords !" })
      break;
  }
  if (error.length > 0) {
    res.render("loginRegister", {
      errors,
      Username,
      Email,
      Password,
      CPassword
    })
  } else {
    User.findOne({ Email: Email }).then((user) => {
      if (user) {
        errors.push({ massage: "Email is already registered, try log in" })
        res.render("register", {
          errors,
          Username,
          Email,
          Password,
          CPassword,
        });
      } else {
        const NewUser = new User({
          Username,
          Email,
          Password,
          RSA
        })
        bcrypt.genSalt(15)
          .then((salt) => {
            bcrypt.hash(NewUser.Password, salt).then((hash) => {
              NewUser.Password = hash
              bcrypt.hash(NewUser.Password + NewUser.Email + NewUser.Username, salt).then((hash) => {
                NewUser.RSA = hash
              })
              NewUser.save().then((user) => {
                res.redirect("/users/lgrg?msg:register successful");
              })

            })
          })
          .catch((err) => console.log(err))
      }
    })
  }
})
function mlen(regex, text) {
  return text.match(regex).length
}
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
  })(req, res, next);
});
module.exports = router;
