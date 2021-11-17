const { StockInfo, OneMinChart, BuyStock, SellStock } = require("../../models");
const statusCodeMeta = require("../../modules/status-code-meta");
const errorMeta = require("../../modules/error-meta");
const CustomError = require("../../modules/custom-error");
const {
    getYesterdayNextMin,
    getYesterdayThisMin,
    getOverlapRemovedList,
    getTheDate,
    getTheTime,
} = require("../../modules/service-modules");

const { Op } = require("sequelize");

module.exports = async ({ UserId }) => {
    // TODO error 던지는 것 각 상황에 맞게 처리하기
    try {
        const answer = [];
        const days = {};
        /*
            days = {"date":{ids: [{transTime, BUY, id}], transDayProfitLoss, transDayType}}
            <매수의 경우>
            {   marketType: StockInfo, 
                stockId: BuyStock, 
                stockName: StockInfo, 
                currentPrice: OneMinChart, 
                transType: BuyStock, 
                transPrice: BuyStock,
                transAmount: BuyStock, 
                transTime: BuyStock, 
            },
            <매도의 경우>
            {   marketType: StockInfo, 
                stockId: SelllStock, 
                stockName: StockInfo, 
                currentPrice: OneMinChart, 
                transType: SellStock, 
                transPrice: SellStock,
                transAmount: SellStock, 
                transTime: SellStock, 
                transProfitLoss: SellStock, 
                transProfitLossRate: SellStock},

        */
        //* 1. findAll로 buyStock에서 userid로 buyStockList 구하기
        let buyStockList = [];
        await BuyStock.findAll({
            where: { uid: UserId },
            attributes: ["stockId", "cnt", "price", "totPrice", "createdAt"],
        })
            .then(
                function (datas) {
                    if (datas.length > 0) {
                        buyStockList = datas.map((data) => data.dataValues);
                        buyStockList.forEach((item, idx) => {
                            const d = new Date(item.createdAt);
                            const thatDate = getTheDate(d);
                            if (days[thatDate]) {
                                // 이미 존재하는 경우
                                days[thatDate].ids.push({
                                    // TODO 타임 로컬 값으로 가져와야 함...ㅠㅠ
                                    transTime: getTheTime(d),
                                    isBuy: true,
                                    id: idx,
                                });
                            } else {
                                // 이미 존재하지 않는 경우
                                days[thatDate] = {};
                                days[thatDate].ids = [
                                    {
                                        transTime: getTheTime(d),
                                        isBuy: true,
                                        id: idx,
                                    },
                                ];
                                days[thatDate].transDayProfitLoss = 0;
                                days[thatDate].transDayType = 0;
                            }
                        });
                        buyStockList = buyStockList.map((item) => ({
                            stockId: item.stockId,
                            transType: "매수",
                            transPrice: item.price,
                            transAmount: item.cnt,
                            // transTime은 여기서 추가 안하고 뒤에 days 건드릴 때 넣어주기
                        }));
                    } else {
                        // 매도한 적이 없는 유저임
                    }
                },
                function (error) {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0004-1",
                        errorMeta
                    );
                }
            )
            .catch((e) => {
                throw e;
            });
        //* 2. findAll로 sellStock에서 userid로 sellStockList 구하기
        let sellStockList = [];
        await SellStock.findAll({
            where: { uid: UserId },
            attributes: [
                "stockId",
                "cnt",
                "price",
                "totPrice",
                "createdAt",
                "valuationLoss",
            ],
        })
            .then(
                function (datas) {
                    if (datas.length > 0) {
                        sellStockList = datas.map((data) => data.dataValues);
                        sellStockList.forEach((item, idx) => {
                            const d = new Date(item.createdAt);
                            const thatDate = getTheDate(d);
                            if (days[thatDate]) {
                                // 이미 존재하는 경우
                                days[thatDate].ids.push({
                                    transTime: getTheTime(d),
                                    isBuy: false,
                                    id: idx,
                                });
                                // 이미 해당 날짜에 매도 내역 있으면 매도만타입 -> 매수매도타입으로 바꿔주기
                                if (days[thatDate].transDayType == 0) {
                                    days[thatDate].transDayType = 2;
                                }
                                days[thatDate].transDayProfitLoss +=
                                    item.valuationLoss * item.cnt;
                            } else {
                                // 이미 존재하지 않는 경우
                                days[thatDate] = {};
                                days[thatDate].ids = [
                                    {
                                        transTime: getTheTime(d),
                                        isBuy: false,
                                        id: idx,
                                    },
                                ];
                                days[thatDate].transDayProfitLoss =
                                    item.valuationLoss * item.cnt;
                                days[thatDate].transDayType = 1;
                            }
                        });
                        sellStockList = sellStockList.map((item) => ({
                            stockId: item.stockId,
                            transType: "매도",
                            transPrice: item.price,
                            transAmount: item.cnt,
                            // transTime, transDayProfitLoss은 여기서 안하고 뒤에 days 건드릴 때 넣어주기
                        }));
                    } else {
                        // 매수한 적이 없는 유저임
                    }
                },
                function (error) {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0004-1",
                        errorMeta
                    );
                }
            )
            .catch((e) => {
                throw e;
            });
        //* 3. marketType, stockName 구해서 sellStockList, buyStockList에 집어넣기
        // (1) buyStockList와 sellStockList의 stockid만 있는 중복 제거된 리스트
        let stockIdList = buyStockList
            .map((item) => item.stockId)
            .concat(sellStockList.map((item) => item.stockId));
        const overlapRemovedList = getOverlapRemovedList(stockIdList);

        await StockInfo.findAll({
            attributes: ["stockId", "marketType", "stockName"],
            where: {
                stockId: {
                    [Op.in]: overlapRemovedList,
                },
            },
        })
            .then(
                (datas) => {
                    if (datas.length > 0) {
                        const stockInfoList = datas.map(
                            (data) => data.dataValues
                        );
                        buyStockList = buyStockList.map((stock) => {
                            const stockInfo = stockInfoList.find(
                                (elem) => elem.stockId === stock.stockId
                            );
                            return {
                                ...stock,
                                marketType: stockInfo.marketType,
                                stockName: stockInfo.stockName,
                            };
                        });
                        sellStockList = sellStockList.map((stock) => {
                            // TODO 예외처리 만약 과거에 매도헀던 종목이 현재 StockInfo에 없다면..?
                            const stockInfo = stockInfoList.find(
                                (elem) => elem.stockId === stock.stockId
                            );
                            return {
                                ...stock,
                                marketType: stockInfo.marketType,
                                stockName: stockInfo.stockName,
                            };
                        });
                    } else {
                    }
                },
                (e) => {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0004-1",
                        errorMeta
                    );
                }
            )
            .catch((e) => {
                throw e;
            });

        // * 4. currentPrice OneMinChart에서 구하기
        await OneMinChart.findAll({
            attributes: ["stockId", "currentPrice"],
            where: {
                [Op.and]: [
                    {
                        stockId: {
                            [Op.in]: overlapRemovedList,
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
        })
            .then(
                (datas) => {
                    if (datas.length > 0) {
                        const curPriceList = datas.map(
                            (data) => data.dataValues
                        );
                        buyStockList = buyStockList.map((stock) => ({
                            ...stock,
                            currentPrice: curPriceList.find(
                                (elem) => elem.stockId === stock.stockId
                            ).currentPrice,
                        }));
                        sellStockList = sellStockList.map((stock) => ({
                            ...stock,
                            currentPrice: curPriceList.find(
                                (elem) => elem.stockId === stock.stockId
                            ).currentPrice,
                        }));
                    } else {
                        // 해당 데이터가 없는 경우
                    }
                },
                (e) => {
                    throw CustomError(
                        statusCodeMeta.DB_ERROR,
                        "ERR-MAIN-0004-1",
                        errorMeta
                    );
                }
            )
            .catch((e) => {
                throw e;
            });
        console.log(buyStockList);
        console.log(sellStockList);
        console.log(days);
        // * 5. days에서 ids transTime 기준으로 정렬 후 answer 형태로 재정리
        Object.keys(days).forEach((day, i) => {
            days[day].ids.sort((a, b) => {
                // (1) days에서 ids 배열을 transTime 기준으로 정렬
                const change2DecInt = (s) =>
                    // "19:30"의 형태 -> 1930 으로 해서 정렬 기준으로 써먹기
                    parseInt(s.transTime.split(":")[0]) * 100 +
                    parseInt(s.transTime.split(":")[1]);
                return change2DecInt(a) - change2DecInt(b);
            });
            // (2) 뷰타입 1인 day 형식 먼저 넣어주기
            answer.push({
                viewType: 1,
                transDayDate: day,
                transDayProfitLoss: days[day].transDayProfitLoss,
                transDayType: days[day].transDayType,
            });
            // (3) 뷰타입 0인 것들 넣어주기
            days[day].ids.forEach((elem) => {
                const stockInfo = elem.isBuy
                    ? buyStockList[elem.id]
                    : sellStockList[elem.id];
                answer.push({
                    viewType: 0,
                    transTime: elem.transTime,
                    ...stockInfo,
                });
            });
        });
        console.log(answer);
        return answer;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
