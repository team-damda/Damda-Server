const statusCodeMeta = require("../modules/status-code-meta");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

module.exports = {
    readHoldingStocks: async (req, res) => {
        try {
            console.log("common/holdingStocks");
            if (!req.query.UserId) {
                // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
                res.status(statusCodeMeta.BAD_REQUEST).send({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
                });
                return;
            }

            const { UserId } = req.query;
            if (UserId === "3") {
                res.status(statusCodeMeta.INTERNAL_SERVER_ERROR).send(
                    responseBody.fail(
                        statusCodeMeta.INTERNAL_SERVER_ERROR,
                        "NOT DEFINED",
                        ""
                    )
                );
            } else {
                const data1 = [
                    {
                        marketType: "KOSPI",
                        stockId: "1SNDNDJJFHUSISN",
                        stockName: "삼성증권",
                        currentPrice: 50000,
                        totCnt: 3,
                        totProfitLoss: (50000 - 60000) * 3,
                        // 평가손익:(현재가-평단가)*보유량,
                        totProfitLossRate: (100 * (50000 - 60000)) / 40000,
                        // todayChange: 2000,
                        // 시가대비
                        // todayRoC: (2000 / (50000 - 2000)) * 100,
                        // Today Rate of Change: 등락률
                    },
                ];
                const data2 = [];
                res.status(statusCodeMeta.OK).send(
                    responseBody.successData(
                        statusCodeMeta.OK,
                        UserId === "1" ? data1 : data2,
                        successMeta["SUC-MAIN-0002"].message
                    )
                );
            }
        } catch (error) {
            let { statusCode, errorCode, message } = error;
            res.status(statusCode || statusCodeMeta.INTERNAL_SERVER_ERROR).send(
                responseBody.fail(
                    statusCode || statusCodeMeta.INTERNAL_SERVER_ERROR,
                    errorCode || "NOT DEFINED",
                    message || ""
                )
            );
        }
    },
};
