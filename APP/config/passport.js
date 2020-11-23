const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require("../models/User")

function UsernameAuth(passport) {
    passport.use(new LocalStrategy({ usernameField: "Username" }, (Username, Password, done) => {
        User.findOne({ Username: Username }).then((user) => {
            if (!user) {
                return done(null, false, { massage: "Username or Password is not correct !" })
            }
            bcrypt.compare(Password, user.Password, (err, IsMatch) => {
                if (err) throw err;
                if (IsMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { massage: "Username or Password is not correct !" })
                }

            })
        })
            .catch((err) => console.log(err));
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });
    }))
}
function EmailAuth(passport) {
    passport.use(new LocalStrategy({ usernameField: "Email" }, (Email, Password, done) => {
        User.findOne({ Email: Email }).then((user) => {
            if (!user) {
                return done(null, false, { massage: "Email or Password is not correct !" })
            }
            bcrypt.compare(Password, user.Password, (err, IsMatch) => {
                if (err) throw err;
                if (IsMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, { massage: "Email or Password is not correct !" })
                }

            })
        })
            .catch((err) => console.log(err));
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });
    }))
}
module.exports = { UsernameAuth: UsernameAuth, EmailAuth: EmailAuth }