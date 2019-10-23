const userImpl = require('../src/UserImpl')
const util = require('../resource/utils')
const config = require('../config')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')


async function createUser(ctx) {
    var myobj = {
        openId: "wavlink_" + uuid.v1().split('-').join(''),
        username: ctx.request.body.username,
        password: jwt.sign(ctx.request.body.Password, config.secret),
        createTime: util.getTime(),
    }
    await userImpl.createUserImpl(myobj).then(res => {
        ctx.body = { openId: jwt.sign(myobj.openId, config.secret) }
    }).catch(e => {
        console.log(e)
        ctx.body = e;
        throw e;
    })
}

async function login(ctx) {
    var loginData = {
        username: ctx.request.body.username,
        password: ctx.request.body.Password,
    }
    await userImpl.loginImpl(loginData).then(res => {
        console.log(res)
        if (res.length > 0) {
            if (ctx.request.body.username == res[0].username && ctx.request.body.Password == jwt.verify(res[0].password, config.secret)) {
                ctx.body = { openId: jwt.sign(res[0].openId, config.secret) }
            } else {
                ctx.body = "用户名或者密码错误！"
            }
        } else {
            ctx.body = "改用户不存在!"
        }

    }).catch(e => {
        console.log(e)
        ctx.body = e;
        throw e;
    })
}

module.exports = {
    createUser,
    login
}