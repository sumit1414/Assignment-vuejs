const express = require("express");
const router = express.Router();

const countryController = require("../controllers/country");
const { upload, readData } = require("../middlewares/upload");
const countryMiddleware = require("../middlewares/country");

// Countries route.
router.get("/countries", async function (req, res, next) {
  try {
    const data = await countryController.getCountries();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// Get Country by id route.
router.get("/country/:countryID", async function (req, res) {
  try {
    const data = await countryController.getCountry(req.params["countryID"]);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

// Save Country route.
router.post(
  "/country",
  upload.single("flag"),
  countryMiddleware.isPostDataValid,
  async function (req, res, next) {
    try {
      const payload = {
        ...req.body,
        flag: "images/" + req.file.filename,
      };
      const data = await countryController.addCountry(payload);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);

// Get Continents route.
router.get("/continents", async function (req, res) {
  try {
    const data = await countryController.getContinents();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
