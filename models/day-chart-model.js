module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "DayChart",
        {
            stockid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            currentprice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                // 일자
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            startprice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            maxprice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            minprice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            transactionamount: {
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
