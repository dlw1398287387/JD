const router = require('koa-router')({
  prefix: '/petshop/v1/api'
})


const controllers = require('../controllers/test')
const controllersUser = require('../controllers/User')
const controllersProduct = require('../controllers/Product')
const controllersOrders = require('../controllers/orders')
const controllersCoupon = require('../controllers/coupon')
const controllersOffline = require('../controllers/offlineService')

/**
 * 创建用户
 */
router.post('/createUser', controllersUser.createUser)
/**
 * 用户登录
 */
router.post('/Userlogin', controllersUser.login)

router.post('/testpost', controllers.testPOSTrouter)

/**
 * 查询产品 携带产品类型参数
 */
router.post('/findByProduct', controllersProduct.findByProduct)

/**
 * 查询优惠卷
 */
router.post('/findByCoupon', controllersCoupon.findByCoupon)

/**
 *领取优惠卷 
 */
router.post('/GetBycoupon', controllersCoupon.GetBycoupon)

/**
 * 查询我的优惠卷
 */
router.post('/findByMyCoupon', controllersCoupon.findByMyCoupon)

/**
 * 添加购物车
 */
router.post('/AddtoCart', controllersProduct.AddtoCart)

/**
 * 查询购物车
 */
router.post('/findByShoppingCart', controllersProduct.findByShoppingCart)

/**
 * 删除购物车商品
 */
router.post('/DeleteCartComm', controllersProduct.DeleteCartComm)

/**
 * 提交订单
 */
router.post('/submitOrder', controllersProduct.submitOrder)

/**
 * 提交购物车订单（一次新增多个）
 */
router.post('/submitCartOrder', controllersProduct.submitCartOrder)

/**
 * 查看订单
 */
router.post('/findByOrders', controllersOrders.findByOrders)

/**
 * 确认收货
 */
router.post('/UpdateOrderState', controllersOrders.UpdateOrderState)

/**
 *添加商品评价 
 */
router.post('/AddEvaluation', controllersOrders.AddEvaluation)

/**
 * 查询id产品的商品评论
 */
router.post('/findByEvaluation', controllersProduct.findByEvaluation)

/**
 * 查询店铺
 */
router.post('/findByShop', controllersProduct.findByShop)

/**
 * 搜索关键词商品
 */
router.post('/searchProductList', controllersProduct.searchProductList)

/**
 * 添加喜欢的商品
 */
// router.post('/insertBeFond', controllersProduct.insertBeFond)

/**
 * 查询城市服务
 */
router.post('/findByCityService', controllersOffline.findByCityService)

// router.post('/:id', controllers.testIdrouter)
module.exports = router
