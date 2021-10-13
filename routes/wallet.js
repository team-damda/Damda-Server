var express = require("express");
var router = express.Router();

const walletController = require("../rest-controllers/wallet-controller");

router.get("/transactions", walletController.readTransactions);

module.exports = router;
