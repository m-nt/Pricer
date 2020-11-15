const express = require("express");
const Jdate = require("jalali-date");
const router = express.Router();
const jdate = new Jdate();
const Time = require("../models/time");
const time = new Time(true, true);

const data = require("../models/data");
//${jdate.date[0]}/${jdate.date[1]}/${jdate.date[2]}
router.get("/", (req, res) => {
  time.update();
  console.log(time.Ftime);
  data
    .find({
      date: `${jdate.date[0]}/${jdate.date[1]}/${jdate.date[2]}`,
      corrent_time: {
        $regex: `^${time.Ftime}`,
      },
    })
    .then((_data) => res.send(_data.slice(0, 5)))
    .catch((err) => console.log(err));
});

module.exports = router;
