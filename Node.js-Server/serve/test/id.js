const MongoClient = require("mongodb").MongoClient
const config = require('../config')



// // // 设置过期索引！
// // MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
// //     if (err) throw err;
// //     var dbo = db.db("petshop");
// //     dbo.collection('coupon').createIndex({ "endTime": 1 }, { expireAfterSeconds: 0 }, function (err, res) {
// //         console.log(res)
// //         // db.close();
// //     })
// // })

// var now1 = new Date();
// now1.setMinutes(now1.getMinutes() + 1);
// console.log(now1)

// MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("petshop");
//     dbo.collection('coupon').insertOne({ 'endTime': now1, "name": "1.5折卷" }, function (err, res) {
//         if (err) throw err;
//         console.log(res)
//         db.close();
//     })
// })



// var now = new Date("2019-07-24 09:34:19");
// now.setHours(now.getHours());
// console.log(now)
// console.log(Math.round(new Date().getTime()/1000))



// var arrStr = [
//     { grade: 2540, commentSum: 27 },
//     { grade: 500, commentSum: 6 },
//     { grade: 1500, commentSum: 20 },
//     { grade: 2500, commentSum: 30 },
//     { grade: 700, commentSum: 7 },
//     { grade: 600, commentSum: 8 }
// ]
// function maopaoSort(arr) {
//     // 数组元素从大到小排序
//     for (var i = 0; i < arr.length; i++) {
//         //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
//         for (var j = i; j < arr.length; j++) {
//             if (arr[i].commentSum < arr[j].commentSum) {
//                 //如果arr[j]大就把此时的值赋值给最大值变量max
//                 maxStr = arr[j];
//                 arr[j] = arr[i];
//                 arr[i] = maxStr;
//             }
//         };
//     };
//     return arr;
// }
// function maopaoSort2(arr) {
//     // 数组元素从大到小排序
//     for (var i = 0; i < arr.length; i++) {
//         //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
//         for (var j = i; j < arr.length; j++) {
//             if (arr[i].grade/arr[i].commentSum < arr[j].grade/arr[j].commentSum) {
//                 //如果arr[j]大就把此时的值赋值给最大值变量max
//                 maxStr = arr[j];
//                 arr[j] = arr[i];
//                 arr[i] = maxStr;
//             }
//         };
//     };
//     return arr;
// }
// console.log(maopaoSort(arrStr))
// console.log(maopaoSort2(arrStr))

// var begintime_ms = Date.parse(new Date(begintime.replace(/-/g, "/"))); //begintime 为开始时间

// var endtime_ms = Date.parse(new Date(endtime.replace(/-/g, "/")));   // endtime 为结束时间
var date1=new Date("2019-08-09 15:38:00");  //开始时间
var date2=new Date("2019-08-11 16:03:49");    //结束时间
var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数

//计算出相差天数
var days=Math.floor(date3/(24*3600*1000))
//计算出小时数
var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
var hours=Math.floor(leave1/(3600*1000))
//计算相差分钟数
var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
var minutes=Math.floor(leave2/(60*1000))
//计算相差秒数
var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
var seconds=Math.round(leave3/1000)

console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")