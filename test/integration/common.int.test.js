const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const successMeta = require("../../modules/success-meta");
const errorMeta = require("../../modules/error-meta");

beforeAll(async () => {
    await sequelize.sync();
});

describe("GET /common/containStocks", function () {
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/common/holdingStocks")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-COMMON-0001"].message,
                    data: [
                        {
                            currentPrice: 5000,
                            marketType: "코스피",
                            stockId: "AA",
                            stockName: "밤새는거극혐",
                            totCnt: 2,
                            totProfitLoss: 8000,
                            totProfitLossRate: 400,
                        },
                        {
                            currentPrice: 5000,
                            marketType: "코스닥",
                            stockId: "BB",
                            stockName: "라이언",
                            totCnt: 3,
                            totProfitLoss: 9000,
                            totProfitLossRate: 150,
                        },
                    ],
                });
            })
            .expect(200, done);
    });
});
