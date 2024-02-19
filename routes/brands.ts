// routes/brands.js
// 引入所需的库
const express = require ('express');
const multer = require ('multer');

// 创建一个路由对象
const router = express.Router ();



// 引入数据模型
const Brand = require ('../models/Brand');



// 获取指定 id 的品牌的详情
router.get ('/:id', async (req, res) => {
  try {
    // 获取请求参数
    const id = req.params.id;
    // 查询数据库
    const brand = await Brand.findOne ({id: id});
    // 判断是否存在
    if (brand) {
      // 返回结果
      res.json (brand);
    } else {
      // 返回 404 错误
      res.status (404).json ({message: 'Brand not found'});
    }
  } catch (err) {
    // 处理错误
    res.status (500).json ({message: err.message});
  }
});



// 更新指定 id 的品牌的信息
router.put ('/:id', async (req, res) => {
  try {
    // 获取请求参数
    const id = req.params.id;
    // 获取请求体
    const {name} = req.body;
    // 获取上传的 logo 文件
    const logo = req.file;
    // 查询数据库
    const brand = await Brand.findOne ({id: id});
    // 判断是否存在
    if (brand) {
      // 更新信息
      brand.name = name || brand.name;
      brand.logo = logo ? logo.path : brand.logo;
      // 保存到数据库
      await brand.save ();
      // 返回结果
      res.json (brand);
    } else {
      // 返回 404 错误
      res.status (404).json ({message: 'Brand not found'});
    }
  } catch (err) {
    // 处理错误
    res.status (500).json ({message: err.message});
  }
});

// 删除指定 id 的品牌
router.delete ('/:id', async (req, res) => {
  try {
    // 获取请求参数
    const id = req.params.id;
    // 查询数据库
    const brand = await Brand.findOneAndDelete ({id: id});
    // 判断是否存在
    if (brand) {
      // 返回结果
      res.json (brand);
    } else {
      // 返回 404 错误
      res.status (404).json ({message: 'Brand not found'});
    }
  } catch (err) {
    // 处理错误
    res.status (500).json ({message: err.message});
  }
});

// 导出路由
module.exports = router;
