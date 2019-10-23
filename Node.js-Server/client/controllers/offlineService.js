const offlineServiceImpl = require('../src/offlineServiceImpl')
const config = require("../config")
const jwt = require("jsonwebtoken")
const util = require('../resource/utils')

/**
 * 查询以用户经纬度内（10公里以内的城市服务）
 */
async function findByCityService(ctx) {
    var classifys = ctx.request.body.classify
    var lan = ctx.request.body.lan
    var lat = ctx.request.body.lat
    console.log(classifys)
    console.log(lan)
    console.log(lat)
    var whereStr = [{
        $geoNear: {
            near: { type: "Point", coordinates: [lan, lat] },
            key: "storeLocation",
            distanceField: "dist", //两点间的距离  以米为单位
            query: { "classify": { $all: [classifys] } }, //筛选条件
        }
    }]
    console.log(whereStr)
    await offlineServiceImpl.findByCityServiceImpl(whereStr).then(res => {
        ctx.body = res
    }).catch(e => {
        console.log(e);
        ctx.body = { code: "201", msg: "查询失败！" }
        throw e;
    })
}

module.exports = {
    findByCityService
}