var express = require("express");
var router = express.Router();

const mainController = require("../rest-controllers/main-controller");

// [GET] 캐릭터 컴포넌트: 예수금, 보유 주식 자금, 몇일차, 닉네임
router.get("/interestStocks", mainController.readInterestStocks);

module.exports = router;
