const mysql = require("mysql2");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "vue-project",
  charset: "UTF8MB4_UNICODE_CI", // 用于保存和读取表情包这种4字节的
});
module.exports = db;
