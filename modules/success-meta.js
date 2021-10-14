// 아직 결정 안함.
module.exports = {
    // successcode: {message}
    /*
        * successcode 형식
            SUC-{route}-{순번}
        * message 형식
            "main/route success"
    */
    "SUC-COMMON-0001": {
        message: "common/status 조회 성공",
    },
    "SUC-MAIN-0002": {
        message: "main/interestStocks 조회 성공",
    },
    "SUC-COMMON-0003": {
        message: "common/holdingStocks 조회 성공",
    },
    "SUC-WALLET-0001": {
        message: "wallet/transactions 조회 성공",
    },
    "SUC-GRAPH-0001": {
        message: "graph/buying POST 성공",
    },
};
