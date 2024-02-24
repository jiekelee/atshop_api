// 引入 mongoose 模块
import mongoose from 'mongoose';

// 定义一个用于存储计数器的 schema
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // 计数器的名称
  seq: { type: Number, default: 0 } // 计数器的当前值
});

// 创建一个计数器的模型
const counter = mongoose.model('counter', CounterSchema);

// 定义商品属性的数据模式
const ProductAttrSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 自增的 id 字段
  createTime: { type: Date, default: Date.now }, // 默认为当前时间
  updateTime: { type: Date, default: Date.now }, // 默认为当前时间
  attrName: String, // 属性名称
  categoryId: Number, // 所属分类的 id
  categoryLevel: Number, // 所属分类的级别
  attrValueList: [ // 属性值列表
    {
      id: { type: Number, unique: true }, // 自增的 id 字段
      createTime: { type: Date, default: Date.now }, // 默认为当前时间
      updateTime: { type: Date, default: Date.now }, // 默认为当前时间
      valueName: String, // 属性值名称
      attrId: Number // 所属属性的 id
    }
  ]
});

// 在保存文档之前钩子函数，用于自增 id 字段和更新时间字段
ProductAttrSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // 如果不是新建文档，则更新 updateTime 字段为当前时间
    this.updateTime = new Date(Date.now());
    return next();
  }

  try {
    // 查找最大的 id 值
    const maxId = await mongoose.model('productAttr').findOne().sort('-id').select('id').lean();
    this.id = maxId ? (maxId as unknown as {id: number}).id + 1 : 1; // 设置 id 字段的值为最大 id 值加 1
    next();
  } catch (error) {
    next(error);
  }

  try {
    // 查找最大的 id 值
    const maxId = await mongoose.model('productAttr').findOne().sort('-id').select('id').lean();
    this.id = maxId ? (maxId as unknown as {id: number}).id + 1 : 1; // 设置 id 字段的值为最大 id 值加 1
    next();
  } catch (error) {
    next(error);
  }
});

// 在保存商品属性文档之前，执行以下操作
// ProductAttrSchema.pre('save', async function (next) {
//   const doc = this; // 获取当前文档的引用
//   try {
//     // 根据计数器的名称，更新并返回计数器的当前值
//     const counterResult = await counter.findByIdAndUpdate({ _id: 'productAttrId' }, { $inc: { seq: 1 } }, { new: true });
//     doc.id = counterResult.seq; // 将计数器的当前值赋给文档的 id 字段
//     next(); // 继续执行下一个中间件
//   } catch (error) {
//     next(error); // 如果发生错误，传递给下一个中间件
//   }
// });

// // 对于属性值列表中的每个元素，也要执行类似的操作
// ProductAttrSchema.path('attrValueList').schema.pre('save', async function (next) {
//   const doc = this; // 获取当前文档的引用
//   try {
//     // 根据计数器的名称，更新并返回计数器的当前值
//     const counterResult = await counter.findByIdAndUpdate({ _id: 'attrValueId' }, { $inc: { seq: 1 } }, { new: true });
//     doc.id = counterResult.seq; // 将计数器的当前值赋给文档的 id 字段
//     next(); // 继续执行下一个中间件
//   } catch (error) {
//     next(error); // 如果发生错误，传递给下一个中间件
//   }
// });


// 创建一个商品属性的模型
const productAttr = mongoose.model('productAttr', ProductAttrSchema);

// 导出商品属性的模型
export default productAttr;
