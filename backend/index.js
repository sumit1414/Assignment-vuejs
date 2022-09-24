const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const countrRoutes = require("./routes/country");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", countrRoutes);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(400).send({
    message: err,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
