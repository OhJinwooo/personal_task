const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page");
});

router.post("/post", async (req, res) => {
  const { writer, pw, title, description, date } = req.body;

  await Post.create({ writer, pw, title, description, date });

  res.json({ msg: "글쓰기가 완료되었습니다." });
});

router.put("/update", async (req, res) => {
  const { _id, writer, pw, title, description } = req.body;

  const pwCheck = await Post.find({ _id, pw }); 
  //find함수를 사용 시 프로미스로 반환이라 await 함수를 꼭 사용해줘야함.
  if (!pwCheck.length) {
    res.json({ success: false, msg: "비밀번호가 틀렸습니다." });
  } else {
    await Post.updateOne({ _id }, { $set: { title, writer, description } });
    res.json({ success: true, msg: "수정이 완료되었습니다." });
  }
});

router.delete("/delete", async (req, res) => {
  const { _id, pw } = req.body;

  const pwCheck = await Post.find({ _id, pw });
  if (!pwCheck.length) {
    res.json({ success: false, msg: "비밀번호가 틀렸습니다." });
  } else {
    await Post.deleteOne({ _id });
    res.json({ success: true, msg: "삭제가 완료되었습니다." });
  }
});

module.exports = router;

