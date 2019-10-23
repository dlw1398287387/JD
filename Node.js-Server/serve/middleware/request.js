var config = require("../config")
var jwt = require('jsonwebtoken')


module.exports = async function (ctx, next) {
    try {
        console.log(ctx)
        if (ctx.url == "/System/v1/api/createUsers") {
            return await next();
        } 
        if (ctx.url == "/System/v1/api/AdminLogin") {
            return await next();
        }
        if(ctx.path == "/System/v1/api/upload"){
            return await next();
        }
        if(ctx.path == "/System/v1/api/commentImg"){
            return await next();
        }  
        else {
            console.log(ctx.header.authorization);
            var userHeaders = JSON.parse(ctx.header.authorization);
            var userId = jwt.verify(userHeaders.openId, config.secret);
            console.log("身份验证：", userId);
            await next();
        }
    }
    catch (e) {
        console.error(e);
        ctx.body = { code: "405", msg: "身份验证错误，请您重新登录！" };
    }
}