const controller = require("../controllers/country");
const fs = require("fs");

async function isPostDataValid(req, res, next) {
  try {
    await controller.isPostDataValid(req.body);
    next();
  } catch (error) {
    // Delete Image from disk
    fs.unlink("images/" + req.file.filename, (err) => {
      if (err) {
        console.error(err);
        next(err);
      }
      next(error);
      //file removed
    });
  }
}

module.exports = { isPostDataValid };
