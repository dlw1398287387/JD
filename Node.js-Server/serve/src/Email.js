const nodemailer = require('nodemailer')
const config = require('../config')

/**
 * 发送邮箱验证码!
 * @param {*} email 
 * @param {*} auth_code 
 */
async function SendEmail(email, auth_code) {
    return new Promise((resolv, reject) => {
        const smtpTransport = nodemailer.createTransport({
            service: config.Email.service,
            secureConnection: config.Email.secureConnection,
            auth: {
                user: config.Email.user,
                pass: config.Email.pass
            }
        });
        smtpTransport.sendMail({
            from: config.Email.from,
            to: email,
            subject: '邮件验证码！',
            text: "验证码:" + auth_code
        }, function (err, res) {
            console.log(err)
            console.log(res)
            if (res) {
                resolv({ code: "1", msg: "邮件发送成功，请查收" })
            }
            if (err) {
                reject({ code: "401", msg: "网络异常，邮件发送错误！" })
            }
        })
    }).catch(res => {
        console.log(res)
        return res
    })
}

module.exports = {
    SendEmail
}