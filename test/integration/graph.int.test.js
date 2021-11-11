// const request = require("supertest");
// const { sequelize } = require("../../models");
// const app = require("../../app");
// const successMeta = require("../../modules/success-meta");
// const errorMeta = require("../../modules/error-meta");

// beforeAll(async () => {
//     await sequelize.sync();
// });

// describe("POST /graph/buying", function () {
//     it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
//         request(app)
//             .post("/graph/buying")
//             .send({ UserId: 1, stockId: "AA", curCnt: 2, curPrice: 1000 })
//             .set("Accept", "application/json")
//             .expect((res) => {
//                 // console.log(res.body);
//                 expect(res.body).toStrictEqual({
//                     status: 200,
//                     success: true,
//                     message: successMeta["SUC-GRAPH-0001"].message,
//                 });
//             })
//             .expect(200, done);
//     });
// });
