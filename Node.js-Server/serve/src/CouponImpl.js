const MongoClient = require('mongodb').MongoClient
const config = require('../config')

async function AddCouponImpl(insertStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('coupon').insertOne(insertStr, function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function findByCouponListImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('coupon').find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function DeleteCouponImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("coupon").deleteOne(whereStr, function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

module.exports = {
    AddCouponImpl,
    findByCouponListImpl,
    DeleteCouponImpl
}