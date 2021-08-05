module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Calendar",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                // 날짜
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            totasset: {
                // 총 자산
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
