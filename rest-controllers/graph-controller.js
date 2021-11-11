const statusCodeMeta = require("../modules/status-code-meta");
const responseMessage = require("../modules/response-message");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");
const graphServices = require("../services/graph-services");

module.exports = {
    buyingStock: async (req, res) => {
        try {
            console.log("REST [graph/buying]");
            // console.log(req);
            if (!req.body.UserId) {
                // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
                res.status(statusCodeMeta.BAD_REQUEST).send({
                    message: responseMessage.MAIN_STATUS_READ_FAIL,
                });
                return;
            }
            // console.log(req);
            const { UserId, stockId, curCnt, curPrice } = req.body;
            await graphServices
                .buyingStock({
                    UserId: parseInt(UserId),
                    stockId,
                    curCnt: parseInt(curCnt),
                    curPrice: parseInt(curPrice),
                })
                .then(() => {
                    res.status(statusCodeMeta.OK).send(
                        responseBody.success(
                            statusCodeMeta.OK,
                            successMeta["SUC-GRAPH-0001"].message
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
