const couponImpl = require('../src/CouponImpl')
const util = require('../resource/utils')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function AddCoupon(ctx) {
    var insertStr = {
        couponId: "cou" + util.generateProductId(),
        merchantOpenId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret),
        ShopName: ctx.request.body.ShopName,
        startingTime: ctx.request.body.buildTime.from,
        endTime: new Date(ctx.request.body.buildTime.to), //由于mongodb系统时间缺少8小时，处理一下
        classify: ctx.request.body.classify,
        couponDesc: ctx.request.body.couponDesc,
        couponTags: ctx.request.body.couponTags,
        couponType: ctx.request.body.couponType,
        priceFull: ctx.request.body.priceFull,
        priceSubtract: ctx.request.body.priceSubtract,
        createTime: util.getTime()
    }
    console.log(insertStr)
    await couponImpl.AddCouponImpl(insertStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "优惠卷添加成功！" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "服务器繁忙，稍后重试！" }
        throw e;
    })
}

async function findByCouponList(ctx) {
    var whereStr = {
        merchantOpenId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret)
    }
    await couponImpl.findByCouponListImpl(whereStr).then(res => {
        console.log(res)
        ctx.body = res;
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "服务器繁忙，稍后重试！" };
        throw e;
    })
}


async function DeleteCoupon(ctx) {
    var whereStr = {
        couponId: ctx.request.body.couponId,
    }
    await couponImpl.DeleteCouponImpl(whereStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "优惠卷删除成功！" }
        }
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "服务器繁忙，稍后重试！" };
        throw e;
    })
}

module.exports = {
    AddCoupon,
    findByCouponList,
    DeleteCoupon
}