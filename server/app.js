const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
// 导入数据库操作模块
const db = require("./db/index");
// 导入并使用用户路由模块
const userRouter = require("./router/article");
app.use("/my", userRouter);
app.listen(3000, () => {
  console.log(`start http://localhost:3000`);
});
