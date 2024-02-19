import express, { Request, Response } from 'express'
import axios from 'axios'
import { log } from 'console'
import multer from 'multer';
const path = require('path');

// 引入所需的库
const mongoose = require('mongoose');

// var express = require('express');
var cors = require('cors');

const app = express()

// 配置应用
// 设置静态文件服务，将 public/uploads 目录映射到 /public/uploads 路径
app.use('/public/uploads', express.static('public/uploads')); // 设置静态文件的目录，例如 logo 图片

// 连接数据库
mongoose.connect('mongodb://localhost:27017/atshop_db');

// 使用 cors 中间件
app.use(cors());


// 使用中间件解析请求体
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// 设置静态文件服务，将物理路径映射到 URL 地址
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));



// 引入数据模型
// const Brand = require('../models/Brand');
// const C_1Attr = require('../models/CategoryAttr');

// 引入路由
const brands = require('./routes/brands');
const login = require('./routes/login');
const trademark = require('./routes/baseTrademark');
const fileUpload = require('./routes/fileUpload');
const getCategory = require('./routes/category');



// 使用路由
app.use('/admin/product/brands', brands);
app.use('/admin/acl/index', login);
app.use('/admin/product/baseTrademark', trademark);
app.use('/admin/product/fileUpload', fileUpload);
app.use('/admin/product', getCategory);





// 启动服务器，监听 3000 端口
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
