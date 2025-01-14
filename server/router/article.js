// 这是文章分类的路由模块
const express = require("express");
const router = express.Router();
// 导入文章分类的路由处理函数模块
const artCate_handler = require("../router_handler/article");
// 上传封面
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/head");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname.replace(/\s/g, "");
    cb(null, originalname);
  },
});
const upload = multer({ storage: storage });
// 获取文章封面url
router.post(
  "/articleCover",
  upload.single("avatar"),
  artCate_handler.reqArticle
);
// 发布文章
router.post("/pubArticle", artCate_handler.publishArticle);
// 当页面加载完毕后清楚上一次选中的封面
router.get("/clearImage", artCate_handler.clearImage);
// 获取所有文章
router.get("/getAllArticle", artCate_handler.getAllArticle);

module.exports = router;
