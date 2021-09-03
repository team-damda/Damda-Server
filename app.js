// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

// db 연결
const { sequelize } = require("./models");
const indexRouter = require("./routes/index");

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

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const glob = require("glob");

const getApis = () => {
    return glob.sync("./**/**.js");
};

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "담다 Api 문서",
            version: "1.0.0",
            description: "담다 Api 문서화한 내용",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            },
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: "Info@SmartBear.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "전체 api들",
            },
        ],
    },
    apis: getApis(),
};

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

// swagger api 문서 관련 코드
app.set("view engine", "ejs");
app.get("/users", (req, res, next) => {
    /**
     * @swagger
     *  /users:
     *    get:
     *      produces:
     *        - application/json
     *      parameters:
     *        - in: path
     *          name: userId
     *          required: true
     *          description: Id of the user
     
     */
    const userOne = new User("Alexander", "fake@gmail.com");
    const userTwo = new User("Ryan", "fakeagain@gmail.com");
    res.json({ userOne, userTwo });
});

const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

module.exports = app;
