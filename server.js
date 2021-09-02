var app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");

const mainController = require("./socket-controllers/main-controller");
const io = socketIo(server);

io.of("/main/status")
    .use((socket, next) => {
        console.log("안녕 여기는 auth용 미들웨어 부분");
        next();
    })
    .on("connection", (socket) => {
        mainController.readMyStatusDeposit(socket);
    });

// 3000 포트로 서버 오픈
server.listen(3000, function () {
    console.log("start! express server on port 3000");
});
