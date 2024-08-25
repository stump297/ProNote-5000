const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const fs = require("fs");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(api);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
