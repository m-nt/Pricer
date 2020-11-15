const mongoose = require("mongoose");

const dataschema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  corrent: {
    type: String,
  },
  date: {
    type: String,
  },
  corrent_time: {
    type: String,
  },
});

const data = mongoose.model("data", dataschema, "Currency");

module.exports = data;
