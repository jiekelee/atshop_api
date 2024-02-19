// 引入所需的库
// const mongoose = require('mongoose');
import mongoose from 'mongoose'

// 创建一个数据模式
const brandSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 自增的 id 字段
  tmName: String,
  logoUrl: String,
  createTime: { type: Date, default: Date.now }, // 默认为当前时间
  updateTime: { type: Date, default: Date.now } // 默认为当前时间
});

// 在保存文档之前钩子函数，用于自增 id 字段和更新时间字段
brandSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // 如果不是新建文档，则更新 updateTime 字段为当前时间
    this.updateTime = new Date(Date.now());
    return next();
  }

  try {
    // 查找最大的 id 值
    const maxId = await mongoose.model('Brand').findOne().sort('-id').select('id').lean();
    this.id = maxId ? (maxId as unknown as {id: number}).id + 1 : 1; // 设置 id 字段的值为最大 id 值加 1
    next();
  } catch (error) {
    next(error);
  }
});

// 创建一个数据模型
const Brand2 = mongoose.model('Brand', brandSchema);

// 导出数据模型
// module.exports = Brand2;

export default Brand2
