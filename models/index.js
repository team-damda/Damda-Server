const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config")[env];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        // logging: console.log,
        logging: false,
        ssl: "Amazon RDS",
        language: "en",
        pool: { maxConnections: 5, maxIdleTime: 30 },
        /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    }
);
/* new Sequelize(database, [username=null], [password=null], [options={}]) */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델

db.User = require("./user-model")(sequelize, Sequelize);
db.UserDeposit = require("./user-deposit-model")(sequelize, Sequelize);
db.ContainStock = require("./contain-stock-model")(sequelize, Sequelize);
db.InterestStock = require("./interest-stock-model")(sequelize, Sequelize);
db.BuyStock = require("./buy-stock-model")(sequelize, Sequelize);
db.SellStock = require("./sell-stock-model")(sequelize, Sequelize);
db.StockInfo = require("./stock-info-model")(sequelize, Sequelize);
db.OneMinChart = require("./one-min-chart-model")(sequelize, Sequelize);
db.TenMinChart = require("./ten-min-chart-model")(sequelize, Sequelize);
db.DayChart = require("./day-chart-model")(sequelize, Sequelize);
db.WeekChart = require("./week-chart-model")(sequelize, Sequelize);
db.Calendar = require("./calendar-model")(sequelize, Sequelize);

// foreign key 설정 안 해둠.

module.exports = db;
