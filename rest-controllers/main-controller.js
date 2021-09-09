const statusCode = require("../modules/status-code");
const MainServices = require("../services/main-services");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

module.exports = {
    readMyStatus: async (req, res) => {
        try {
            if (!req.query.UserId) {
                // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
                res.status(statusCode.BAD_REQUEST).send({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
                });
                return;
            }
            const { UserId } = req.query;
            await MainServices.readMyStatus({
                UserId: parseInt(UserId),
            })
                .then((data) => {
                    res.status(statusCode.OK).send(
                        responseBody.successData(
                            statusCode.OK,
                            data,
                            successMeta["SUC-MAIN-0001"].message
                        )
                    );
                })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            let { statuscode, errorCode, message } = error;
            res.status(statuscode).send(
                responseBody.fail(
                    statuscode || statusCode.INTERNAL_SERVER_ERROR,
                    errorCode || "NOT DEFINED",
                    message || ""
                )
            );
        }
    },
};
