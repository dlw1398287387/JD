/**
 * 由于加入了 邮箱验证，所以自定义几条固定的验证码，
 * （自生成验证码比较麻烦，1.生成随机6位代码，2.还要加入过期时间。目前的环境没有redis不太好管理。）
 */
var MongoClient = require("mongodb").MongoClient;
const config = require('../config');
console.log(MongoClient)

MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("petshop");
    var data = [
        { auth_code: "RXT580" },
        { auth_code: "QWE147" },
        { auth_code: "KLI001" },
        { auth_code: "UID985" },
        { auth_code: "ASC247" },
        { auth_code: "CDB123" },
        { auth_code: "WQR789" },
        { auth_code: "LOD143" },
        { auth_code: "AQI189" },
        { auth_code: "ADW143" },
        { auth_code: "UID156" },
        { auth_code: "IOD348" },
        { auth_code: "IUB124" },
        { auth_code: "GHX332" },
        { auth_code: "QUB832" },
        { auth_code: "AKM781" },
        { auth_code: "AWM125" },
        { auth_code: "UID412" },
        { auth_code: "OIU569" },
        { auth_code: "AXZ417" },
        { auth_code: "UID333" },
        { auth_code: "WAS899" },
        { auth_code: "LIO444" },
        { auth_code: "YUD896" },
        { auth_code: "DYT148" },
        { auth_code: "LIS145" },
    ];
    dbo.collection("auth_session").insertMany(data, function (err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
    })
})