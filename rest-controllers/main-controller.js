const statusCodeMeta = require("../modules/status-code-meta");
const MainServices = require("../services/main-services");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

module.exports = {
    readMyStatus: async (req, res) => {
        try {
            if (!req.query.UserId) {
                // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
                res.status(statusCodeMeta.BAD_REQUEST).send({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
                });
                return;
            }
            const { UserId } = req.query;
            await MainServices.readMyStatus({
                UserId: parseInt(UserId),
            })
                .then((data) => {
                    res.status(statusCodeMeta.OK).send(
                        responseBody.successData(
                            statusCodeMeta.OK,
                            data,
                            successMeta["SUC-MAIN-0001"].message
                        )
                    );
                })
                .catch((error) => {
                    throw error;
                });
        } catch (error) {
            let { statusCode, errorCode, message } = error;
            res.status(statusCode || statusCodeMeta.INTERNAL_SERVER_ERROR).send(
                responseBody.fail(
                    statusCode || statusCodeMeta.INTERNAL_SERVER_ERROR,
                    errorCode || "NOT DEFINED",
                    message || ""
                )
            );
        }
    },
};
