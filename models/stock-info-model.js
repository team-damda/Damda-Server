module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "StockInfo",
        {
            marketType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stockId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            stockName: {
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
