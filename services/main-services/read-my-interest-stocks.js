const { UserDeposit, ContainStock, StockInfo, User } = require("../../models");
const statusCodeMeta = require("../../modules/status-code-meta");
const errorMeta = require("../../modules/error-meta");
const CustomError = require("../../modules/custom-error");

module.exports = async ({ UserId }) => {
    /*
        data: [{
				marketType: "A",
				stockId: 1, 
				stockName: "삼성증권", 
				currentPrice: 50000,
				TodayChange: 2000,
					// 시가대비
				TodayRoC:100*(현재가-당일시작가격)/당일시작가격}
					// Today Rate of Change: 등락률
		}, ...]
    */
    try {
        const answer = {};
        // nickname, history 구하기
        await User.findOne({
            where: { id: UserId },
            attributes: ["nickname", "createdAt"],
        }).then(
            function (data) {
                if (data) {
                    const { nickname, createdAt } = data;
                    const userCreatedTime = new Date(createdAt).getTime();
                    const today = new Date().getTime();
                    const history_ms = today - userCreatedTime;
                    const history =
                        Math.floor(history_ms / (1000 * 60 * 60 * 24)) + 1;

                    answer.nickname = nickname;
                    answer.history = history;
                } else {
                    throw CustomError(
                        statusCodeMeta.BAD_REQUEST,
                        "ERR-MAIN-0001-1",
                        errorMeta
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
        // deposit 구하기
        await UserDeposit.findOne({
            where: { uid: UserId },
            attributes: ["deposit"],
        }).then(
            function (data) {
                if (data) {
                    const { deposit } = data;
                    answer.deposit = deposit;
                } else {
                    throw CustomError(
                        statusCodeMeta.BAD_REQUEST,
                        "ERR-MAIN-0002-1",
                        errorMeta
                    );
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-DB-0002-2",
                    error.message || ""
                );
            }
        );
        // containStockAsset 구하기
        // TODO 실시간으로 OneMinCharts와 조인 후 데이터 받아서 계산해야 함.
        await ContainStock.findAll({
            where: { uid: UserId },
            attributes: ["stockId", "avgPrice", "totCnt"],
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    const assetlist = datas.map((data) => data.dataValues);
                    answer.containStockAsset = assetlist.reduce(
                        (prev, { totCnt, avgPrice }) =>
                            prev + totCnt * avgPrice,
                        0
                    );
                } else {
                    answer.containStockAsset = 0;
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-DB-0003-1",
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
