const ordersImpl = require('../src/ordersImpl')
const jwt = require('jsonwebtoken')
const config = require('../config')
const util = require('../resource/utils')

async function findByOrders(ctx) {
    var where = { merchantOpenId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret), orderState: ctx.request.body.findBystate };
    await ordersImpl.findByOrdersImpl(where).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "查询失败，可能是您的身份验证信息过期或失效！" }
        throw e
    })
}

async function UpdateByOrderState(ctx) {
    var whereStr = { OrderId: ctx.request.body.orderId };
    var updateStr = { $set: { updateTime: util.getTime(), orderState: ctx.request.body.orderState, trackingNumbers: ctx.request.body.trackingNumbers } };
    await ordersImpl.UpdateByOrderStateImpl(whereStr, updateStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "更新成功" };
        }
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "服务器繁忙！稍后重试！" };
        throw e;
    })
}



module.exports = {
    findByOrders,
    UpdateByOrderState,
    
}