const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));
// 托管静态资源文件
app.use(express.static("image"));
const db = require("./db/index");
// 根据id获取文章列表
app.get("/getArticleCover", async (req, res) => {
  const sql = "SELECT * FROM article where id = ?";
  const result = await db.query(sql, req.query.id);
  if (result[0].length > 0) {
    res.send({
      message: "OK",
      status: 200,
      data: result[0],
    });
  }
});
// 发布评论
app.post("/pubComment", async (req, res) => {
  const { comment, id } = req.body;
  // 获取当前文章的评论数据
  const sql = "select * from article where id=?";
  const result = await db.query(sql, id);
  const data = !result[0][0].comment ? [] : result[0][0].comment;
  // 添加新的评论
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
    "0" + date.getSeconds()
  ).slice(-2)}`;
  data.push({ comment: comment, time: formattedDate });
  // 更新文章的评论数据
  const sqlUpdate = "UPDATE article SET comment=? WHERE id=?";
  await db.query(sqlUpdate, [JSON.stringify(data), id]);
  res.send({
    message: "OK",
    status: 200,
  });
});
// 获取文章所有评论
app.get("/getAllComments", async (req, res) => {
  const sql = "select * from article where id =?";
  const result = await db.query(sql, req.query.id);
  if (result[0][0].comment && result[0][0].comment.length > 0) {
    res.send({
      message: "OK",
      status: 200,
      data: result[0][0].comment,
    });
  }
});
// 导入并使用用户路由模块
const userRouter = require("./router/article");
app.use("/my/article", userRouter);
app.listen(3000, () => {
  console.log(`start http://localhost:3000`);
});
