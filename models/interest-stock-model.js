module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "InterestStock",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stockId: {
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
