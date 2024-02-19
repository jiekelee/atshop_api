import express, { Request, Response } from 'express'
const router = express.Router();
import Brand from '../models/Brand'
const fs = require('fs');
import path from 'path'
import { log } from 'console';



// 添加一个新的品牌
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

// 修改一个已有的品牌
router.put('/update', async (req, res) => {
    try {
        // 获取请求体
        const { id, tmName, logoUrl } = req.body;
        // 判断是否有 id
        if (id) {
            // 根据自定义的 id 字段找到对应的品牌对象
            const brand = await Brand.findOne({ id: id });
            // 判断是否找到
            if (brand) {
                // 更新品牌的属性
                brand.tmName = tmName;
                brand.logoUrl = logoUrl;
                // 保存到数据库
                await brand.save();
                // 返回结果
                const result = { code: 200, message: "更新成功", ok: true };
                res.json(result);
            } else {
                // 返回 404 错误
                res.status(404).json({ message: 'Brand not found' });
            }
        } else {
            // 返回 400 错误
            res.status(400).json({ message: 'Id is required' });
        }
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});


// 定义路由
// 根据前端传来的page,limit获取相应的品牌数据
router.get('/:page/:limit', async (req: Request, res: Response) => {
    try {
        // 获取请求参数
        const page = Number(req.params.page); // 当前页码，默认为 1
        const limit = Number(req.params.limit); // 每页显示的品牌数，默认为 10
        // 计算跳过的品牌数
        const skip = (page - 1) * limit;
        // 查询数据库，使用 limit 和 skip 实现分页，并排除 _id 和 __v 字段
        const brands = await Brand.find().limit(limit).skip(skip).select('-_id -__v');
        // 查询数据库，获取品牌总数
        const count = await Brand.countDocuments();
        // 返回结果，包括品牌列表，品牌总数，当前页码，每页显示的品牌数
        const result = { code: 200, mgessage: '成功', data: { records: brands, total: count }, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});



// 删除一个品牌
router.delete('/remove/:id', async (req, res) => {
    try {
        // 获取请求参数
        const { id } = req.params;
        // 根据 ID 查找品牌
        const brand = await Brand.findOne({ id: id });
        // 判断是否存在
        if (brand) {
            // 获取 logoUrl
            const logoUrl = brand.logoUrl;
            // 解析 URL，获取文件名
            const filename = path.basename(logoUrl);
            // 拼接图片路径
            const currentDir = __dirname;
            // 删除路径中的最后一个目录
            const newPath = path.join(currentDir, '../').replace(/src[\\/]?$/, '');
            const imagePath = path.join(newPath, 'public', 'uploads', filename);
            // 删除图片
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Image deleted');
                }
            });
            // 删除品牌
            await Brand.findOneAndDelete({ id: id });
            // 返回结果
            const result = { code: 200, message: "删除成功", ok: true }
            res.json(result);
        } else {
            // 返回 404 错误
            res.status(404).json({ message: 'Brand not found' });
        }
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});




// 导出路由对象
module.exports = router;