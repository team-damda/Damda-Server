// const request = require("supertest");
// const { sequelize } = require("../../models");
// const app = require("../../app");
// const successMeta = require("../../modules/success-meta");
// const errorMeta = require("../../modules/error-meta");

// beforeAll(async () => {
//     await sequelize.sync();
// });

// describe("GET /main/interestStocks", function () {
//     it("user id Users에 존재하는 정상적인 get의 경우", function (done) {
//         request(app)
//             .get("/main/interestStocks")
//             .query({ UserId: 1 })
//             .set("Accept", "application/json")
//             .expect((res) => {
//                 // console.log(res.body);
//                 expect(res.body).toStrictEqual({
//                     status: 200,
//                     success: true,
//                     message: successMeta["SUC-MAIN-0002"].message,
//                     data: [
//                         {
//                             stockId: "AA",
//                             marketType: "코스피",
//                             stockName: "밤새는거극혐",
//                             todayChange: -1000,
//                             todayRoC: -16.666666666666668,
//                             currentPrice: 5000,
//                         },
//                         {
//                             stockId: "BB",
//                             marketType: "코스닥",
//                             stockName: "라이언",
//                             todayChange: 1000,
//                             todayRoC: 25,
//                             currentPrice: 5000,
//                         },
//                     ],
//                 });
//             })
//             .expect(200, done);
//     });
// });
