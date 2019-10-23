const MongoClient = require('mongodb').MongoClient
const config = require('../config')

async function findByOrdersImpl(where) { 
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('orders').find(where).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function UpdateByOrderStateImpl(whereStr, updateStr) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("orders").updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

module.exports = {
    findByOrdersImpl,
    UpdateByOrderStateImpl
}