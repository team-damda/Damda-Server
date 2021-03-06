module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "BuyStock",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stockId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cnt: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            // 채결 시간
            updatedAt: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};
