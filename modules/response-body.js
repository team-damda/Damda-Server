module.exports = {
    successData: (data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data,
        };
    },
    success: (status, message) => {
        return {
            status: status,
            success: true,
            message: message,
        };
    },
    fail: (status, errorcode, message, detail) => {
        return {
            status: status,
            success: false,
            errorcode: errorcode,
            message: message,
            detail: detail,
        };
    },
};
