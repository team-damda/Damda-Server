var app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);

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
