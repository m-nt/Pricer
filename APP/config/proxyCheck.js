const User = require("../models/User");

module.exports = (req, res, next) => {
    if (!req.body.KEY) {
        return res.status(404).send("Sorry! User unique key is required.")
    }
    User.findOne({ RSA: req.body.KEY })
        .then((user) => {
            if (!user) {
                return res.status(404).send("Sorry! we couldn't find any user with this KEY.")
            }
            next()
        })
}