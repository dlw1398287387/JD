const couponImpl = require('../src/couponImpl');
const config = require("../config")
const jwt = require("jsonwebtoken")
const util = require('../resource/utils')

async function findByCoupon(ctx) {
    var whereStr = { "merchantOpenId": ctx.request.body.merchantOpenId, "classify": { $in: [ctx.request.body.classify, "ALL"] } }
    await couponImpl.findByCouponImpl(whereStr).then(res => {
        console.log(res)
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "查询失败！" }
        throw e;
    })
}

async function GetBycoupon(ctx) {
    var whereStr = {
        userOpenId: jwt.verify(ctx.header.authorization, config.secret),
        couponId: ctx.request.body.couponId,
    }
    var insertStr = {
        userOpenId: jwt.verify(ctx.header.authorization, config.secret),
        couponId: ctx.request.body.couponId,
        merchantOpenId: ctx.request.body.merchantOpenId,
        classify: ctx.request.body.classify,
        couponDesc: ctx.request.body.couponDesc,
        couponTags: ctx.request.body.couponTags,
        startingTime: ctx.request.body.startingTime,
        expirationTime: new Date(ctx.request.body.endTime),
        priceFull: ctx.request.body.priceFull,
        priceSubtract: ctx.request.body.priceSubtract,
    }
    await couponImpl.GetBycouponImpl(whereStr, insertStr).then(res => {
        ctx.body = res;
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "领取失败，服务器繁忙！" };
    })
}

async function findByMyCoupon(ctx) {
    var whereStr = {
        userOpenId: jwt.verify(ctx.header.authorization, config.secret),
    }
    await couponImpl.findByMyCouponImpl(whereStr).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "领取失败！" };
        throw e;
    })
}

module.exports = {
    findByCoupon,
    GetBycoupon,
    findByMyCoupon
}