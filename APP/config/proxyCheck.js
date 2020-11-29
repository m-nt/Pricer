const User = require("../models/User");

module.exports = (req, res, next) => {
    if (!req.body.RSA || !req.body.Name) {
        return res.status(404).send("Sorry! RSA or Name is required.")
    }
    User.findOne({ RSA: req.body.RSA })
        .then((user) => {
            if (!user) {
                return res.status(404).send("Sorry! we couldn't find any user with this RSA.")
            }
            next()
        })
}