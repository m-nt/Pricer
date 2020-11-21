const express = require("express");
const Jdate = require("jalali-date");
const router = express.Router();
const jdate = new Jdate();

const { Currency, Gold } = require("../models/data");

router.get("/", (req, res) => {
  freedata = Gold.findOne({ date: `${jdate.date[0]}/${jdate.date[1]}/${jdate.date[2]}` })
    .then((data => {
      res.send(data);
    }))
    .catch(err => {
      console.log(err);
      res.sendStatus(404)
    });

});

module.exports = router;
