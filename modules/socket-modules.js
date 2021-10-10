const CustomError = require("./custom-error");
const errorMeta = require("./error-meta");
const statusCodeMeta = require("./status-code-meta");

module.exports = {
    sleep: (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
    sendByPeriodWithNoService: async ({ socket, period, data, endpoint }) => {
        /* 개발용 더미 데이터 보내기 위함*/
        if (socket && period && data) {
            setInterval(() => {
                if (socket.connected) {
                    console.log(socket.id, `from server ${endpoint}`);
                    socket.emit("reply_json", data);
                }
            }, 10 * 1000);
        } else {
            throw CustomError(
                statusCodeMeta.BAD_REQUEST,
                "ERR-SOCK-0002",
                errorMeta
            );
        }
    },
    sendByPeriod: async ({
        socket,
        period,
        service,
        query,
        successDataFormat,
        endpoint,
    }) => {
        /*
            [설명]
            period초마다 서비스 레이어 객체를 통해 디비에 있는 데이터 가져와서 현재 연결된 소켓 전송해 줌
			
            [인자]
            socket: 현재 연결된 소켓
            period: 소켓으로 데이터 보낼 때의 주기(단위: 초)
            service: 해당하는 서비스 레이어 객체
            query: 서비스 레이어에 인자로 보낼 쿼리(타입: 객체)
            successDataFormat: 소켓으로 보낼 데이터 형식
            endpoint: 로그 찍을 때 필요
        */

        if (
            socket &&
            service &&
            successDataFormat &&
            query &&
            period &&
            endpoint
        ) {
            let i = 0;

            setInterval(async () => {
                if (socket.connected) {
                    console.log(socket.id, `from server ${endpoint}`);
                    await service(query)
                        .then((data) => {
                            successDataFormat.data = data;
                            socket.emit("reply_json", successDataFormat);
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
            }, 10 * 1000);
        } else {
            throw CustomError(
                statusCodeMeta.BAD_REQUEST,
                "ERR-SOCK-0002",
                errorMeta
            );
        }
    },
    sendError: (socket, failData) => {
        socket.emit("reply_json", failData);
    },
};
