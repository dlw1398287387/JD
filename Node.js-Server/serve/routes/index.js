const router = require('koa-router')({
  prefix: '/System/v1/api'
})

const controllersUser = require('../controllers/Users')
const FileImplementation = require('../controllers/FileImplementation')
const controllersProduct = require('../controllers/Product')
const controllersOrders = require('../controllers/orders')
const controllersCoupon = require('../controllers/Coupon')
const controllersOffline = require('../controllers/offlineService')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

/**
 * 创建管理员
 */
router.post('/createUsers', controllersUser.createUsers)

/**
 * 管理员登录
 */
router.post('/AdminLogin', controllersUser.AdminLogin)

/**
 * 查询个人资料
 */
router.post('/findByUserInfo', controllersUser.findByUserInfo)

/**
 * 完善个人资料
 */
router.put('/updateUsers', controllersUser.updateUsers)

/**
 * 获取邮箱验证码
 */
router.post('/findByEmailCode', controllersUser.findByEmailCode)

/**
 * 修改个人账户密码
 */
router.patch('/updatePassword', controllersUser.updatePassword)

/**
 * 修改绑定手机
 */
router.patch('/updatePhone', controllersUser.updatePhone)

/**
 * 修改绑定邮箱
 */
router.patch('/updateEmil', controllersUser.updateEmil)

/**
 * 文件上传
 */
router.post('/upload', FileImplementation.fileUpload)

/**
 * 评论图片上传
 */
router.post('/commentImg', FileImplementation.commentImg)

/**
 * 文件删除
 */
router.post('/DeleteFile', FileImplementation.DeleteFile)

/**
 * 新增产品
 */
router.post('/createProduct', controllersProduct.createProduct)

/**
 * 查询产品列表
 */
router.post('/findByProductList', controllersProduct.findByProductList)

/**
 * 查询产品详情
 */
router.post('/findByProductDetails', controllersProduct.findByProductDetails)

/**
 * 修改产品
 */
router.post('/UpdateByProduct', controllersProduct.UpdateByProduct)

/**
 * 添加变种
 */
router.post('/UpdateByVersionInfo', controllersProduct.UpdateByVersionInfo)

/**
 * 修改变种子集
 */
router.post('/UpdateByVersionInfoSubset', controllersProduct.UpdateByVersionInfoSubset)

/**
 * 删除变种
 */
router.post('/DeleteByVersionInfoSubset', controllersProduct.DeleteByVersionInfoSubset)

/**
 * 修改详情图片/添加
 */
router.post('/UpdateByDetailsImg', controllersProduct.UpdateByDetailsImg)

/**
 * 删除产品
 */
router.post('/DeleteByProduct', controllersProduct.DeleteByProduct)

/**
 * 查看订单
 */
router.post('/findByOrders', controllersOrders.findByOrders)

/**
 * 修改订单状态
 */
router.post('/UpdateByOrderState', controllersOrders.UpdateByOrderState)

/**
 * 添加优惠卷
 */
router.post('/AddCoupon', controllersCoupon.AddCoupon)

/**
 * 优惠卷列表
 */
router.post('/findByCouponList', controllersCoupon.findByCouponList)

/**
 * 删除优惠卷
 */
router.post('/DeleteCoupon', controllersCoupon.DeleteCoupon)

/**
 * 添加线下城市服务
 */
router.post('/createOfflineService', controllersOffline.createOfflineService)

/**
 * 查询线下城市服务列表
 */
router.post('/findByOfflineList', controllersOffline.findByOfflineList)

module.exports = router
