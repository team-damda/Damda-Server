const statusCode = require("../modules/status-code");
const MainServices = require("../services/main-services");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

const { sendByPeriod, sendError, sleep } = require("../modules/socket-modules");
const errorMeta = require("../modules/error-meta");

module.exports = {
    readMyStatusDeposit: (socket) => {
        // TODO UserId -> 토큰으로 헤더에서 받고 이건 미들웨어로 처리해야 함.
        try {
            // 클라이언트 연결되었을 때 호출(for 로깅)
            console.log(`Socket connected in /main/status ${socket.id}`);
            const UserId = socket.handshake.query.token;
            sendByPeriod({
                socket,
                query: {
                    UserId: UserId,
                },
                service: MainServices.readMyStatus,
                successDataFormat: responseBody.successData(
                    // nested까지 확인은 못함: 클라이언트에서
                    statusCode.OK,
                    successMeta["SUC-MAIN-0001"].message
                ),
                period: 10,
            });
            socket.on("disconnect", () => {
                // 클라이언트의 연결이 끊어졌을 때 호출
                console.log(`Socket disconnected /main/status: ${socket.id}`);
            });
        } catch (error) {
            let { status, errorCode, message } = error;
            if (socket.connected) {
                sendError(
                    socket,
                    responseBody.fail(
                        status || statusCode.BAD_REQUEST,
                        errorCode || errorMeta["ERR-SOCK-0002"],
                        message || ""
                    )
                );
            }
        }
    },
};
