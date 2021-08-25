const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

const morgan = require("morgan");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

const db = require("./models");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}
app.use(
  cors({
    // origin: ['http://localhost:3060', 'mimiofficial.com', 'http://3.36.72.28'],
    origin: "http://3.36.86.190",
    credentials: true, //쿠키허용
    // secret: process.env.COOKIE_SECRET,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/posts", postsRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
