const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");

app.get("/", (req, res) => {
  res.json({ message: "This is a training API Services." });
});

require("./app/routes/passengers.routes")(app);

app.listen(8287, () => {
  console.log("App Server is running");
});