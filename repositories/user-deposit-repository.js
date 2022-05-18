// * repository 적용
const {UserDeposit} = require("../models");
const CustomError = require("../modules/custom-error");
const errorMeta = require("../modules/error-meta");
const statusCodeMeta = require("../modules/status-code-meta");

module.exports = {
    getByUserId: async ({UserId}) => {
        let returnData = {};
        await UserDeposit.findOne({
            where: {uid: UserId},
        }).then((data) => {
            if (data) {
                returnData = data;
            } else {
                throw CustomError(
                    statusCodeMeta.BAD_REQUEST,
                    "ERR-MAIN-0002-1",
                    errorMeta
                );
            }
        });
        return returnData.dataValues;
    },
};
