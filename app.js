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

//Node.js는 자바스크립트라는 언어에 활용되는 플렛폼
//npm은 패키지 관리자이다 모듈을 설치를 하면 Node.js로 편하고 쉽게 가져올 수 있다. npm !== node.js
//express는 서버가 아니다. 이 도구를 사용해서 웹 서버를 쉽게 만든거다(라이브러리) express로 웹서버를 만들었다 가 맞는말이다.

//HTTP 프로토콜 : 전세계적으로 약속한것 어떠한 부분에 어떤 데이터가 있으면 어떻게해라 이런 약속(범용적)
//웹 브라우저는 HTML로 이루어진 데이터를 읽어서 화면에 그려주는 역할! (똑똑한 캔버스다)
//쿠키와 세션: 둘 다 웹브라우저랑 서버, 클라이언트에서 버허한테 쿠키를 보낼 수 있따 서버도, 서버가 쿠키를 구워서 보냄 클라이언트가 까본다,근데 아무나 보면 위험하니 세션이라는 보안으로 안전하게 만듬
//세션은 쿠키 기술을 기반으로 동작한다.(세션은 열쇠를 서버에서 만들어서 클라이언트한테 준다.) 로그인을 증명하는 열쇠(세션)
//쿠키로만 하면 보안이 취약,세션은 서버에서만 데이터를 관리하기 때문에 금고 같은 것(매우 안전) BUT 서버에 감당이 안될 가능성이 많다. 부하가 큼 그래서 JWT라는 부담이 없는 로그인 형식을 사용해 구현

//서버프로그램과 컴퓨터: express는 서버 프로그램, 실행하는게 서버 컴퓨터, 서버가 다운되고 그런 상황은 컴퓨터가 다운된 상황
//라이브러리 express에 대한 이해: 1.express를 이용하여 서버를 만들 수 있다, 2.미들웨어의 개념을 이해할 수 있다, 3.내가 만든 서버로 정적 파일을 제공할 수 있다, 4.템플릿 엔진은 백엔드에서 정적인 텍스트 값을 만들어 낼때 가끔 쓰임
//5. router를 이용해 Method와 경로로 HTTP 요청을 받아 처리하는 방법: 따로 따로 구성했을 때 어떻게 동작하는지

//Rest api: 아키텍처를 따라 구현된 api, 간단히 말하면 원래 있던 방법보다 더 쉽고 사람이 읽기 편한 방식으로 원칙을 세워놨고 생산성과 상호작용을 증진시키는것에 목적
//post, get, put todo_list 등등 
//Validation(벨리데이션): input, output을 검증(joi) if문 이걸 잘 사용하면 견고한 api를 개발할 수 있게됨

//JWT는 변조가 불가능하다는 특성을 지니고있다. 서버에서 원하는 데이터를 암호화해준다.
//서버가 아니면 절대로 변조가 불가능하다.
//복호화는 어디서나 가능하다: Serialize(시리얼라이즈) 한다고 표현함. 형태를 변환한다.
//어디에서나 열어볼 수 있다. 아무나 볼 수 있다. JWT안에는 중요하지 않은 정보
//서버 데이터 베이스 안에 저장된 고유한 유저 아이디, 생년월일 등 노출 가능한 값으로
//이거 갖고 왔어 이 기능을 호출해 줘 라고 했을 때 토큰을 받아 로그인 api를 구현 할 수 있다.
//서버에서 구분 할 수 있는 고유정보를 받아서 토큰을 발급해주는 것.
// 클라이언트는 항상  api를 요청할 때 토큰을 포함해서 보내는 것.
//이러면 쿠키와 세션이 필요 없어진다.




