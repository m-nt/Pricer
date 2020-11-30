const express = require("express");
const proxy = require('express-http-proxy')
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();
const { ensureAuthenticated } = require('../config/Auth')

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
  let strength = 0
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
  if (errors.length > 0) {
    res.send({
      errors,
      Username,
      Email,
      Password,
      CPassword
    })
  } else {
    User.findOne({ $or: [{ Email: Email }, { Username: Username }] }).then((user) => {
      if (user) {
        errors.push({ massage: "Email or Username is already registered, try login" })
        res.send({
          errors,
          Username,
          Email,
          Password,
          CPassword,
        });
      } else {
        let KEY = ""
        const NewUser = new User({
          Username,
          Email,
          Password,
          KEY,
        })
        bcrypt.genSalt(15)
          .then((salt) => {
            bcrypt.hash(NewUser.Password, salt)
              .then((hash) => {
                NewUser.Password = hash
                bcrypt.genSalt(15)
                  .then((salt) => {
                    bcrypt.hash(NewUser.Email + NewUser.Username, salt)
                      .then((hash) => {
                        NewUser.KEY = hash
                        NewUser.save()
                          .then((user) => {
                            res.send({ redirect: "http://localhost:8080/users/lgrg?massage=register successfully done", warning: warning });
                          }).catch((err) => console.log(err))
                      }).catch((err) => console.log(err))
                  }).catch((err) => console.log(err))
              }).catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      }
    })
  }
})
function mlen(regex, text) {
  mach = text.match(regex)
  if (mach) {
    return mach.length
  } else {
    return 0
  }
}
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/lgrg?error=username or password is incorrect !",
    failureFlash: false,
  })(req, res, next);
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.post("/getKEY", ensureAuthenticated, (req, res) => {
  res.send({ KEY: req.user.KEY })
})
router.post("/getname", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.send({ name: req.user.Username })

  } else {
    res.status(404).send()
  }
})

module.exports = router;
