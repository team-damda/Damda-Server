// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

// db 연결
const { sequelize } = require("./models");
const indexRouter = require("./routes/index");
const path = require("path");

sequelize
    .sync()
    .then(() => {
        console.log("DB connection success");
    })
    .catch((err) => {
        console.error(err);
    });

// http request 에러 방지: Origin [링크] is not allowed by Access-Control-Allow-Origin.

var allowCrossDomain = function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
};
app.set("view engine", "ejs"); //'ejs'탬플릿을 엔진으로 한다.
app.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.use("/", indexRouter);
app.get("/hey", (req, res) => {
    if (req.query.call === "request") {
        console.log("query.call === request");
    }
    console.log("/hey rest api 요청 성공");
    res.status(200).send({ data: { a: "b" } });
});

module.exports = app;
