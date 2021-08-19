// TODO 에러 코드 형식 관련 토의 필요
module.exports = {
    // errorcode: {message, detail}
    /*
        * errorcode 형식
            ERR-{route}-{순번}
        
        * detail 형식
            "{data name}, {data name} not in {db table name}"
    */
    "ERR-MAIN-0001": {
        message: "no user id matching in Users table",
    },
    "ERR-MAIN-0002": {
        message: "no user id matching in UserDeposit table",
    },
};
