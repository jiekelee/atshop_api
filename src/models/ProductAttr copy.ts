// 引入 mongoose 模块
import mongoose from 'mongoose';

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
  try {
    // 查找最大的 id 值
    const maxId = await mongoose.model('productAttr').findOne().sort('-id').select('id').lean();
    this.id = maxId ? (maxId as unknown as {id: number}).id + 1 : 1; // 设置 id 字段的值为最大 id 值加 1
    next();
  } catch (error) {
    next(error);
  }
});

// 定义商品属性的数据模型
const ProductAttr = mongoose.model('ProductAttr', ProductAttrSchema);

// 导出商品属性的数据模型
export default ProductAttr;
