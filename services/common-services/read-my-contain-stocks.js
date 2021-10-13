const { ContainStock, StockInfo, OneMinChart } = require("../../models");
const statusCodeMeta = require("../../modules/status-code-meta");
const errorMeta = require("../../modules/error-meta");
const CustomError = require("../../modules/custom-error");

const {
    getYesterdayNextMin,
    getYesterdayThisMin,
} = require("../../modules/service-modules");

const { Op } = require("sequelize");

module.exports = async ({ UserId }) => {
    /*
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
    */
    try {
        let answer = [];
        // stockId 구하기: ContainStock
        await ContainStock.findAll({
            where: { uid: UserId },
            attributes: ["stockId", "totCnt", "avgPrice"],
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    answer = datas.map((data) => data.dataValues);
                } else {
                    // 보유 종목 없는 경우
                    return [];
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );
        // marketType, stockName 구하기: StockInfo
        await StockInfo.findAll({
            attributes: ["stockId", "marketType", "stockName"],
            where: {
                stockId: {
                    [Op.in]: answer.map((stock) => stock.stockId),
                },
            },
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    temp = datas.map((data) => data.dataValues);
                    answer = answer.map((a) => {
                        const { marketType, stockName } = temp.filter(
                            (t) => t.stockId === a.stockId
                        )[0];
                        return { ...a, marketType, stockName };
                    });
                } else {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        errorMeta
                    );
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );

        // currentPrice 구하기
        await OneMinChart.findAll({
            attributes: ["stockId", "currentPrice"],
            where: {
                [Op.and]: [
                    {
                        stockId: {
                            [Op.in]: answer.map((stock) => stock.stockId),
                        },
                    },
                    {
                        time: {
                            [Op.and]: [
                                {
                                    [Op.gte]: getYesterdayThisMin(),
                                },
                                {
                                    [Op.lt]: getYesterdayNextMin(),
                                },
                            ],
                        },
                    },
                ],
            },
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    const temp = datas.map((data) => data.dataValues);
                    answer = answer.map((a) => {
                        const { currentPrice } = temp.filter(
                            (t) => t.stockId === a.stockId
                        )[0];
                        const totProfitLoss =
                            (currentPrice - a.avgPrice) * a.totCnt;
                        const totProfitLossRate =
                            (100 * (currentPrice - a.avgPrice)) / a.avgPrice;
                        const { marketType, stockId, stockName, totCnt } = a;
                        return {
                            marketType,
                            stockId,
                            stockName,
                            totCnt,
                            totProfitLoss,
                            totProfitLossRate,
                            currentPrice,
                        };
                    });
                } else {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        errorMeta
                    );
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0004-1",
                    errorMeta
                );
            }
        );
        return answer;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
