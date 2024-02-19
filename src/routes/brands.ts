import express from 'express';
const router = express.Router();
import Brand from '../models/Brand'

// 添加品牌
router.post('/save', async (req, res) => {
    try {
        // 获取请求体
        const { tmName, logoUrl } = req.body;
        // 判断是否有 logo
        if (logoUrl) {
            // 创建一个新的品牌对象
            const brand = new Brand({ tmName: tmName, logoUrl: logoUrl });
            // 保存到数据库
            await brand.save();
            // 返回结果
            const result = { code: 200, message: "上传成功", ok: true }
            res.json(result);
        } else {
            // 返回 400 错误
            res.status(400).json({ message: 'Logo is required' });
        }
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});

// 导出路由对象
module.exports = router;