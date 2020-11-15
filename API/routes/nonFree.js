const express = require("express");
const Jdate = require("jalali-date");
const router = express.Router();
const jdate = new Jdate();

const data = require("../models/data");

router.get("/", (req, res) => {
  freedata = data.findOne({ data: `${jdate[0]}/${jdate[1]}/${jdate[2]}` });
  res.send(freedata);
});

module.exports = router;
