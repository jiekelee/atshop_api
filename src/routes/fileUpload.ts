import express, { Request, Response } from 'express'
const router = express.Router();

// 引入上传文件的中间件
const upload = require('../utils/upload');

router.post('/', upload.single('file'), (req, res) => {
    const uploadedFileName = req.file.filename; // 获取上传后的文件名
  
    // 构建完整的图片地址，假设你的服务器地址是 http://localhost:3000
    const imageUrl = `http://localhost:3000/public/uploads/${uploadedFileName}`;
    const result = {code:'200',message:'上传成功',data:imageUrl,ok:true}
    // 返回图片地址给客户端
    res.json({ result });  
  });

  // 导出路由对象
module.exports = router;