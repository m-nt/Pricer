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
    type: Array,
  },

});

const dataCurrency = mongoose.model("Currency", dataschema, "Currency");
const dataGold = mongoose.model("Gold", dataschema, "Gold");
module.exports = { Currency: dataCurrency, Gold: dataGold };
