const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const bodyParser = require("body-parser");
const path = require("path");
const categoryRoutes = require("./routes/categories");
const ingredientRoutes = require("./routes/ingredients");
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

const run = async () => {
  try {
    // await db.sequelize.sync();
    await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
