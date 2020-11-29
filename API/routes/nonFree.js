const express = require("express");
const Jdate = require("jalali-date");
const router = express.Router();
const jdate = new Jdate();

const { Currency, Gold } = require("../models/data");

router.get("/query", (req, res) => {
  switch (req.body.name) {
    case "currency":

      break;
    case "gold":

      break;
    default:
      break;
  }

});

module.exports = router;
