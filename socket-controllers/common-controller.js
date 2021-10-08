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
    readContainStocks: (socket) => {
        // TODO service 레이어 다 만들어지면 -> sendByPeriod로 리팩토링하기
        try {
            console.log(
                `Socket connected in /common/containStocks ${socket.id}`
            );
            const UserId = socket.handshake.query.token;
            const successData = responseBody.successData(
                statusCodeMeta.OK,
                [
                    {
                        marketType: "KOSDAC",
                        stockId: "2DOSJFOJOFJOEJP",
                        stockName: "주식ABCD",
                        currentPrice: 40000,
                        totCnt: 3,
                        totProfitLoss: (40000 - 30000) * 3,
                        // 평가손익:(현재가-평단가)*보유량,
                        totProfitLossRate: (100 * (40000 - 30000)) / 30000,
                        // 수익률: 100*(현재가-평단가)/평단가
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
