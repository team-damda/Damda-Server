const statusCode = require("../modules/status-code");
const mainService = require("../services/main-service");

module.exports = {
    readMyStatus: async (req, res) => {
        // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
        if (!req.query.UserId) {
            res.status(400).send({
                message: "need contain UserId in query",
            });
            return;
        }
        const { UserId } = req.query;
        await mainService
            .readMyStatus({
                UserId: parseInt(UserId),
            })
            .then((data) => {
                res.status(statusCode.OK).send(data);
            })
            .catch((err) => {
                res.status(err.status).send({
                    message: err.message || "Some error",
                });
            });
    },
};
