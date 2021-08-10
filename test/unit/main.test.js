const mainController = require("../../controllers/main-controller");
const mainService = require("../../services/main-service");

const defineMockModel = (name, datas) => {
    // name: string, data: array of object
    const sequelizeMock = require("sequelize-mock");
    const dbMock = new sequelizeMock();
    const mockModel = dbMock.define(name);
    const mapData = datas.map((data) => mockModel.build(data));
    mockModel.$queueResult(mapData);
    return mockModel;
};

jest.mock("../../models/user-model", () => () => {
    const sequelizeMock = require("sequelize-mock");
    const dbMock = new sequelizeMock();
    return dbMock.define("User", {
        id: 1,
        email: "hello@love.com",
        password: "1111",
        nickname: "안녕",
        createdAt: "2021-08-03T16:10:20.871Z",
    });
});

jest.mock("../../models/user-deposit-model", () => () => {
    const sequelizeMock = require("sequelize-mock");
    const dbMock = new sequelizeMock();
    return dbMock.define("UserDeposit", {
        id: 1,
        uid: 1,
        deposit: 10000000,
    });
});

jest.mock("../../models/contain-stock-model", () => () => {
    return defineMockModel("ContainStock", [
        {
            id: 1,
            uid: 1,
            stockid: 1,
            totcnt: 3,
            avgprice: 3000,
        },
        {
            id: 2,
            uid: 1,
            stockid: 2,
            totcnt: 3,
            avgprice: 2000,
        },
    ]);
});

describe("Main Controller", () => {
    it("should have read my status function", () => {
        expect(typeof mainController.readMyStatus).toBe("function");
    });
});

describe("Main Service", () => {
    it("read my status: should return a correct object", async () => {
        const data = await mainService.readMyStatus({ UserId: 1 });
        // 객체는 toStrictEqual
        // expect(data.nickname).toEqual("안녕");
        // expect(data.history).toEqual(4);
        // expect(data.deposit).toEqual(10000000);
        // expect(data.containStockAsset).toEqual(15000);
        expect(data).toStrictEqual({
            deposit: 10000000,
            containStockAsset: 15000,
            history: 4,
            nickname: "안녕",
        });
    });
    it("read my status: should throw error", async () => {
        expect(() => mainService.readMyStatus({ UserId: 2 })).toThrow();
    });
    // TODO: readMyStatus에서 반환하는 객체 더 자세히 확인. => error까지 확인.
});
