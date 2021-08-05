module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "StockInfo",
        {
            markettype: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stockid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stockname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};
