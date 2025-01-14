// 这是路由处理函数模块
// 导入数据库操作模块
const db = require("../db/index");
let coverUrl = "";
// 获取文章封面url
exports.reqArticle = (req, res) => {
  const avatarUrl = `http://127.0.0.1:3000/${
    req.file.destination.split("/")[1]
  }/${req.file.originalname.replace(/\s/g, "")}`;
  if (avatarUrl) {
    coverUrl = avatarUrl;
    res.send({
      status: 200,
      message: "ok",
    });
  }
};
// 当页面加载完毕后清楚上一次选中的封面
exports.clearImage = (req, res) => {
  coverUrl = "";
  res.send({
    status: 200,
    message: "OK",
  });
};
// 发布文章
exports.publishArticle = async (req, res) => {
  const { title, content, type } = req.body;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
    "0" + date.getSeconds()
  ).slice(-2)}`;
  const data = {
    title,
    content,
    type,
    cover: coverUrl,
    time: formattedDate,
  };
  const sql = "INSERT INTO article SET ?";
  const result = await db.query(sql, data);
  coverUrl = "";
  res.send({
    status: 200,
    message: "发布成功",
  });
};
exports.getAllArticle = async (req, res) => {
  const sql = "select * from article";
  const result = await db.query(sql);
  if (result[0].length > 0) {
    res.send({
      message: "获取文章列表成功！",
      status: 200,
      data: result[0],
    });
  }
};
