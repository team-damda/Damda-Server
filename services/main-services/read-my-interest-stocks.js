const {
    UserDeposit,
    ContainStock,
    InterestStock,
    StockInfo,
    OneMinChart,
    User,
} = require("../../models");
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
        data: [{
				marketType: "A",
				stockId: "SJSJKDNKD", 
				stockName: "삼성증권", 
				currentPrice: 50000,
				TodayChange: 2000,
					// 시가대비
				TodayRoC:100*(현재가-당일시작가격)/당일시작가격}
					// Today Rate of Change: 등락률
		}, ...]
    */
    try {
        let answer = [];
        // stockId 구하기: InterestStock
        await InterestStock.findAll({
            where: { uid: UserId },
            attributes: ["stockId"],
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    answer = datas.map((data) => data.dataValues);
                    console.log(answer);
                } else {
                    // 관심 종목 없는 경우
                    return [];
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    error.message || ""
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
                    answer = datas.map((data) => data.dataValues);
                    console.log(
                        "marketType, stockName 구하기: StockInfo",
                        answer
                    );
                } else {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        error.message || ""
                    );
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    error.message || ""
                );
            }
        );

        // currentPrice, TodayChange, TodayRoC 구하기
        await OneMinChart.findAll({
            attributes: ["stockId", "currentPrice", "startPrice"],
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
                        const { currentPrice, startPrice } = temp.filter(
                            (t) => t.stockId === a.stockId
                        )[0];
                        const todayChange = currentPrice - startPrice;
                        const todayRoC =
                            (100 * (currentPrice - startPrice)) / startPrice;
                        return { ...a, todayChange, todayRoC, currentPrice };
                    });
                    console.log(answer);
                } else {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        error.message || ""
                    );
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0004-1",
                    error.message || ""
                );
            }
        );
        return answer;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
