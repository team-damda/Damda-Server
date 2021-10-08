var app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");

const mainController = require("./socket-controllers/main-controller");
const commonController = require("./socket-controllers/common-controller");
const io = socketIo(server);

io.of("/common/status")
    .use((socket, next) => {
        console.log("안녕 여기는 auth용 미들웨어 부분");
        next();
    })
    .on("connection", (socket) => {
        commonController.readMyStatusDeposit(socket);
    });

io.of("/main/interestStocks")
    .use((socket, next) => {
        console.log("안녕 여기는 auth용 미들웨어 부분");
        next();
    })
    .on("connection", (socket) => {
        mainController.readInterestStocks(socket);
    });

io.of("/main/containStocks")
    .use((socket, next) => {
        console.log("안녕 여기는 auth용 미들웨어 부분");
        next();
    })
    .on("connection", (socket) => {
        commonController.readContainStocks(socket);
    });

// 3000 포트로 서버 오픈
server.listen(5000, function () {
    console.log("start! express server on port 5000");
});
