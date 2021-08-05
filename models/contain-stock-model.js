module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "ContainStock",
        {
            uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            stockid: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totcnt: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            avgprice: {
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
