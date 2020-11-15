const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

//MongoDB URL
const URL = require("../conf.json").MongoUsersURL;
const Options = require("../conf.json").MongoOptions;

//mongose connection
mongose
  .connect(URL, Options)
  .then(() => console.log(`mongoose conected to Data Base...`))
  .catch((err) => console.log(err));

//EJS engine setup
app.use(expressLayout);
app.set("view engine", "ejs");
app.use(express.static("./public"));

//Routes set up
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

app.listen(PORT, console.log(`app listening on port:${PORT}`));
