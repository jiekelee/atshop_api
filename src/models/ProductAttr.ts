import mongoose from 'mongoose';

// 定义自增计数器模式
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

// 创建自增计数器模型
const Counter = mongoose.model('Counter', CounterSchema);

// 商品属性模式
const ProductAttrSchema = new mongoose.Schema({
  id: { type: Number, unique: true, default: 1 }, // 自增的 id 字段，设置默认值为 1
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  attrName: String,
  categoryId: Number,
  categoryLevel: Number,
  attrValueList: [
    {
      id: { type: Number, unique: true, default: 1 }, // 自增的 id 字段，设置默认值为 1
      createTime: { type: Date, default: Date.now },
      updateTime: { type: Date, default: Date.now },
      valueName: String,
      attrId: Number,
      _id: false // 设置 _id 选项为 false
    }
  ]
});

// 在保存前为id字段生成自增值
ProductAttrSchema.pre('save', async function (next) {
  const doc = this;
  // 如果是新文档，则为id字段生成自增值
  if (!doc.isNew) return next();
  try {
    const counter = await Counter.findByIdAndUpdate(
      'productattr_id',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.id = counter.seq;
    next();
  } catch (error) {
    return next(error);
  }
});

// 在保存前为attrValueList中的id字段生成自增值
ProductAttrSchema.pre('save', async function (next) {
  const doc = this;
  // 如果是新文档，则为attrValueList中的id字段生成自增值
  if (!doc.isNew) {
    return next();
  }
  try {
    const counter = await Counter.findByIdAndUpdate(
      'attrvaluelist_id',
      { $inc: { seq: doc.attrValueList.length } }, // 根据数组长度增加序列号
      { new: true, upsert: true }
    );

    for (const attrValue of doc.attrValueList) {
      attrValue.id = counter.seq++;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

// 更新操作时触发钩子函数
ProductAttrSchema.pre('updateOne', async function (next) {
  const doc = this as any;
  console.log('!updateOne is here');
  try {
    // 获取更新操作中要添加的属性值列表
    const attrValueList = doc.getUpdate().$push.attrValueList;
    console.log(attrValueList);

    // 获取当前计数器值
    // const counter = await Counter.findById('attrvaluelist_id');
    // if (!counter || typeof counter.seq !== 'number') {
    //   console.error('Counter document is invalid or not found');     
    // }
    // console.log('seq is' + counter.seq);
    const counter = await Counter.findByIdAndUpdate('attrvaluelist_id',
      { $inc: { seq: attrValueList.length } },
      { new: true, upsert: true }
    );
    // console.log('counter :' + counter);
    

    // 为每个属性值对象生成自增id
    for (const attrValue of attrValueList) {
      attrValue.id = counter.seq++;
    }
    next();
  } catch (error) {
    return next(error);
  }
});



// 创建商品属性模型
const ProductAttr = mongoose.model('ProductAttr', ProductAttrSchema);

export default ProductAttr;
