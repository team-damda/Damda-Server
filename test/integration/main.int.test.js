const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const successMeta = require("../../modules/success-meta");
const errorMeta = require("../../modules/error-meta");

beforeAll(async () => {
    await sequelize.sync();
});

describe("GET /common/status", function () {
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/common/status")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-COMMON-0001"].message,
                    data: {
                        nickname: "테스트",
                        history: 73,
                        deposit: 1000000,
                        containStockAsset: 25000,
                    },
                });
            })
            .expect(200, done);
    });
    //     it("user id 존재하지만 ContainStock에 데이터가 존재하지 않는 경우", function (done) {
    //         request(app)
    //             .get("/common/status")
    //             .query({ UserId: 2 })
    //             .set("Accept", "application/json")
    //             .expect((res) => {
    //                 // console.log(res.body);
    //                 expect(res.body).toStrictEqual({
    //                     status: 200,
    //                     success: true,
    //                     message: successMeta["SUC-COMMON-0001"].message,
    //                     data: {
    //                         nickname: "테스트2",
    //                         history: 65,
    //                         deposit: 1200000,
    //                         containStockAsset: 0,
    //                     },
    //                 });
    //             })
    //             .expect(200, done);
    //     });
    //     it("user id 존재하지만 Deposits에 데이터가 존재하지 않는 경우", function (done) {
    //         request(app)
    //             .get("/common/status")
    //             .query({ UserId: 3 })
    //             .set("Accept", "application/json")
    //             .expect((res) => {
    //                 // console.log(res.body);
    //                 expect(res.body).toStrictEqual({
    //                     status: 400,
    //                     success: false,
    //                     errorcode: "ERR-MAIN-0002-1",
    //                     message: errorMeta["ERR-MAIN-0002-1"].message,
    //                 });
    //             })
    //             .expect(400, done);
    //     });
});

describe("GET /main/interestStocks", function () {
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/main/interestStocks")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-MAIN-0002"].message,
                    data: [
                        {
                            stockId: "AA",
                            marketType: "코스피",
                            stockName: "밤새는거극혐",
                            todayChange: -1000,
                            todayRoC: -16.666666666666668,
                            currentPrice: 5000,
                        },
                        {
                            stockId: "BB",
                            marketType: "코스닥",
                            stockName: "라이언",
                            todayChange: 1000,
                            todayRoC: 25,
                            currentPrice: 5000,
                        },
                    ],
                });
            })
            .expect(200, done);
    });
});
