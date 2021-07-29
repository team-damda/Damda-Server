// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

// 3000 포트로 서버 오픈
app.listen(3000, function () {
    console.log("start! express server on port 3000");
});

// 이제 터미널에 nodemon src/app.js 를 입력해보자.
