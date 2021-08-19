module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "ContainStock",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stockId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totCnt: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            avgPrice: {
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
