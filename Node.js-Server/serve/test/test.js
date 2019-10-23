const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service:'163',
    secureConnection:true,
    auth: {
        user: '15908619974@163.com',
        pass: 'chenbida1997'
    }
});

smtpTransport.sendMail({
    from: '15908619974@163.com',
    to: '18924674362@163.com',
    subject: '邮件验证码！',
    html: "<p>hello 陈必达  LOD143</p>"
}, function (err, res) {
    console.log(err)
    console.log(res)
})



