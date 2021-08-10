const { UserDeposit, ContainStock, StockInfo, User } = require("../models");

module.exports = {
    readMyStatus: async ({ UserId }) => {
        try {
            // ? 왜 맞는 데이터 못 찾아도 throw error 안함?
            // .then이랑 .catch 활용해야 함.
            // deposit 구하기
            const { deposit } = await UserDeposit.findOne({
                where: { uid: UserId },
                attribute: {
                    include: ["deposit"],
                },
            });
            // containStockAsset 구하기
            const containStockDatas = await ContainStock.findAll({
                where: { uid: UserId },
                attribute: {
                    include: ["stockid, avgprice"],
                },
            });
            const containStockAsset = containStockDatas.reduce(
                (prev, { totcnt, avgprice }) => prev + totcnt * avgprice,
                0
            );
            // nickname 구하기
            const { nickname, createdAt } = await User.findOne({
                where: { id: UserId },
                attribute: {
                    include: ["nickname", "createdAt"],
                },
            });
            // history 구하기
            const userCreatedTime = new Date(createdAt).getTime();
            const today = new Date().getTime();
            const history_ms = today - userCreatedTime;
            const history = Math.floor(history_ms / (1000 * 60 * 60 * 24)) + 1;

            return {
                deposit,
                containStockAsset,
                nickname,
                history,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
