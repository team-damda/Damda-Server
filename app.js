// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express();

// db 연결
const { sequelize } = require("./models");
const router = require("./routes/index");

sequelize
    .sync()
    .then(() => {
        console.log("DB connection success");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("hello world");
// });

// 테스트

app.use("/", router);

// 3000 포트로 서버 오픈
app.listen(3000, function () {
    console.log("start! express server on port 3000");
});
