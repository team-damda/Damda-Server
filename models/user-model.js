module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "User",
        {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};
