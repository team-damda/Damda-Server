// TODO 에러 코드 형식 관련 토의 필요
module.exports = {
    // errorcode: {message, detail}
    /*
        * errorcode 형식
            ERR-{route}-{순번}
        
        * detail 형식
            "{}-{} connection instable while searching {db table name} table"
            "no {data name}, {data name} matching in {db table name} table"
    */

    "ERR-MAIN-0001-1": {
        message: "no user id matching in Users table",
    },
    "ERR-MAIN-0001-2": {
        message: "server - db connection instable while searching Users table",
    },
    "ERR-MAIN-0002-1": {
        message: "no user id matching in UserDeposits table",
    },
    "ERR-MAIN-0002-2": {
        message:
            "server - db connection instable while searching UserDeposits table",
    },
    "ERR-MAIN-0004": {
        message:
            "server - db connection instable while searching ContainStocks table",
    },

    "ERR-SOCK-0001": {
        message: "wrong query",
    },
    "ERR-SOCK-0002": {
        message: "wrong code: you put undefined object to sendByPeriod method",
    },
};
