const express = require("express");
const cors = require("cors");
const db = require("./db/models");

const app = express();
app.use(cors());

app.listen(8000);
