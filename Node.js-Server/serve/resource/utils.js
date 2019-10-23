function getTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}
/**
 * 获取N位随机数
 * @param {} n 
 */
function randomn(n) {
    if (n > 21) return null
    return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

function pad2(n) { return n < 10 ? '0' + n : n }

/**
 * 随机数 加上 时间戳
 */
function generateProductId() {
    var date = new Date();
    var time = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds())
    var num = randomn(4)
    return num + "" + time
}


module.exports = {
    getTime,
    generateProductId
}