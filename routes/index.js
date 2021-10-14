var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/* Add router */
router.use("/main", require("./main"));
router.use("/common", require("./common"));
router.use("/wallet", require("./wallet"));
router.use("/graph", require("./graph"));

module.exports = router;
