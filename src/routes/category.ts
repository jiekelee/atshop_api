// /getCategory1
import express, { Request, Response } from 'express'
const router = express.Router();
import CategoryArr from '../models/CategoryAttr'
import ProductAttr from '../models/ProductAttr'
import { log } from 'console';

// 获取一级分类
router.get('/getCategory1', async (req: Request, res: Response) => {
    try {
        // 查询数据库，获取所有品牌，并排除 _id 和 __v 字段
        const data = await CategoryArr.find({ $and: [{ c1id: 0 }, { c2id: 0 }] }).select('-_id -__v -c1id -c2id');
        // 返回结果，包括品牌列表和品牌总数
        const result = { code: 200, mgessage: '成功', data, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});
// 获取二级分类
router.get('/getCategory2/:c1id', async (req: Request, res: Response) => {
    try {
        // 获取请求参数，即一级分类的 id
        const c1Id = Number(req.params.c1id)
        // 查询数据库，获取所有品牌，并排除 _id 和 __v 字段
        const data = await CategoryArr.find({ $and: [{ c1id: c1Id }, { c2id: 0 }] }).select('-_id -__v -c2id');
        // 返回结果，包括品牌列表和品牌总数
        const result = { code: 200, mgessage: '成功', data, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});
// 获取三级分类
router.get('/getCategory3/:c2id', async (req: Request, res: Response) => {
    try {
        // 获取请求参数，即一级分类的 id
        const c2Id = Number(req.params.c2id)
        // 查询数据库，获取所有品牌，并排除 _id 和 __v 字段
        const data = await CategoryArr.find({ c2id: c2Id }).select('-_id -__v -c1id');
        // 返回结果，包括品牌列表和品牌总数
        const result = { code: 200, mgessage: '成功', data, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});

// 获取分类属性
// router.get('/attrInfoList/:c1Id/:c2Id/:c3Id', async (req: Request, res: Response) => {
// 获取商品属性
router.get('/attrInfoList/:category3Id', async (req: Request, res: Response) => {
    try {
        // 获取请求参数，即分类的 id
        const c3Id = req.params.category3Id
        console.log('c3Id:' + c3Id);

        // 查询数据库，获取商品属性，并排除 _id 和 __v 字段
        const data = await ProductAttr.find({ categoryId: c3Id }).select('-_id -__v');
        // 返回结果，包括商品属性列表和商品属性总数
        const result = { code: 200, message: '成功', data, ok: true }
        res.json(result);
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});


// 添加一个一级分类
router.post('/addC1', async (req, res) => {
    try {
        // 获取请求体
        const { ctName } = req.body;
        // 判断是否有 logo
        if (ctName) {
            // 创建一个新的品牌对象
            const category = new CategoryArr({ ctName: ctName });
            // 保存到数据库
            await category.save();
            // 返回结果
            const result = { code: 200, message: "添加分类成功", ok: true }
            res.json(result);
        } else {
            // 返回 400 错误
            res.status(400).json({ message: 'ctName is required' });
        }
    } catch (err) {
        // 处理错误
        res.status(500).json({ message: err.message });
    }
});

// 添加一个属性值
router.post('/addAttrvalue', async (req, res) => {
    // 定义一个要添加的属性值对象
    const attrValue = [{
        valueName: '14寸',
        attrId: 2
    }];

    // 使用 $push 操作符向 attrValueList 数组中添加属性值对象
    try {
        // 使用 $push 操作符向 attrValueList 数组中添加属性值对象
        const result = await ProductAttr.updateOne(
            { id: 2 }, // 查询条件，根据 id 查找要更新的文档
            { $push: { attrValueList: attrValue } } // 更新操作，向 attrValueList 数组中追加 attrValue 对象
        );
        console.log(result); // 打印更新结果
        res.send("Attribute value added successfully."); // 发送成功响应
    } catch (error) {
        console.error(error); // 如果发生错误，打印错误信息
        res.status(500).send("Internal Server Error"); // 发送服务器内部错误响应
    }
});

// 添加一个属性
router.post('/addAttr', async (req, res) => {
    // 创建一个商品属性对象
    const productAttr = new ProductAttr({
        attrName: '尺寸',
        categoryId: 14,
        categoryLevel: 3,
        attrValueList: []
    });

    // 保存商品属性对象到数据库
    // 使用 try/catch 语句来处理错误
    try {
        // 使用 await 关键字等待 save 方法的返回值
        const result = await productAttr.save();
        // 如果没有错误，打印结果
        console.log(result);
    } catch (err) {
        // 如果有错误，打印错误信息
        console.error(err);
    }
});

// 导出路由对象
module.exports = router;