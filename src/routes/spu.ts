// /getCategory1
import express, { Request, Response } from 'express'
import Spu from '../models/Spu'
import { log } from 'console';

const router = express.Router();

// 定义一个获取已有 SPU 数据的 API 接口
router.get('/getspudata/:pageNo/:limit', async (req, res) => {
    // 从请求参数中获取分页信息
    const { pageNo, limit } = req.params;
    // 从请求查询字符串中获取分类 id
    const { category3Id } = req.query;
    // 使用 console.log() 方法来打印接收到的参数
    console.log(pageNo, limit, category3Id);

    // 设置默认的分页信息
    const defaultPage = 1;
    const defaultSize = 10;
    // 计算要跳过的文档数
    const skip = (pageNo ? +pageNo - 1 : defaultPage - 1) * (limit ? +limit : defaultSize);
    // 计算要返回的文档数
    const size = limit ? +limit : defaultSize;
    // 使用 try/catch 语句来处理错误
    try {
        // 使用 await 关键字等待 find 方法的返回值
        const records = await Spu.find({ category3Id }).skip(skip).limit(size).select('-_id -__v'); // 查询所有的 SPU 文档，并根据 category3Id 和分页信息过滤和限制文档数
        // 使用 await 关键字等待 countDocuments 方法的返回值
        const total = await Spu.countDocuments({ category3Id }); // 统计所有的 SPU 文档的数量，根据 category3Id 过滤
        // 计算总页数
        const pages = Math.ceil(total / size);
        // 构造返回的数据对象
        const data = {
            records, // SPU 文档的数组
            total, // SPU 文档的总数
            size, // 每页的文档数
            current: pageNo ? +pageNo : defaultPage, // 当前的页码
            searchCount: true, // 是否进行了搜索
            pages // 总页数
        };
        // 给前端返回一个 200 的状态码和一个成功的消息，以及数据对象
        res.status(200).json({ code: 200, message: 'Success', data });
    } catch (err) {
        // 如果有错误，打印错误信息
        console.error(err);
        // 给前端返回一个 500 的状态码和一个错误的消息
        res.status(500).send('Internal Server Error');
    }
});




// 导出路由对象
module.exports = router;