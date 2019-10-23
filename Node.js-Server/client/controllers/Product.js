const ProductImpl = require('../src/ProductImpl');
const config = require("../config")
const jwt = require("jsonwebtoken")
const util = require('../resource/utils')


async function findByProduct(ctx) {
    // var where = { "classify": { $in: [ctx.request.body.classify] } };
    var where = {
        classify: {
            $in: ctx.request.body.classify
        }
    };
    console.log(where)
    await ProductImpl.findByProductImpl(where).then(res => {
        console.log(res);
        ctx.body = res;
    }).catch(e => {
        console.log(e);
        throw e;
    })
}

async function AddtoCart(ctx) {
    console.log(ctx.header.authorization)
    if (ctx.header.authorization == null) {
        ctx.body = "你的登录身份过期，请重新登录！"
    } else {
        var obj = {
            CartId: "6080" + util.generateProductId(),
            productId: ctx.request.body.productId,
            UserOpenId: jwt.verify(ctx.header.authorization, config.secret),
            putaway_type: ctx.request.body.putaway_type,
            classify: ctx.request.body.classify,
            ShopName: ctx.request.body.ShopName,
            productImg: ctx.request.body.productImg,
            productName: ctx.request.body.productName,
            description: ctx.request.body.description,
            defalutSelect: ctx.request.body.defalutSelect,
            original_Price: ctx.request.body.original_Price,
            merchantId: ctx.request.body.merchantId,
            statu: true,//有待修改
        }
        await ProductImpl.AddtoCartImpl(obj).then(res => {
            console.log(res)
            ctx.body = res
        }).catch(e => {
            console.log(e);
            throw e;
        })
    }
}

async function findByShoppingCart(ctx) {
    var where = {
        UserOpenId: jwt.verify(ctx.header.authorization, config.secret),
    }
    await ProductImpl.findByShoppingCartImpl(where).then(res => {
        console.log(res)
        ctx.body = res
    }).catch(e => {
        console.log(e);
        throw e;
    })
}

async function DeleteCartComm(ctx) {
    var whereStr = {
        UserOpenId: jwt.verify(ctx.header.authorization, config.secret),
        CartId: { $in: ctx.request.body.CartId },
    }
    console.log(whereStr)
    await ProductImpl.DeleteCartCommImpl(whereStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "删除成功！" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "删除失败！" }
        throw e;
    })
}


async function submitOrder(ctx) {
    var obj = {
        OrderId: util.generateProductId(),
        userOpenId: jwt.verify(ctx.header.authorization, config.secret),
        productId: ctx.request.body.productId,
        merchantOpenId: ctx.request.body.merchantOpenId,
        putaway_type: ctx.request.body.putaway_type,
        classify: ctx.request.body.classify,
        productImg: ctx.request.body.productImg,
        productName: ctx.request.body.productName,
        description: ctx.request.body.description,
        defalutSelect: ctx.request.body.defalutSelect,
        original_Price: ctx.request.body.original_Price,
        leaveAmessage: ctx.request.body.leaveAmessage,
        invoice: ctx.request.body.invoice,
        orderState: 1,
        consignee: ctx.request.body.consignee,
        createTime: util.getTime()
    }

    var where = { "productId": obj.productId, "versionInfo.type": { $all: [obj.defalutSelect.type] }, "versionInfo.versions": { $all: [obj.defalutSelect.versions] } };
    var update = { $inc: { "versionInfo.$.inventory": -obj.defalutSelect.count } }
    console.log(obj)
    console.log(where)
    console.log(update)
    await ProductImpl.submitOrderImpl(obj, where, update).then(res => {
        console.log(res)
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "购买成功！" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "提交失败！" }
        throw e;
    })
}

async function submitCartOrder(ctx) {
    //获取前端参数
    var array = ctx.request.body.order;
    //循环中将购物车ID存入变量
    var deleteArr = []
    //删除用户ID 为**** 中购物车ID的商品
    var whereStr = {
        UserOpenId: jwt.verify(ctx.header.authorization, config.secret),
        CartId: { $in: deleteArr },
    }
    //修改库存查找条件
    var inventoryWhere = [];
    //修改库存结果
    var inventoryCount = [];
    //循环将条件遍历出来
    for (var i = 0; i < array.length; i++) {
        array[i].OrderId = util.generateProductId()
        //遍历将多个json数据添加用户ID，
        array[i].userOpenId = jwt.verify(ctx.header.authorization, config.secret)
        array[i].createTime = util.getTime()
        //添加订单状态
        array[i].orderState = 1
        //添加购物车商品ID
        deleteArr.push(array[i].CartId)
        inventoryWhere.push({ "productId": array[i].productId, "versionInfo.type": { $all: [array[i].defalutSelect.type] }, "versionInfo.versions": { $all: [array[i].defalutSelect.versions] } });
        inventoryCount.push({ $inc: { "versionInfo.$.inventory": -array[i].defalutSelect.count } })
        delete array[i].CartId //将集合中的购物车商品ID 删除掉，在订单中不需要。
    }
    await ProductImpl.submitCartOrderImpl(array, whereStr, inventoryWhere, inventoryCount).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "购买成功！" }
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "提交失败！" }
        throw e;
    })
}

async function findByEvaluation(ctx) {
    var whereStr = { productId: ctx.request.body.productId }
    await ProductImpl.findByEvaluationImpl(whereStr).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "服务器繁忙！稍后重试！" }
        throw e;
    })
}

async function findByShop(ctx) {
    var whereStr = { openId: ctx.request.body.openId }
    await ProductImpl.findByShopImpl(whereStr).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "服务器繁忙！稍后重试！" }
        throw e;
    })
}

async function searchProductList(ctx) {
    // let arr = new Set(["狗","狗粮","服饰","猫","猫粮","服饰","小宠","水族","爬行","","",""])
    var whereStr = { "productName": { $regex: ctx.request.body.searchText } };
    await ProductImpl.searchProductListImpl(whereStr).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "服务器繁忙！稍后重试！" }
        throw e;
    })
}

module.exports = {
    findByProduct,
    AddtoCart,
    findByShoppingCart,
    DeleteCartComm,
    submitOrder,
    submitCartOrder,
    findByEvaluation,
    findByShop,
    searchProductList
}
