const request = require("supertest");
const app = require("../../app");
const db = require("../../models");

describe("/main", function () {
    let thisDb = db;

    beforeAll(async () => {
        await thisDb.sequelize.sync({ force: true });
    });

    it("TOY should test that true === true", async () => {
        await expect(true).toBe(true);
    });

    it("GET /main/status", async (done) => {
        const response = await request(app)
            .get("/main/status?UserId=1")
            .set("Accept", "application/json")
            .expect(200)
            .then((res) => {
                assert(response.body.nickname, "테스트");
                done();
            })
            .catch((err) => done(err));
        // .end((err, res) => {
        //     if (err) {
        //         return done(err);
        //     }
        //     expect(res.body).toStrictEqual({
        //         nickname: "테스트",
        //         history: 8,
        //         deposit: 1000000,
        //         containStockAsset: null,
        //     });
        //     return done();
        // });
    });
});
