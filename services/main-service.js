const { UserDeposit, ContainStock, StockInfo, User } = require("../models");
const statusCode = require("../modules/status-code");

function StatusError(stat, msg) {
    var err = new Error(msg);
    err.statusCode = stat;
    return err;
}

module.exports = {
    readMyStatus: async ({ UserId }) => {
        try {
            // ! mock model 사용 시(sequlize-mock) where, attributes로 데이터를 전혀 걸러주지 않음.
            // ! findOne 쓰고 모델에 인스턴스 여러 개 넣으면 배열로 데이터가 들어옴(모델에 인스턴스 한 개만 넣으면 객체로 들어옴)

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
                        throw StatusError(400, "no user id in users table");
                    }
                },
                function (error) {
                    throw error;
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
                        throw new Error("no uid matching in UserDeposit");
                    }
                },
                function (error) {
                    throw error;
                }
            );
            // containStockAsset 구하기
            // TODO 실시간으로 OneMinCharts와 조인 후 데이터 받아서 계산해야 함.
            await ContainStock.findAll({
                where: { uid: UserId },
                attributes: ["stockid", "avgprice", "totcnt"],
            }).then(
                function (datas) {
                    if (datas) {
                        const assetlist = datas.map((data) => data.dataValues);
                        answer.containStockAsset = assetlist.reduce(
                            (prev, { totcnt, avgprice }) =>
                                prev + totcnt * avgprice,
                            0
                        );
                    } else {
                        throw error(
                            statusCode.BAD_REQUEST,
                            "no instance in ContainStock which matches user id"
                        );
                    }
                },
                function (error) {
                    throw error;
                }
            );

            return answer;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
