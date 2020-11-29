const express = require("express");
const Jdate = require("jalali-date");
const router = express.Router();
const jdate = new Jdate();
const Time = require("../models/time");

const { Currency, Gold } = require("../models/data");

//${jdate.date[0]}/${jdate.date[1]}/${jdate.date[2]}

router.get("/Currency", (req, res) => {
  Currency.find({ "date": { "$gt": Time.update([0, 0, 0, 0, 1, 0]) } })
    .then((_data) => {
      res.json(_data.slice(0, 5));
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.get("/Gold", (req, res) => {
  Gold.find({ "date": { "$gt": Time.update([0, 0, 0, 0, 1, 0]) } })
    .then((_data) => {
      res.json(_data.slice(0, 3));
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});
module.exports = router;
