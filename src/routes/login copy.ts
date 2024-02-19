import express, { Request, Response } from 'express'
const router = express.Router();
import { login, verifyToken } from '../auth'

// 定义登录路由
router.post('/login', async (req: Request, res: Response) => {
    // 获取请求体中的用户名和密码
    const { username, password } = req.body
    // 调用登录函数，返回一个 token 或一个错误信息
    const result = await login(username, password)
    // 发送响应
    res.json(result)
})

// 定义获取用户信息路由
// router.get('/info', async (req: Request, res: Response) => {
//     // 获取请求头中的 token
//     const authHeader = req.headers.authorization
//     if (!authHeader) {
//         return res.status(401).json({ message: `Missing authorization header: ${authHeader}` });
//     }

//     // 检查 Authorization 字段的格式是否正确
//     if (!authHeader.startsWith('Bearer')) {
//         return res.status(401).json({ message: 'Invalid authorization format' });
//     }
//     // 解析 token
//     const token = authHeader.split(' ')[1];
//     // const authorizationHeader = req.headers.authorization;
//     // const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
//     // 调用验证 token 函数，返回一个用户信息或一个错误信息

//     const result = await verifyToken(token)
//     res.json(result)

//     // 发送响应

// })

// 导出路由对象
module.exports = router;