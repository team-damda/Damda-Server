var express = require("express");
const graphController = require("../rest-controllers/graph-controller");
var router = express.Router();

router.post("/buying", graphController.buyingStock);

module.exports = router;
