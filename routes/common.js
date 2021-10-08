var express = require("express");
var router = express.Router();

const commonController = require("../rest-controllers/common-controller");

// [GET] 보유 종목: 시장구분, 종목코드, 종목명, 가격, 보유량, 평가손익:(현재가-평단가)*보유량,수익률: 100*(현재가-평단가)/평단가}]
router.get("/holdingStocks", commonController.readHoldingStocks);

module.exports = router;
