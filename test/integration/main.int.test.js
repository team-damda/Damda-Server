const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const successMeta = require("../../modules/success-meta");
const errorMeta = require("../../modules/error-meta");

beforeAll(async () => {
    await sequelize.sync({});
});

describe("GET /main/status", function () {
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/main/status")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-MAIN-0001"],
                    data: {
                        nickname: "테스트",
                        history: 17,
                        deposit: 1000000,
                        containStockAsset: 8000,
                    },
                });
            })
            .expect(200, done);
    });
    it("user id 존재하지만 ContainStock에 데이터가 존재하지 않는 경우", function (done) {
        request(app)
            .get("/main/status")
            .query({ UserId: 2 })
            .set("Accept", "application/json")
            .expect((res) => {
                console.log(res.body);
                expect(res.body).toStrictEqual({
                    status: 200,
                    success: true,
                    message: successMeta["SUC-MAIN-0001"],
                    data: {
                        nickname: "테스트2",
                        history: 17,
                        deposit: 1200000,
                        containStockAsset: 0,
                    },
                });
            })
            .expect(200, done);
    });
});
