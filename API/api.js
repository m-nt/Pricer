const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Extract port from process environment or manually set
const PORT = process.env.PORT || 5000;

//MongoDB URL
const URL = require("../conf.json").MongoDataURL;
const Options = require("../conf.json").MongoOptions;

//mongose connection
mongoose
  .connect(URL, Options)
  .then(() => console.log(`mongoose conected to Data Base...`))
  .catch((err) => console.log(err));

app.use("/free", require("./routes/free"));
app.use("/", require("./routes/nonFree"));

app.listen(PORT, console.log(`API Listening on port:${PORT}`));
