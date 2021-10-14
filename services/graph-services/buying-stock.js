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
                const { avgPrice, totCnt } = data.dataValues;
                oldAvgPrice = avgPrice;
                oldTotCnt = totCnt;
            },
            function (error) {
                throw CustomError(
                    statusCodeMeta.DB_ERROR,
                    "ERR-MAIN-0001-2",
                    errorMeta
                );
            }
        );
        console.log(oldAvgPrice, oldTotCnt);
        await ContainStock.update(
            {
                avgPrice:
                    oldAvgPrice * oldTotCnt +
                    (curPrice * curCnt) / (curCnt + oldTotCnt),
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
    } catch (error) {
        console.error(error);
        throw error;
    }
};
