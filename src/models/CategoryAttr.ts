// 分类属性
// 引入所需的库
// const mongoose = require('mongoose');
import mongoose from 'mongoose'

// 创建一个数据模式
const Category_1Schema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 自增的 id 字段
  ctName: String,
  createTime: { type: Date, default: Date.now }, // 默认为当前时间
  updateTime: { type: Date, default: Date.now } // 默认为当前时间
});

// 在保存文档之前钩子函数，用于自增 id 字段和更新时间字段
Category_1Schema.pre('save', async function (next) {
  if (!this.isNew) {
    // 如果不是新建文档，则更新 updateTime 字段为当前时间
    this.updateTime = new Date(Date.now());
    return next();
  }

  try {
    // 查找最大的 id 值
    const maxId = await mongoose.model('Category_1').findOne().sort('-id').select('id').lean();
    this.id = maxId ? (maxId as unknown as {id: number}).id + 1 : 1; // 设置 id 字段的值为最大 id 值加 1
    next();
  } catch (error) {
    next(error);
  }
});

// 创建一个数据模型
const Category_1 = mongoose.model('Category_1', Category_1Schema);
// 查找或创建 Category_1 模型的一个实例
// const category = await mongoose.model('Category_1').findOrCreate({ ctName: 'test' });

// 导出数据模型
export default Category_1;
