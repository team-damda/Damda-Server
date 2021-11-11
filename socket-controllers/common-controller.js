const statusCodeMeta = require("../modules/status-code-meta");
const CommonServices = require("../services/common-services");
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
            console.log(`Socket connected in /common/status ${socket.id}`);
            const UserId = socket.handshake.query.token;
            sendByPeriod({
                socket,
                query: {
                    UserId: UserId,
                },
                service: CommonServices.readMyStatus,
                successDataFormat: responseBody.successData(
                    // nested까지 확인은 못함: 클라이언트에서
                    statusCodeMeta.OK,
                    successMeta["SUC-COMMON-0001"].message
                ),
                period: 10,
                endpoint: "common/status",
            });
            socket.on("disconnect", () => {
                // 클라이언트의 연결이 끊어졌을 때 호출
                console.log(`Socket disconnected /common/status: ${socket.id}`);
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
    readContainStocks: (socket) => {
        // TODO service 레이어 다 만들어지면 -> sendByPeriod로 리팩토링하기
        try {
            console.log(
                `Socket connected in /common/containStocks ${socket.id}`
            );
            const UserId = socket.handshake.query.token;

            // [
            //     {
            //         marketType: "KOSDAC",
            //         stockId: "2DOSJFOJOFJOEJP",
            //         stockName: "주식ABCD",
            //         currentPrice: 40000,
            //         totCnt: 3,
            //         totProfitLoss: (40000 - 30000) * 3,
            //         // 평가손익:(현재가-평단가)*보유량,
            //         totProfitLossRate: (100 * (40000 - 30000)) / 30000,
            //         // 수익률: 100*(현재가-평단가)/평단가
            //     },
            // ],

            sendByPeriod({
                socket,
                query: {
                    UserId: UserId,
                },
                service: CommonServices.readMyContainStocks,
                successDataFormat: responseBody.successData(
                    // nested까지 확인은 못함: 클라이언트에서
                    statusCodeMeta.OK,
                    successMeta["SUC-COMMON-0003"].message
                ),
                period: 10,
                endpoint: "common/containStocks",
            });
            socket.on("disconnect", () => {
                // 클라이언트의 연결이 끊어졌을 때 호출
                console.log(
                    `Socket disconnected /common/containStocks: ${socket.id}`
                );
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
