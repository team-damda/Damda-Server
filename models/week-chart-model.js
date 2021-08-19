module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "WeekChart",
        {
            stockId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            currentPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                // 일자
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            startPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            maxPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            minPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            transactionAmount: {
                type: DataTypes.INTEGER,
            },
            tradingValue: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};
