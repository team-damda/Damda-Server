var path = require("path");
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
        logging: console.log,
        ssl: "Amazon RDS",
        language: "en",
        pool: { maxConnections: 5, maxIdleTime: 30 },
        /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    }
);
/* new Sequelize(database, [username=null], [password=null], [options={}]) */

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.User = require("./user")(sequelize, Sequelize);

module.exports = db;
