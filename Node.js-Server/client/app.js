const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const sslify = require('koa-sslify').default;
const cors = require('koa2-cors')
const index = require('./routes/index')
const request = require('./middleware/request')
const koa_body = require('koa-body')

app.use(koa_body({
  multipart: true,
  formidable: {
    maxFileSize: 2 * 1024 * 1024
  }
}))

app.use(cors());
//ssl
// app.use(sslify());

// error handler
onerror(app)

//绑定身份验证中间件
app.use(request);


// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
