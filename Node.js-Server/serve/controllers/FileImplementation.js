const fs = require('fs');
const path = require('path');

/**
 * 文件上传
 * @param {*} ctx 
 */
async function fileUpload(ctx) {
    try {
        var email = ctx.query.email;
        var file = ctx.request.files.file;
        const reader = fs.createReadStream(ctx.request.files.file.path); //创建文件读取流
        var filePath = path.join(__dirname, '../public/images/', email) + `/${file.name}`;//文件写入地址
        //判断此文件夹是否存在，
        var dirStatus = await examineMkdir(path.join(__dirname, '../public/images/', email));
        if (dirStatus) {
            console.log("文件存在");
        } else {
            console.log("文件不存在");
            //当此文件目录不存在时创建他
            var createDir = await mkdir(path.join(__dirname, '../public/images/', email));
            if (createDir) {
                console.log("创建成功");
            } else {
                //如果创建失败直接返回错误请求，告知用户
                console.log("创建失败");
            }
        }
        const upSteam = fs.createWriteStream(filePath)//创建文件写入流
        reader.pipe(upSteam)//可读流通过管道写入可写流
        ctx.body = { fileurl: "http://192.168.10.102:8089/" + email + `/${file.name}` };
    } catch (e) {
        console.error(e);
    }
}

/**
 * 删除文件
 */
async function DeleteFile(ctx) {
    try {
        var statemFile = path.join(__dirname, '../public/images', ctx.request.body.UserMir)
        var data = await examineMkdir(statemFile)
        if (data) {
            var isTrue = DeleteFils(statemFile)
            if (isTrue) {
                console.log("删除成功")
                ctx.body = "删除成功";
            }else{
                console.log("删除失败")
                ctx.body = "删除失败";
            }
        } else {
            ctx.body = "文件不存在";
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * 删除文件
 * @param {} dir 
 */
async function DeleteFils(path) {
    return new Promise((resolv, reject) => {
        fs.unlink(path, function (err) {
            if (err) {
                throw err;
                resolv(false)
            }
            resolv(true)
        })
    })
}

/**
 * 检测文件夹目录是否存在
 * @param {*} dir 
 */
async function examineMkdir(dir) {
    return new Promise((resolv, reject) => {
        fs.exists(dir, function (exists) {
            if (exists) {
                resolv(true)
            }
            if (!exists) {
                resolv(false)
            }
        })
    })
}

/**
 * 创建文件夹目录
 * @param {*} dir 
 */
async function mkdir(dir) {
    return new Promise((resolv, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolv(false)
            } else {
                resolv(true)
            }
        })
    })
}

async function commentImg(ctx){
    var email = ctx.query.email;
    var file = ctx.request.files.file;
    console.log(email)
    console.log(file)
    const reader = fs.createReadStream(ctx.request.files.file.path); //创建文件读取流
    var filePath = path.join(__dirname, '../public/images/comment') + `/${email+file.name}`;//文件写入地址
    const upSteam = fs.createWriteStream(filePath)//创建文件写入流
    reader.pipe(upSteam)//可读流通过管道写入可写流
    ctx.body={ fileurl: "http://192.168.10.102:8089/comment"+ `/${email+file.name}` };
}

module.exports = {
    fileUpload,
    DeleteFile,
    commentImg
}