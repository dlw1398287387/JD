const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function findByOrdersImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("orders").find(where).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function UpdateOrderStateImpl(whereStr, updateStr) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('orders').updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function AddEvaluationImpl(insertStr, whereStr, updateStr) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('comment').insertOne(insertStr, function (err, res) {
                if (err) throw err;
                if (res.result.n == 1 && res.result.ok == 1) {
                    dbo.collection('wav_product').updateOne(whereStr, updateStr, function (err, res) {
                        if (err) throw err;
                        console.log(res)
                        if (res.result.n == 1 && res.result.ok == 1) {
                            dbo.collection('orders').updateOne({ OrderId: insertStr.OrderId }, { $set: { orderState: 0 } }, function (err, res) {
                                if (err) throw err;
                                console.log(res)
                                resolv(res);
                                db.close();
                            })
                        }
                    })
                }
            })
        })
    })
}

module.exports = {
    findByOrdersImpl,
    UpdateOrderStateImpl,
    AddEvaluationImpl
}