import mongoose from 'mongoose';

// 定义一个 SPU 的数据模式
const SpuSchema = new mongoose.Schema({
    id: { type: Number, unique: true, default: 1 }, // SPU 的 id，自增的 id 字段，设置默认值为 1
    createTime: { type: Date, default: Date.now }, // SPU 的创建时间，设置默认值为当前时间
    updateTime: { type: Date, default: Date.now }, // SPU 的更新时间，设置默认值为当前时间
    spuName: String, // SPU 的名称
    description: String, // SPU 的描述
    category3Id: Number, // SPU 的三级分类 id
    tmId: Number, // SPU 的品牌 id
    spuSaleAttrList: String, // SPU 的销售属性列表
    spuImageList: String, // SPU 的图片列表
    spuPosterList: String // SPU 的海报列表
  });
  
  // 定义一个 SPU 的数据模型
  const Spu = mongoose.model('Spu', SpuSchema);

  // 定义一个插入测试数据的函数
async function insertTestData() {
    // 创建一个 SPU 的对象，包含一条测试数据
    const spu = new Spu({
      id: 10009,
      spuName: '华硕',
      description: '遥遥领先的品牌',
      category3Id: 14,
      tmId: 1,
      spuSaleAttrList: null,
      spuImageList: null,
      spuPosterList: null
    });

    const spu1 = new Spu({
        id: 10010,
        spuName: '惠普',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      const spu2 = new Spu({
        id: 10011,
        spuName: '戴尔',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      const spu3 = new Spu({
        id: 10012,
        spuName: '宏基',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      const spu4 = new Spu({
        id: 10013,
        spuName: '机械革命',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      const spu5 = new Spu({
        id: 10014,
        spuName: '微软',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      const spu6 = new Spu({
        id: 10015,
        spuName: '小米',
        description: '遥遥领先的品牌',
        category3Id: 14,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null
      });

      spu.save()
      spu1.save()
      spu2.save()
      spu3.save()
      spu4.save()
      spu5.save()
      spu6.save()
  
    // 使用 save 方法来插入 SPU 的测试数据
    // spu.save()
    //   .then(result => console.log('Inserted test data successfully', result))
    //   .catch(err => console.error('Failed to insert test data', err));
  }
  
  // 调用插入测试数据的函数
  insertTestData();

  export default Spu