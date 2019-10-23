const config = require('../config')
const MongoClient = require("mongodb").MongoClient

async function createUserImpl(myobj) {
    new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("clientUsers").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function loginImpl(loginData) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { username: loginData.username };
            dbo.collection("clientUsers").find(where).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

module.exports = {
    createUserImpl,
    loginImpl
}