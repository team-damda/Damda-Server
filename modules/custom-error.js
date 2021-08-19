module.exports = {
    CustomError: (stat, errcode, errorMeta) => {
        var err = new Error(msg);
        err.statusCode = stat;
        err.errorcode = errcode;
        err.message = errorMeta[errcode].message;

        return err;
    },
    StatusError: (stat, msg) => {
        var err = new Error(msg);
        err.statusCode = stat;
        return err;
    },
};
