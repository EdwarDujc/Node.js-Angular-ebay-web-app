const express = require("express");
var cors = require("cors");

const app = express();
app.listen(8000, () => {
  console.log("Server Started!");
});

app.use(cors());
