// dotenv 사용 시 config.json -> config.js로 사용.
require("dotenv").config();
const env = process.env;

const development = {
    username: env.MYSQL_USERNAME,
    //env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: "mysql",
    port: env.MYSQL_PORT,
};

const production = {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: "mysql",
    port: env.MYSQL_PORT,
};

const test = {
    username: env.TEST_USERNAME,
    password: env.TEST_PASSWORD,
    database: env.TEST_DATABASE,
    host: env.TEST_HOST,
    dialect: "mysql",
    port: env.TEST_PORT,
};

module.exports = { development, production, test };
