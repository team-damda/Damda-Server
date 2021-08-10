const statusCode = require("../modules/status-code");

const mainService = require("../services/main-service");

module.exports = {
    readMyStatus: async (req, res) => {
        try {
            const data = mainService.readMyStatus(req.body.uid);
            req.status(statusCode.OK).send(data);
        } catch (e) {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR);
        }
    },
};
