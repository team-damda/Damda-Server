// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);

// db 연결
const { sequelize, User } = require("./models");

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

app.get("/", (req, res) => {
    res.send("hello world");
});

// 소켓 일단 간단하게
io.on("connection", (socket) => {
    console.log(`Socket connected ${socket.id}`);
    socket.on("roomjoin", (userid) => {
        console.log(userid);
        // socket.join(userid);
    });
    socket.on("message", (obj) => {
        // 클라이언트에서 message라는 이름의 이벤트를 받았을 경우 호출
        console.log("server received data");
        console.log(obj);
    });
    socket.on("disconnect", () => {
        // 클라이언트의 연결이 끊어졌을 때 호출
        console.log(`Socket disconnected : ${socket.id}`);
    });
});

// 3000 포트로 서버 오픈
server.listen(3000, function () {
    console.log("start! express server on port 3000");
});
