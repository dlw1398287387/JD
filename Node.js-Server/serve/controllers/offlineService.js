const utils = require('../resource/utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const offlineServiceImpl = require('../src/offlineServiceImpl')

/**
 * 添加线下产品服务
 * @param {*} ctx 
 */
async function createOfflineService(ctx) {
    var optionStr = {
        productId: utils.generateProductId(),
        merchantOpenId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret),
        productStatus: 0,
        classify: ctx.request.body.classify,
        productName: ctx.request.body.productName,
        description: ctx.request.body.description,
        storeCity: ctx.request.body.storeCity,
        storeAddress: ctx.request.body.storeAddress,
        storeLocation: ctx.request.body.storeLocation,
        storeName: ctx.request.body.storeName,
        storePhone: ctx.request.body.storephone,
        price: ctx.request.body.price,
        productImg: ctx.request.body.productImg,
        businessHours: ctx.request.body.businessHours,
        createTime: utils.getTime(),
        commentSum: 0,
        grade: 0
    }
    await offlineServiceImpl.createOfflineServiceImpl(optionStr).then(res => {
        console.log(res)
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: 201, msg: "请求错误！" }
        throw e;
    })
}

/**
 * 商家查询线下服务产品
 */
async function findByOfflineList(ctx) {
    var whereStr = {
        merchantOpenId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret)
    }
    await offlineServiceImpl.findByOfflineListImpl(whereStr).then(res => {
        console.log(res)
        ctx.body = res
    }).catch(e => {
        console.log(e)
        ctx.body = { code: 201, msg: "请求错误！" }
        throw e;
    })
}


module.exports = {
    createOfflineService,
    findByOfflineList
}