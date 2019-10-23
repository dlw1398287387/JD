const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function findByProductImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('wav_product').find(where).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function AddtoCartImpl(obj) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            //为了防止同一件商品添加2次购物车，在前台显示出来的不一样，我们添加购物车时查询一次添加产品的ID 以及 变种，
            //如果变种 产品ID  type   versions  在购物车中存在，则在value字段中+1. 不存在就添加。
            var examine = { "productId": obj.productId, "defalutSelect.type": obj.defalutSelect.type, "defalutSelect.versions": obj.defalutSelect.versions };
            dbo.collection("ShoppingCart").find(examine).toArray(function (err, res) {
                if (err) throw err;
                if (res.length <= 0) {
                    dbo.collection("ShoppingCart").insertOne(obj, function (err, res1) {
                        if (err) throw err;
                        db.close();
                        resolv(res1)
                    })
                } else {
                    var productId = { productId: obj.productId }
                    var update = { $set: { count: res[0].count + obj.count } }
                    dbo.collection("ShoppingCart").updateOne(productId, update, function (err, res2) {
                        if (err) throw err;
                        db.close();
                        resolv(res2)
                    })
                }
                db.close();
            })

        })
    })
}

async function findByShoppingCartImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("ShoppingCart").find(where).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function DeleteCartCommImpl(whereStr) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("ShoppingCart").deleteMany(whereStr, function (err, res) {
                if (err) throw err;
                resolv(res)
                db.close();
            })
        })
    })
}

async function submitOrderImpl(obj, where, update) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("orders").insertOne(obj, function (err, res) {
                if (err) throw err;
                if (res.result.ok == 1) {
                    dbo.collection("wav_product").updateOne(where, update, { "multi": true }, function (err, res1) {
                        if (err) throw err;
                        resolv(res)
                        db.close();
                    })
                }
                db.close();
            })
        })
    })
}

async function submitCartOrderImpl(array, whereStr, inventoryWhere, inventoryCount) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("orders").insertMany(array, function (err, res) {//购买，加入订单表
                if (err) throw err;
                if (res.result.ok == 1) {
                    dbo.collection("ShoppingCart").deleteMany(whereStr, function (err, res) {//删除购买的购物车商品
                        if (err) throw err;
                    })
                    for (var i = 0; i < inventoryWhere.length; i++) {//修改库存
                        dbo.collection("wav_product").updateMany(inventoryWhere[i], inventoryCount[i], { "multi": true }, function (err, res) {
                            if (err) throw err;
                        })
                    }
                    resolv(res);
                    db.close();
                }
                db.close();
            })
        })
    })
}

async function findByEvaluationImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("comment").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function findByShopImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function searchProductListImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").find(whereStr).sort({ commentSum: -1 }).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

module.exports = {
    findByProductImpl,
    AddtoCartImpl,
    findByShoppingCartImpl,
    DeleteCartCommImpl,
    submitOrderImpl,
    submitCartOrderImpl,
    findByEvaluationImpl,
    findByShopImpl,
    searchProductListImpl
}