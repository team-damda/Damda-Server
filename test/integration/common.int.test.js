const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const successMeta = require("../../modules/success-meta");
const errorMeta = require("../../modules/error-meta");
const { getHistory } = require("../../modules/test-modules");

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
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-COMMON-0001"].message,
                    data: {
                        nickname: "테스트",
                        history: getHistory(new Date()),
                        deposit: 10000000,
                        containStockAsset: 0,
                    },
                });
            })
            .expect(200, done);
    });
    it("user id 존재하지만 ContainStock에 데이터가 존재하지 않는 경우", function (done) {
        request(app)
            .get("/common/status")
            .query({ UserId: 2 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-COMMON-0001"].message,
                    data: {
                        nickname: "테스트",
                        history: getHistory(new Date()),
                        deposit: 10000000,
                        containStockAsset: 0,
                    },
                });
            })
            .expect(200, done);
    });
    it("user id 존재하지 않고 Deposits에 데이터가 존재하지 않는 경우", function (done) {
        request(app)
            .get("/common/status")
            .query({ UserId: 3 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 400,
                    success: false,
                    errorcode: "ERR-MAIN-0002-1",
                    message: errorMeta["ERR-MAIN-0002-1"].message,
                });
            })
            .expect(400, done);
    });
});
