const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Users } = require("../models");

router.post("/", async (req, res) => {
  if (req.headers.authorization) { //토큰을 날릴때는 headers
    res.status(401).send({ errorMessage: "이미 로그인이 되어있습니다." });
    return;
  }
  const { nickname, password, confirm } = req.body;
  let checknickname = /^[a-zA-Z0-9]{3,30}$/;

  if (!checknickname.test(nickname)) {
    res.status(400).send({
      errorMessage:
        "닉네임은 최소 3자 이상, 알파벳 대소문자,숫자로 구성되어야 합니다.",
    });
    return;
  }

  if (password.length < 4 || nickname.includes(password)) {
    res.status(400).send({
      errorMessage: " 최소 4자 이상이며, 닉네임과 같은 값이 포함되면 안됩니다.",
    });
    return;
  }

  if (password !== confirm) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  const existsUsers = await Users.findOne({
    where:{nickname}  
  });
  if (existsUsers) {
    res.status(400).send({
      errorMessage: "중복된 닉네임입니다.",
    });
    return;
  }

  const user = new Users({ nickname, password });
  await user.save();

  res.status(201).send({});
});

module.exports = router;
