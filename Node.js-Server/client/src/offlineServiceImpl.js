const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

async function findByCityServiceImpl(whereStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("offlineService").aggregate(whereStr).toArray(function (err, res) {
                if (err) throw err;
                resolv(res);
                db.close();
            })
        })
    })
}

module.exports = {
    findByCityServiceImpl
}