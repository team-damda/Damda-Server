const statusCodeMeta = require("../modules/status-code-meta");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

module.exports = {
    readTransactions: async (req, res) => {
        try {
            console.log("[REST] wallet/transactions");
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
                        viewType: 1,
                        transDayDate: "21/05/06(수)",
                        transDayProfitLoss: -5000,
                        transDayType: 1,
                    },
                    {
                        viewType: 0,
                        marketType: "코스닥",
                        stockId: "JFDSJFIEJ343JIN",
                        stockName: "에스케이아이테크놀로지",
                        currentPrice: 3000,
                        transType: "매도",
                        transPrice: 5000,
                        transAmount: 3,
                        transTime: "13:45",
                        transProfitLoss: 2000,
                        transProfitLtransProfitLossRateoss: 20.0,
                    },
                    // {
                    //     viewType: 0,
                    //     marketType: "코스피",
                    //     stockId: "SDKFHDKSHFLSHEE",
                    //     stockName: "삼성증권",
                    //     currentPrice: 5000,
                    //     transType: "매수",
                    //     transPrice: 4000,
                    //     transAmount: 2,
                    //     transTime: "13:56",
                    // },
                    {
                        viewType: 1,
                        transDayDate: "21/05/30(토)",
                        transDayProfitLoss: -5000,
                        transDayType: 1,
                    },
                    {
                        viewType: 0,
                        marketType: "코스닥",
                        stockId: "JFDSJFIEJ343JIN",
                        stockName: "에스케이아이테크놀로지",
                        currentPrice: 3000,
                        transType: "매도",
                        transPrice: 5000,
                        transAmount: 3,
                        transTime: "14:45",
                        transProfitLoss: 2000,
                        transProfitLossRate: 20.0,
                    },
                    // {
                    //     viewType: 0,
                    //     marketType: "코스피",
                    //     stockId: "SDKFHDKSHFLSHEE",
                    //     stockName: "삼성증권",
                    //     currentPrice: 5000,
                    //     transType: "매수",
                    //     transPrice: 4000,
                    //     transAmount: 2,
                    //     transTime: "14:50",
                    // },
                    // {
                    //     viewType: 1,
                    //     transDayDate: "21/05/30(토)",
                    //     transDayProfitLoss: -5000,
                    //     transDayType: 0,
                    // },
                    // {
                    //     viewType: 0,
                    //     marketType: "코스닥",
                    //     stockId: "SDKFHDKSHFLSHEE",
                    //     stockName: "삼성3",
                    //     currentPrice: 5000,
                    //     transType: "매수",
                    //     transPrice: 4000,
                    //     transAmount: 2,
                    //     transTime: "14:50",
                    // },
                ];
                const data2 = [];
                res.status(statusCodeMeta.OK).send(
                    responseBody.successData(
                        statusCodeMeta.OK,
                        UserId === "1" ? data1 : data2,
                        successMeta["SUC-WALLET-0001"].message
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
