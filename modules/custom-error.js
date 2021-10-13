module.exports = (stat, errCode, errorMeta) => {
    /*
        CustomError: {
            errorCode,
            statusCode,
            message
        }
    */
    var err = new Error(errorMeta[errCode].message || "");
    err.statusCode = stat;
    err.errorCode = errCode;
    // console.log(err.errorcode);
    return err;
};
