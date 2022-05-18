const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const successMeta = require("../../modules/success-meta");
const errorMeta = require("../../modules/error-meta");

beforeAll(async () => {
    await sequelize.sync();
});

describe("GET /wallet/transactions", function () {
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/wallet/transactions")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-WALLET-0001"].message,
                    data: [
                        {
                            viewType: 1,
                            transDayDate: "2021/8/2",
                            transDayProfitLoss: 15000,
                            transDayType: 2,
                        },
                        {
                            viewType: 0,
                            transTime: "19:30",
                            stockId: "AAAA",
                            transType: "매수",
                            transPrice: 2000,
                            transAmount: 3,
                            marketType: "KOSPI",
                            stockName: "에이회사",
                        },
                        {
                            viewType: 0,
                            transTime: "19:30",
                            stockId: "BBBB",
                            transType: "매수",
                            transPrice: 4000,
                            transAmount: 2,
                            marketType: "KOSPI",
                            stockName: "비회사",
                        },
                        {
                            viewType: 0,
                            transTime: "19:30",
                            stockId: "DDDD",
                            transType: "매도",
                            transPrice: 2000,
                            transAmount: 3,
                            marketType: "KOSPI",
                            stockName: "디회사",
                        },
                        {
                            viewType: 0,
                            transTime: "21:32",
                            stockId: "EEEE",
                            transType: "매도",
                            transPrice: 3000,
                            transAmount: 3,
                            marketType: "KOSPI",
                            stockName: "이회사",
                        },
                        {
                            viewType: 0,
                            transTime: "23:30",
                            stockId: "CCCC",
                            transType: "매수",
                            transPrice: 4000,
                            transAmount: 5,
                            marketType: "KOSPI",
                            stockName: "씨회사",
                        },
                        {
                            viewType: 1,
                            transDayDate: "2021/8/3",
                            transDayProfitLoss: 0,
                            transDayType: 0,
                        },
                        {
                            viewType: 0,
                            transTime: "20:30",
                            stockId: "AAAA",
                            transType: "매수",
                            transPrice: 4000,
                            transAmount: 2,
                            marketType: "KOSPI",
                            stockName: "에이회사",
                        },
                        {
                            viewType: 1,
                            transDayDate: "2021/9/2",
                            transDayProfitLoss: 20000,
                            transDayType: 1,
                        },
                        {
                            viewType: 0,
                            transTime: "21:32",
                            stockId: "FFFF",
                            transType: "매도",
                            transPrice: 3000,
                            transAmount: 4,
                            marketType: "KOSPI",
                            stockName: "에프회사",
                        },
                    ],
                });
            })
            .expect(200, done);
    });
});
