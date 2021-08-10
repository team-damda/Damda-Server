const statusCode = require("../modules/status-code");
const mainService = require("../services/main-service");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");

module.exports = {
    readMyStatus: async (req, res) => {
        // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
        try {
            if (!req.query.UserId) {
                res.status(statusCode.BAD_REQUEST).send({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
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
                    throw err;
                });
        } catch (error) {
            res.status(error.status || statusCode.BAD_REQUEST).send({
                message: error.message || responseMessage.MAIN_STATUS_READ_FAIL,
            });
        }
    },
};
