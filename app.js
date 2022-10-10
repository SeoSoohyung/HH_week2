const express = require("express"); // express에서 제공되는 Router 함수를 사용해 Router 생성 **거의 디폴트값으로 쓰는것
const app = express(); //**
const postrouter = require("./routes/posts"); //미들웨어
const commtrouter = require("./routes/comments"); //미들웨어
const loginrouter = require("./routes/login")
const signuprouter = require("./routes/signup");

app.use(express.urlencoded({ extended: false })); //Router 미들웨어 //쿼리할때 필요. **
app.use(express.json()); //Router 미들웨어 **
app.use("/posts", [postrouter]); //게시글
app.use("/comments", [commtrouter]); //댓글
app.use("/signup", [signuprouter]); //회원가입
app.use("/login", [loginrouter]);  //로그인

app.listen(3000, () => {
  //**
  console.log("서버가 3000포트로 열렸습니다.");
});
