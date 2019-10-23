var users = require('../src/Users');
var Email = require('../src/Email');
const usMtthods = require('../src/usMethod');
const util = require('../resource/utils');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * 创建用户
 * @param {*} ctx 
 */
async function createUsers(ctx) {
    var registerData = {
        email: ctx.request.body.email,
        Password: ctx.request.body.Password,
        CheckPassword: ctx.request.body.CheckPassword,
        phone: ctx.request.body.phone,
        createTime: util.getTime(),
    };
    console.log(registerData);
    var data = await users.createUserImpl(ctx, registerData);
    ctx.body = data;
}

/**
 * 用户登录
 * @param {*} ctx 
 */
async function AdminLogin(ctx) {
    var loginData = {
        email: ctx.request.body.email,
        Password: ctx.request.body.Password
    };
    var data = await users.UserLoginImpl(ctx, loginData);
    ctx.body = data;
}

/**
 * 查询个人资料
 * @param {*} ctx 
 */
async function findByUserInfo(ctx) {
    var data = await users.findByUserInfoImpl(ctx);
    ctx.body = data;
}

/**
 * 修改用户资料
 * @param {*} ctx 
 */
async function updateUsers(ctx) {
    var updateuserInfo = {
        $set: {
            updateTime: util.getTime(),
            nickName: ctx.request.body.nickName,
            ShopName: ctx.request.body.ShopName,
            description: ctx.request.body.description,
            storeCity: ctx.request.body.storeCity,
            storeAddress: ctx.request.body.storeAddress,
            storeLocation: ctx.request.body.storeLocation,
            form: ctx.request.body.form,
            to: ctx.request.body.to,
            userAvatar: ctx.request.body.userAvatar
        }
    };
    var data = await users.UpdateUserImpl(ctx, updateuserInfo);
    ctx.body = data;
}

/**
 * 用户获取邮箱验证码
 * @param {*} ctx 
 */
async function findByEmailCode(ctx) {
    var data = await users.findByEmailCodeImpl(ctx);
    var ran = Math.ceil(Math.random() * 25);
    var emaildatas = await Email.SendEmail(ctx.request.body.email, data[ran].auth_code);
    ctx.body = emaildatas;
}

/**
 * 用户修改登录密码
 * @param {*} ctx 
 */
async function updatePassword(ctx) {
    var auth_code = ctx.request.body.auth_code;
    var auth = await usMtthods.findBy_(auth_code);
    console.log(auth)
    if (auth_code == auth[0].auth_code) {
        var updatePassword = {
            $set: {
                updateTime: util.getTime(),
                Password: jwt.sign(ctx.request.body.Password, config.secret),
                CheckPassword: jwt.sign(ctx.request.body.CheckPassword, config.secret),
            }
        };
        var data = await users.UpdatePasswordImpl(ctx, updatePassword);
        ctx.body = data;
    } else {
        ctx.body = { code: "401", msg: "验证码错误!" };
    }
}

/**
 * 用户修改绑定手机号
 * @param {*} ctx 
 */
async function updatePhone(ctx) {
    var auth_code = ctx.request.body.auth_code;
    var auth = await usMtthods.findBy_(auth_code);
    if (auth_code == auth[0].auth_code) {
        var updatePhones = {
            $set: {
                updateTime: util.getTime(),
                phone: ctx.request.body.Phone
            }
        };
        var data = await users.UpdatePhoneImpl(ctx, updatePhones);
        ctx.body = data;
    } else {
        ctx.body = { code: "401", msg: "验证码错误!" };
    }
}

/**
 * 用户修改绑定邮箱
 * @param {*} ctx 
 */
async function updateEmil(ctx) {
    var auth_code = ctx.request.body.auth_code;
    var auth = await usMtthods.findBy_(auth_code);
    if (auth_code == auth[0].auth_code) {
        var updateEmails = {
            $set: {
                updateTime: util.getTime(),
                email: ctx.request.body.email
            }
        };
        var data = await users.UpdateEmailImpl(ctx, updateEmails);
        ctx.body = data;
    } else {
        ctx.body = { code: "401", msg: "验证码错误!" };
    }
}

module.exports = {
    createUsers,
    AdminLogin,
    findByUserInfo,
    updateUsers,
    findByEmailCode,
    updatePassword,
    updatePhone,
    updateEmil
}