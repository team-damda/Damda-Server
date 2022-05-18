module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "SellStock",
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
            valuationLoss: {
                // 평가 손익
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // TODO 수익률 넣어야 함
            valuationLossRate: {
                type: DataTypes.FLOAT,
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
