// /getCategory1
import express, { Request, Response } from 'express'
const router = express.Router();
import Category_1 from '../models/CategoryAttr'

router.get('/getCategory1', async (req: Request, res: Response) => {
    try {
        // 查询数据库，获取所有品牌，并排除 _id 和 __v 字段
        const Category1 = await Category_1.find().select('-_id -__v');
        // 返回结果，包括品牌列表和品牌总数
        const result = { code: 200, mgessage: '成功', data: { Category1}, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});

// 导出路由对象
module.exports = router;