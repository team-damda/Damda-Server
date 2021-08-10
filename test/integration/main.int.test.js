const request = require("supertest");
const { sequelize } = require("../../models");
const app = require("../../app");
const responseMessage = require("../../modules/response-message");

beforeAll(async () => {
    await sequelize.sync({});
});

describe("GET /main/status", function () {
    it("user id query로 안 보내는 경우", function (done) {
        request(app)
            .get("/main/status")
            .query({})
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
                });
            })
            .expect(400, done);
    });
    it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
        request(app)
            .get("/main/status")
            .query({ UserId: 1 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    nickname: "테스트",
                    history: 9,
                    deposit: 1000000,
                    containStockAsset: 8000,
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
                    nickname: "테스트2",
                    history: 9,
                    deposit: 1200000,
                    containStockAsset: 0,
                });
            })
            .expect(200, done);
    });
    it("user id Users에 존재하지 않는 경우", function (done) {
        request(app)
            .get("/main/status")
            .query({ UserId: 3 })
            .set("Accept", "application/json")
            .expect((res) => {
                // console.log(res.body);
                expect(res.body).toStrictEqual({
                    message: "no user id in users table",
                });
            })
            .expect(400, done);
    });
});
