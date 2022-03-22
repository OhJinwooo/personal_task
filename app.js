// const express = require("express")
// const connect = require("./schemas")//index라는 파일은 생략할 수 있다
// const router = express.Router();
// const app = express();
// const port = 3000;

// connect();
// //지금 내 경로에서 router폴더에 있는 edit파일을 가져오는 것
// const editRouter = require("./routes/edit")

// const requestMiddleware = ((req, res, next) => {
//     //console.log("주소는?", req.path) path는 뒤에 주소값 3000/test
//     console.log("Request Url:", req.originalUrl, " - ", new Date()) 
//     // 미들웨어가 처리될 때 현재 시간을 나타내는 함수
//     next(); 
//     // next있어야만 다음 미들웨어로 넘어간다. 여기서 next가 없으면 무한로딩이 걸린다.
// }) 


// app.use(requestMiddleware);
// app.use(express.json())


// app.get("/", (req, res) => {
//     const List = [{}]
// })
// //get이라는 메서드로 이 경로에 들어가면 실행

// app.use("/api", [listRouter, editRouter]);//router는 미들웨어에 들어간다. 근데 무조건 그런건 아니다.



// app.listen(port, () => {//listen 서버를 켜는
//     console.log("서버가 켜졌어요");//인자에 있는 함수로 호출
// });

const express = require("express");
const connect = require("./schemas");
const Post = require("./schemas/post");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");

const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./static");
app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);
app.use("/api", postsRouter);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index.ejs", { posts });
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.get("/detail/:id", async (req, res) => {
  const detail = await Post.findById(req.params.id);
  res.render("detail.ejs", { detail });
});

app.get("/update/:id", async (req, res) => {
  const detail = await Post.findById(req.params.id);
  res.render("update.ejs", { detail });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});