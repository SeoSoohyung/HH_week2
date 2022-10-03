const express = require("express"); // express 값 가져온다.
const postrouter = require("./routes/posts") 
const commtrouter = require("./routes/comments")
const app = express();
const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/post',[postrouter]);
app.use('/comment',[commtrouter]);

app.listen(3000, () => {
    console.log('서버가 3000포트로 열렸습니다.')
});

