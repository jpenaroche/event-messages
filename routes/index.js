var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/iframe", function (req, res, next) {
  res.render("iframe", { title: "Iframe" });
});

router.get("/data", function (req, res, next) {
  res.json({
    data: {
      url: "http://localhost:3000/iframe",
      token: "basic_token",
    },
  });
});

module.exports = router;
