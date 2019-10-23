
async function testIdrouter(ctx){
    console.log(ctx)
    console.log(ctx.params.id)
    ctx.body="ID路由"
}

async function testPOSTrouter(ctx){
    console.log(ctx.query.username)
    ctx.body="POST路由";
}


module.exports = {
    testIdrouter,
    testPOSTrouter
}