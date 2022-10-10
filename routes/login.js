const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Users } = require("../models");

router.post("/", async (req, res) => {
  if (req.headers.authorization) {
    //토큰을 날릴때는 headers
    res.status(401).send({ errorMessage: "이미 로그인이 되어있습니다." });
    return;
  }
  const { nickname, password } = req.body;
  const user = await Users.findOne({ 
    where: {
      nickname
    }
   });

  // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "닉네임 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  res.send({
        token: jwt.sign({ userId: user.userId }, "seosoohyung-secret-key"),
      });
});

//로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요."라는 에러 메세지를 response에 포함하기
// try {
//   const user = await User.fidnAll({
//     // nickname 과 password가 일치하는게 있는지
//     where: {
//       nickname: nickname,
//       password: password,
//     },
//   });
//   res.send({
//     token: jwt.sign({ userId: user.userId }, "seosoohyung-secret-key"),
//   });
// } catch {
//   return res
//     .status(400)
//     .send({ errorMessage: "닉네임 또는 패스워드를 확인해주세요." });
// }

module.exports = router;
