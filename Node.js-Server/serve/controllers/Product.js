const ProductImpl = require('../src/ProductImpl')
const utils = require('../resource/utils')
const jwt = require("jsonwebtoken");
const config = require('../config')

async function createProduct(ctx) {
    var products = {
        productId: utils.generateProductId(),
        productStatus: '1',
        putaway_type: ctx.request.body.putaway_type,
        classify: ctx.request.body.classify,
        buildTime: ctx.request.body.buildTime,
        productName: ctx.request.body.productName,
        description: ctx.request.body.description,
        defalutSelect: { price: ctx.request.body.price, inventory: ctx.request.body.inventory, type: ctx.request.body.type, versions: ctx.request.body.versions, },
        versionInfo: [{ price: ctx.request.body.price, inventory: ctx.request.body.inventory, type: ctx.request.body.type, versions: ctx.request.body.versions, }],
        original_Price: ctx.request.body.original_Price,
        productImg: ctx.request.body.productImg,
        openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret),
        ShopName: ctx.request.body.ShopName,
        commentSum:0,
        grade:0,
    }
    await ProductImpl.createProductImpl(products).then(res => {
        ctx.body = res;
    }).catch(e => {
        console.log(e)
    })
}

async function findByProductList(ctx) {
    var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) }
    await ProductImpl.findByProductListImpl(where).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e)
    })
}

async function findByProductDetails(ctx) {
    var where = { productId: ctx.request.body.productId }
    console.log(where)
    await ProductImpl.findByProductDetailsImpl(where).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
    })
}

async function UpdateByProduct(ctx) {
    var where = { productId: ctx.request.body.productId };
    var updateData = {
        $set: {
            productId: ctx.request.body.productId,
            productStatus: ctx.request.body.productStatus,
            putaway_type: ctx.request.body.putaway_type,
            classify: ctx.request.body.classify,
            buildTime: ctx.request.body.buildTime,
            productName: ctx.request.body.productName,
            description: ctx.request.body.description,
            defalutSelect: ctx.request.body.versionInfo[0],
            versionInfo: ctx.request.body.versionInfo,
            original_Price: ctx.request.body.original_Price,
            productImg: ctx.request.body.productImg,
            openId: ctx.request.body.openId,
            updateTime: utils.getTime(),
        }
    };
    await ProductImpl.UpdateByProductImpl(where, updateData).then(res => {
        console.log(res)
        if (res.result.n == 1 && res.result.nModified == 1 && res.result.ok == 1) {
            ctx.body = "更新成功!";
        } else {
            ctx.body = "更新失败!";
        }
    }).catch(e => {
        console.log(e);
        ctx.body = "更新失败!";
    })
}


async function DeleteByProduct(ctx) {
    var where = { productId: ctx.request.body.productId }
    await ProductImpl.DeleteByProductImpl(where).then(res => {
        if (res.result.n == 1 && res.result.ok == 1) {
            ctx.body = "删除成功!";
        } else {
            ctx.body = "删除失败!";
        }
    }).catch(e => {
        console.log(e);
        ctx.body = "更新失败!";
    })
}

async function UpdateByVersionInfo(ctx) {
    var where = { productId: ctx.request.body.productId };
    var data = {
        $set: {
            versionInfo: ctx.request.body.versionInfo
        }
    };
    await ProductImpl.UpdateByProductImpl(where, data).then(res => {
        console.log(res)
        if (res.result.n == 1 && res.result.nModified == 1 && res.result.ok == 1) {
            ctx.body = "更新成功!";
        } else {
            ctx.body = "更新失败!";
        }
    }).catch(e => {
        console.log(e);
        ctx.body = "更新失败!";
    })
}

async function UpdateByVersionInfoSubset(ctx) {
    var whereStr = {
        productId: ctx.request.body.productId,
        "versionInfo.type": { $all: [ctx.request.body.raw] },
        "versionInfo.versions": { $all: [ctx.request.body.row] }
    }
    var updateStr = {
        $set: {
            "versionInfo.$.type": ctx.request.body.type,
            "versionInfo.$.versions": ctx.request.body.versions,
            "versionInfo.$.price": ctx.request.body.price,
            "versionInfo.$.inventory": ctx.request.body.inventory
        }
    }
    await ProductImpl.UpdateByVersionInfoSubsetImpl(whereStr, updateStr).then(res => {
        console.log(res)
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "更新成功！" }
        }
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "修改失败！" }
        throw e;
    })
}

async function DeleteByVersionInfoSubset(ctx) {
    var whereStr = {
        productId: ctx.request.body.productId,
    }
    var updateStr = {
        $pull: {
            versionInfo: { type: ctx.request.body.raw, versions: ctx.request.body.row }
        }
    }
    await ProductImpl.DeleteByVersionInfoSubsetImpl(whereStr, updateStr).then(res => {
        if (res.result.ok == 1) {
            ctx.body = { code: "200", msg: "删除成功！" };
        }
    }).catch(e => {
        console.log(e)
        ctx.body = { code: "201", msg: "删除失败！" };
        throw e;
    })
}

async function UpdateByDetailsImg(ctx) {
    var where = { productId: ctx.request.body.productId };
    var data = {
        $set: {
            ImgDetails: ctx.request.body.ImgDetails
        }
    };
    await ProductImpl.UpdateByProductImpl(where, data).then(res => {
        console.log(res)
        if (res.result.n == 1 && res.result.nModified == 1 && res.result.ok == 1) {
            ctx.body = "更新成功!";
        } else {
            ctx.body = "更新失败!";
        }
    }).catch(e => {
        console.error(e)
        ctx.body = "更新失败!";
    })
}

module.exports = {
    createProduct,
    findByProductList,
    findByProductDetails,
    UpdateByProduct,
    DeleteByProduct,
    UpdateByVersionInfo,
    UpdateByVersionInfoSubset,
    DeleteByVersionInfoSubset,
    UpdateByDetailsImg
}