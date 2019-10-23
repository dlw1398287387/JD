const config = require('../config');
const uuid = require('uuid');
const util = require('../resource/utils');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const debug = require('debug')('abc');

/**
 * 用户注册
 * @param {*} ctx 
 * @param {*} registerData 
 */
async function createUserImpl(ctx, registerData) {
    var openId = "wavlink_" + uuid.v1().split('-').join('');
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop")
            dbo.collection("wav_users").find({ email: registerData.email }).toArray(function (err, res) {
                if (err) throw err;
                console.log(res);
                if (res.length <= 0) {
                    var data = {
                        openId: openId,
                        email: registerData.email,
                        Password: jwt.sign(registerData.Password, config.secret),
                        CheckPassword: jwt.sign(registerData.CheckPassword, config.secret),
                        phone: registerData.phone,
                        createTime: util.getTime(),
                        lang: JSON.stringify(registerData)
                    };
                    dbo.collection("wav_users").insertOne(data, function (err, res) {
                        if (err) throw err;
                        db.close();
                        console.log(res);
                        resolv({ status: "Success", msg: "注册成功!" });
                    })
                } else {
                    reject({ status: "failing", msg: "此邮箱已被注册过了！" });
                }
            });
        });
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 用户登录 
 * @param {*} ctx 
 * @param {*} loginData 
 */
async function UserLoginImpl(ctx, loginData) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            console.log("连接成功");
            var dbo = db.db("petshop");
            var where = { email: loginData.email };
            dbo.collection("wav_users").find(where).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                if (!res.length <= 0) {
                    console.log(res);
                    if (loginData.email == res[0].email && jwt.verify(res[0].Password, config.secret) == loginData.Password) {
                        resolv({ status: "Success", openId: jwt.sign(res[0].openId, config.secret), session_key: "absdawdwa" });
                    } else {
                        reject({ status: "failing", msg: "账户错误或者密码错误，请重新输入！" });
                    }
                } else {
                    reject({ status: "failing", msg: "您输入的账户不存在，请前往注册！" });
                }
            });
        });
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 查询用户
 * @param {*} ctx 
 * @param {*} updateuserInfo 
 */
async function findByUserInfoImpl(ctx) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) };
            console.log(JSON.parse(ctx.header.authorization).openId);
            dbo.collection("wav_users").find(where).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                if (res) {
                    res[0].CheckPassword = "";
                    res[0].Password = "";
                    delete res[0].lang;
                    console.log(res[0]);
                    resolv(res[0]);
                } else {
                    reject({ status: "failing", msg: "查无此人" })
                }
            })
        })
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 修改用户个人资料
 * @param {*} ctx 
 * @param {*} updateuserInfo 
 */
async function UpdateUserImpl(ctx, updateuserInfo) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) };
            console.log(where);
            dbo.collection("wav_users").updateMany(where, updateuserInfo, function (err, res) {
                if (err) throw err;
                db.close();
                console.log(res);
                if (res.result.nModified == 1) {
                    resolv({ status: "Success", msg: "更新成功！" });
                } else {
                    reject({ status: "failing", msg: "修改失败" });
                }
            });
        });
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 查询数据库可用验证码
 * @param {*} ctx 
 * @param {*} updatePassword 
 */
async function findByEmailCodeImpl(ctx) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("auth_session").find({}).toArray(function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res);
                reject({ status: "failing", msg: "网络异常，邮件发送错误！" })
            })
        })
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 修改用户登录密码
 * @param {*} ctx 
 * @param {*} updatePassword //修改密码参数集
 */
async function UpdatePasswordImpl(ctx, updatePassword) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) };
            dbo.collection('wav_users').updateMany(where, updatePassword, function (err, res) {
                if (err) throw err;
                db.close();
                if (res.result.nModified == 1) {
                    resolv({ status: "Success", msg: "修改成功" });
                } else {
                    reject({ status: "failing", msg: "修改失败" });
                }
            });
        });
    }).catch(res => {
        console.log(res);
        return res;
    });
}

/**
 * 修改绑定手机
 * @param {*} ctx 
 * @param {*} updatePhones 
 */
async function UpdatePhoneImpl(ctx, updatePhones) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) };
            dbo.collection('wav_users').updateMany(where, updatePhones, function (err, res) {
                if (err) throw err;
                db.close();
                if (res.result.nModified == 1) {
                    console.log(res)
                    resolv({ status: "Success", msg: "修改成功" });
                } else {
                    reject({ status: "failing", msg: "修改失败" });
                }
            })
        })
    }).catch(res => {
        console.log(res);
        return res;
    })
}

/**
 * 修改绑定邮箱
 * @param {*} ctx 
 * @param {*} updateEmails 
 */
async function UpdateEmailImpl(ctx, updateEmails) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            var where = { openId: jwt.verify(JSON.parse(ctx.header.authorization).openId, config.secret) };
            dbo.collection('wav_users').updateMany(where, updateEmails, function (err, res) {
                if (err) throw err;
                db.close();
                if (res.result.nModified == 1) {
                    resolv({ status: "Success", msg: "修改成功" });
                } else {
                    reject({ status: "failing", msg: "修改失败" });
                }
            })
        })
    }).catch(res => {
        console.log(res);
        return res;
    })
}

module.exports = {
    createUserImpl,
    UserLoginImpl,
    findByUserInfoImpl,
    UpdateUserImpl,
    findByEmailCodeImpl,
    UpdatePasswordImpl,
    UpdatePhoneImpl,
    UpdateEmailImpl
}