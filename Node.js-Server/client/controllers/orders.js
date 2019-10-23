const ordersImpl = require('../src/ordersImpl');
const config = require("../config")
const jwt = require("jsonwebtoken")
const util = require('../resource/utils')

async function findByOrders(ctx) {
    var where = { userOpenId: jwt.verify(ctx.header.authorization, config.secret) };
    await ordersImpl.findByOrdersImpl(where).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "查询失败！" }
    })
}

async function UpdateOrderState(ctx) {
    var whereStr = { OrderId: ctx.request.body.orderId };
    var updateStr = { $set: { orderState: ctx.request.body.orderState } };
    await ordersImpl.UpdateOrderStateImpl(whereStr, updateStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: 200, msg: "确认收货，订单状态修改成功！" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: 201, msg: "系统出现错误！订单状态修改失败！" }
        throw e;
    })
}

async function AddEvaluation(ctx) {
    var insertStr = {
        userOpenId: ctx.request.body.userOpenId,
        merchantOpenId: ctx.request.body.merchantOpenId,
        OrderId: ctx.request.body.OrderId,
        productId: ctx.request.body.productId,
        grade: ctx.request.body.grade,
        defalutSelect: ctx.request.body.defalutSelect,
        evaluateText: ctx.request.body.evaluateText,
        evaluateImg: ctx.request.body.evaluateImg,
        createTime:util.getTime()
    }
    var whereStr = {
        productId: ctx.request.body.productId,
    }
    var updateStr = {
        $inc: { "commentSum": +1, "grade": +ctx.request.body.grade }
    }
    console.log(insertStr);
    await ordersImpl.AddEvaluationImpl(insertStr, whereStr, updateStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: 200, msg: "评论成功!" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: 201, msg: "评论失败！系统繁忙！" }
    })
}

module.exports = {
    findByOrders,
    UpdateOrderState,
    AddEvaluation
}