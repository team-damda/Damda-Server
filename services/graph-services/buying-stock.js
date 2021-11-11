const {
    ContainStock,
    StockInfo,
    OneMinChart,
    UserDeposit,
    BuyStock,
} = require("../../models");
const statusCodeMeta = require("../../modules/status-code-meta");
const errorMeta = require("../../modules/error-meta");
const CustomError = require("../../modules/custom-error");

const {
    getYesterdayNextMin,
    getYesterdayThisMin,
} = require("../../modules/service-modules");

const { Op } = require("sequelize");

module.exports = async ({ UserId, stockId, curCnt, curPrice }) => {
    try {
        // 1. UserDeposits(uid) UPDATE
        let old_deposit = 0;
        await UserDeposit.findOne({
            where: { uid: UserId },
            attributes: ["deposit"],
        }).then(
            (data) => {
                old_deposit = data.dataValues.deposit;
            },
            (error) => {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );
        console.log(old_deposit);
        await UserDeposit.update(
            { deposit: old_deposit - curPrice * curCnt },
            {
                where: { uid: UserId },
            }
        ).then(
            function (data) {
                // console.log(data);
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );
        // 2. BuyStocks(uid, stockid) INSERT

        await BuyStock.create({
            stockId: stockId,
            uid: UserId,
            price: curPrice,
            cnt: curCnt,
            totPrice: curPrice * curCnt,
        }).then(
            function (data) {
                console.log(data);
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );

        // 3. ContainStocks(uid, stockid) UPDATE
        let oldAvgPrice, oldTotCnt;
        await ContainStock.findOne({
            where: {
                [Op.and]: [{ uid: UserId }, { stockId: stockId }],
            },
        }).then(
            function (data) {
                if (data) {
                    const { avgPrice, totCnt } = data.dataValues;
                    oldAvgPrice = avgPrice;
                    oldTotCnt = totCnt;
                } else {
                    // 기존에 안 가지고 있던 주식의 경우
                    oldAvgPrice = 0;
                    oldTotCnt = 0;
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
        if (oldTotCnt == 0 && oldAvgPrice == 0) {
            // 기존에 해당 종목으로 주식을 산 적이 없는 경우
            console.log("기존에 해당 종목으로 주식을 산 적이 없는 경우");
            await ContainStock.create({
                uid: UserId,
                stockId,
                totCnt: curCnt,
                avgPrice: curPrice,
            }).then(
                function (data) {
                    console.log(data);
                },
                function (error) {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        errorMeta
                    );
                }
            );
        } else {
            console.log(oldAvgPrice, oldTotCnt);
            await ContainStock.update(
                {
                    avgPrice:
                        (oldAvgPrice * oldTotCnt + curPrice * curCnt) /
                        (curCnt + oldTotCnt),
                    totCnt: oldTotCnt + curCnt,
                },
                { where: { [Op.and]: [{ uid: UserId }, { stockId: stockId }] } }
            ).then(
                function (data) {
                    console.log(data);
                },
                function (error) {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0001-2",
                        errorMeta
                    );
                }
            );
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
