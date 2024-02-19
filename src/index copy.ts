import express, { Request, Response } from 'express'
import axios from 'axios'
import { login, verifyToken } from './auth'
import { log } from 'console'
import multer from 'multer';
const path = require('path');
const fs = require('fs');
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


// 引入上传文件的中间件
const upload = require('./utils/upload');

// 设置静态文件服务，将物理路径映射到 URL 地址
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));




// 引入数据模型
// const Brand = require('../models/Brand');
const C_1Attr = require('../models/CategoryAttr');



// 引入路由
const brands = require('./routes/brands');
// 使用路由
app.use('/admin/product/brands', brands);



// 定义登录路由
app.post('/admin/acl/index/login', async (req: Request, res: Response) => {
  // 获取请求体中的用户名和密码
  const { username, password } = req.body
  // 调用登录函数，返回一个 token 或一个错误信息
  const result = await login(username, password)
  // 发送响应
  res.json(result)
})

// 定义获取用户信息路由
app.get('/admin/acl/index/info', async (req: Request, res: Response) => {
  // 获取请求头中的 token
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: `Missing authorization header: ${authHeader}` });
  }

  // 检查 Authorization 字段的格式是否正确
  if (!authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }
  // 解析 token
  const token = authHeader.split(' ')[1];
  // const authorizationHeader = req.headers.authorization;
  // const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
  // 调用验证 token 函数，返回一个用户信息或一个错误信息

  const result = await verifyToken(token)
  res.json(result)

  // 发送响应

})



// 启动服务器，监听 3000 端口
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
