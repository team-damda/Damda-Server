const statusCodeMeta = require("../modules/status-code-meta");
const MainServices = require("../services/main-services");
const responseBody = require("../modules/response-body");
const successMeta = require("../modules/success-meta");

const {
    sendByPeriod,
    sendError,
    sendByPeriodWithNoService,
} = require("../modules/socket-modules");
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
                    statusCodeMeta.OK,
                    successMeta["SUC-MAIN-0001"].message
                ),
                period: 10,
            });
            socket.on("disconnect", () => {
                // 클라이언트의 연결이 끊어졌을 때 호출
                console.log(`Socket disconnected /main/status: ${socket.id}`);
            });
        } catch (error) {
            let { statusCode, errorCode, message } = error;
            if (socket.connected) {
                sendError(
                    socket,
                    responseBody.fail(
                        statusCode || statusCodeMeta.BAD_REQUEST,
                        errorCode || errorMeta["ERR-SOCK-0002"],
                        message || ""
                    )
                );
            }
        }
    },
    readInterestStocks: (socket) => {
        // TODO service 레이어 다 만들어지면 -> sendByPeriod로 리팩토링하기
        try {
            console.log(
                `Socket connected in /main/interestStocks ${socket.id}`
            );
            const UserId = socket.handshake.query.token;
            const successData = responseBody.successData(
                statusCodeMeta.OK,
                [
                    {
                        marketType: "KOSPI",
                        stockId: "1SNDNDJJFHUSISN",
                        stockName: "삼성증권",
                        currentPrice: 50000,
                        todayChange: 2000,
                        // 시가대비
                        todayRoC: (2000 / (50000 - 2000)) * 100,
                        // Today Rate of Change: 등락률
                    },
                ],
                successMeta["SUC-MAIN-0002"].message
            );
            sendByPeriodWithNoService({
                socket,
                period: 10,
                data: successData,
            });
            socket.on("disconnect", () => {
                // 클라이언트의 연결이 끊어졌을 때 호출
                console.log(`Socket disconnected /main/status: ${socket.id}`);
            });
        } catch (error) {
            let { statusCode, errorCode, message } = error;
            if (socket.connected) {
                sendError(
                    socket,
                    responseBody.fail(
                        statusCode || statusCodeMeta.BAD_REQUEST,
                        errorCode || errorMeta["ERR-SOCK-0002"],
                        message || ""
                    )
                );
            }
        }
    },
};
