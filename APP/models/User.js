const mongoose = require('mongoose')
const date = require('./Date')
const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    KEY: {
        type: String,
        required: true,
    },
    Date: {
        type: Array,
        default: date.Update(),
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User