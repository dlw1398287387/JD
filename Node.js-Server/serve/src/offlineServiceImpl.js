const MongoClient = require('mongodb').MongoClient
const config = require('../config')

async function createOfflineServiceImpl(optionStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('offlineService').insertOne(optionStr, function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

async function findByOfflineListImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("offlineService").find(whereStr).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

module.exports = {
    createOfflineServiceImpl,
    findByOfflineListImpl
}