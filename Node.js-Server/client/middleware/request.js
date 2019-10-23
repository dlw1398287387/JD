var config = require("../config")
var jwt = require('jsonwebtoken')


module.exports = async function (ctx, next) {
    try {
        console.log(ctx)
        if (ctx.path == "/petshop/v1/api/createUser") {
            return await next();
        } 
        if (ctx.path == "/petshop/v1/api/Userlogin") {
            return await next();
        }
        else {
            var userHeaders = ctx.header.authorization;
            var userId = jwt.verify(userHeaders, config.secret);
            console.log("身份验证：", userId);
            await next();
        }
    }
    catch (e) {
        console.error(e);
        ctx.body = { code: "405", msg: "身份验证错误，请您重新登录！" };
    }
}