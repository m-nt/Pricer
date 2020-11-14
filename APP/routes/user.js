const express = require("express");
const router = express.Router();

router.get("/lgrg", (req, res) => {
  res.render("loginRegister");
});
router.get("/purchase", (req, res) => {
  res.render("purchase");
});
module.exports = router;
