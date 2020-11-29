const express = require("express");
const router = express.Router();
const Time = require("../models/time")

const { Currency, Gold } = require("../models/data");

router.post("/query", (req, res) => {
  if (req.body.Currency) {
    q = { "name": req.body.Currency, "date": datec(req) }
    Currency.find(q, { "_id": 0 })
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.send(err)
        console.log(err);
      })
  } else if (req.body.Gold) {
    q = { "name": req.body.Gold, "date": datec(req) }
    Gold.find(q, { "_id": 0 })
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.send(err)
        console.log(err);
      })
  } else {
    q = { "name": "USD", "date": { "$gte": Time.update([0, 0, 0, 0, 1, 0]), "$lt": Time.update() } }
    Currency.find(q, { "_id": 0 })
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.send(err)
        console.log(err);
      })
  }

});
function datec(req) {
  if (req.body.date) {
    obj = JSON.parse(req.body.date)
    sec = [...obj.date]
    sec[4] -= 1
    return { "$gte": sec, "$lt": obj.date }
  } else if (req.body.between) {
    obj = JSON.parse(req.body.between)
    return { "$gte": obj.date1, "$lt": obj.date2 }
  } else {
    return { "$gte": Time.update([0, 0, 0, 0, 1, 0]), "$lt": Time.update([0, 0, 0, 0, 0, 0]) }
  }
}
module.exports = router;
