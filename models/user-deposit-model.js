module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "UserDeposit",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            deposit: {
                type: DataTypes.INTEGER,
                defaultValue: 10000000,
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
