const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`API Listening on port:${PORT}`));
