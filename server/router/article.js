const express = require("express");
const router = express.Router();
// 导入文章分类的路由处理函数模块
const artCate_handler = require("../router_handler/article");
// 发布文章
router.post("/pubArticle", artCate_handler.publishArticle);
module.exports = router;
