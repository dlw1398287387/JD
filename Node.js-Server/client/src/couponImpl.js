const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function findByCouponImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("coupon").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function GetBycouponImpl(whereStr, insertStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("user_coupon").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                console.log(res)
                if (res.length == 0) {
                    dbo.collection("user_coupon").insertOne(insertStr, function (err, res) {
                        if (err) throw err;
                        resolv({ code: "200", msg: "领取成功！立即去使用吧！" });
                        db.close();
                    })
                } else {
                    resolv({ code: "202", msg: "您已领取该优惠卷！" });
                    db.close();
                }
            })
        })
    })
}


async function findByMyCouponImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("user_coupon").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

module.exports = {
    findByCouponImpl,
    GetBycouponImpl,
    findByMyCouponImpl
}