const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

/**
 * 验证此验证码是否存在
 * @param {*} auth 
 */
async function findBy_(auth) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { auth_code: auth };
            dbo.collection('auth_session').find(where).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                db.close();
                if (res) {
                    resolv(res);
                } else {
                    reject({ code: "405", msg: "验证码不存在，错误！" });
                }
            })
        })
    })
}

module.exports = {
    findBy_
}