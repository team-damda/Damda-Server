module.exports = {
    sleep: (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
    sendByPeriod: async ({
        socket,
        period,
        service,
        query,
        successDataFormat,
    }) => {
        /*
            socket: 현재 연결된 소켓
            period: 소켓으로 데이터 보낼 때의 주기(단위: 초)
            service: 해당하는 서비스 레이어 객체
            query: 서비스 레이어에 인자로 보낼 쿼리
            successDataFormat: 소켓으로 보낼 데이터
        */
        if (socket && service && successDataFormat && query && period) {
            const sleep = (ms) => {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            };

            let i = 0;
            while (socket.connected) {
                await sleep(1000 * period); // 10초 기다림

                if (socket.connected) {
                    console.log(socket.id, "from server main/status");
                    await service(query)
                        .then((data) => {
                            successDataFormat.data = data;
                            socket.emit("reply_json", successDataFormat);
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
            }
        } else {
            throw CustomError(
                statusCode.BAD_REQUEST,
                "ERR-SOCK-0002",
                error.message
            );
        }
    },
    sendError: (socket, failData) => {
        socket.emit("reply_json", failData);
    },
};
