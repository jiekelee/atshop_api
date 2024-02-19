// utils/upload.js
// const multer = require('multer');
import multer from 'multer'

// 配置上传文件的存储路径和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // 上传文件存储的路径
  },
  filename: function (req, file, cb) {
    // 获取当前日期时间
    const dateTime = new Date().toISOString().replace(/[-T:\.Z]/g, "");
    // 获取原始文件名和后缀名
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    // 用日期时间作为新文件名，保留后缀名
    const newFileName = `${dateTime}.${extension}`;
    cb(null, newFileName); // 上传文件的名称
  }
})

// 创建一个 upload 对象，用于解析上传的文件
const upload = multer({ storage: storage });

// 导出 upload 对象
module.exports = upload;