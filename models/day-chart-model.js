module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "DayChart",
        {
            stockId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            currentPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                // 일자
                type: DataTypes.DATEONLY,
                allowNull: false,
                primaryKey: true,
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
