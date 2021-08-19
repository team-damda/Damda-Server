module.exports = {
    successData: (status, data, message) => {
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
    fail: (status, errorcode, message) => {
        return {
            status: status,
            success: false,
            errorcode: errorcode,
            message: message,
        };
    },
};
