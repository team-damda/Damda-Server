const {
    UserDeposit,
    ContainStock,
    StockInfo,
    User,
    OneMinChart,
} = require("../../models");
const statusCodeMeta = require("../../modules/status-code-meta");
const errorMeta = require("../../modules/error-meta");
const CustomError = require("../../modules/custom-error");
const {
    getYesterdayNextMin,
    getYesterdayThisMin,
} = require("../../modules/service-modules");

const {Op} = require("sequelize");
const {UserDepositRepository} = require("../../repositories");

module.exports = async ({UserId}) => {
    try {
        const answer = {};
        // nickname, history 구하기
        await User.findOne({
            where: {id: UserId},
            attributes: ["nickname", "createdAt"],
        }).then(
            function (data) {
                if (data) {
                    const {nickname, createdAt} = data;
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
        // * repository 적용
        await UserDepositRepository.getByUserId({
            UserId,
        }).then(
            (data) => {
                const {deposit} = data;
                answer.deposit = deposit;
            },
            (error) => {
                throw error;
            }
        );

        // containStockAsset 구하기 (1)
        // ContainStock의 stockId, totCnt로 보유 종목들 종목코드와 수량 구하기
        var containStockList = [];
        await ContainStock.findAll({
            where: {uid: UserId},
            attributes: ["stockId", "totCnt"],
        }).then(
            function (datas) {
                if (datas.length > 0) {
                    containStockList = datas.map((data) => data.dataValues);
                } else {
                    answer.containStockAsset = 0;
                }
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0003-1",
                    error.message || ""
                );
            }
        );
        // containStockAsset 구하기 (2)
        // OneMinCharts와 조인 후 데이터 받아서 계산하기
        // console.log(getYesterdayNextMin(), getYesterdayThisMin());
        await OneMinChart.findAll({
            attributes: ["stockId", "currentPrice"],
            where: {
                [Op.and]: [
                    {
                        stockId: {
                            [Op.in]: containStockList.map(
                                (stock) => stock.stockId
                            ),
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
                    answer.containStockAsset = temp.reduce(
                        (prev, {stockId, currentPrice}) => {
                            const {totCnt} = containStockList.filter(
                                (s) => s.stockId === stockId
                            )[0];
                            return prev + totCnt * currentPrice;
                        },
                        0
                    );
                } else {
                    answer.containStockAsset = 0;
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
