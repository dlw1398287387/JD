const MongoClient = require('mongodb').MongoClient;
const config = require('../config');


async function createProductImpl(products) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db('petshop');
            dbo.collection('wav_product').insertOne(products, function (err, res) {
                if (err) throw err;
                db.close();
                console.log(res)
                resolv(res)
            })
        })
    })
}

async function findByProductListImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('wav_product').find(where).toArray((err, res) => {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function findByProductDetailsImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('wav_product').find(where).toArray((err, res) => {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function UpdateByProductImpl(where, updateData) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection('wav_product').updateOne(where, updateData, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}


async function UpdateByVersionInfoSubsetImpl(whereStr, updateStr) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res);
            })
        })
    })
}

async function DeleteByVersionInfoSubsetImpl(whereStr,updateStr) {
    return new Promise((resolv) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").updateOne(whereStr,updateStr, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res)
            })
        })
    })
}

async function DeleteByProductImpl(where) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").deleteOne(where, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res);
            })
        })
    })
}

async function UpdateByVersionInfoImpl(where, data) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").updateOne(where, data, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res);
            })
        })
    })
}


async function UpdateByDetailsImgImpl(where, data) {
    return new Promise((resolv, reject) => {
        MongoClient.connect(config.Mongose.url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("petshop");
            dbo.collection("wav_product").updateOne(where, data, function (err, res) {
                if (err) throw err;
                db.close();
                resolv(res);
            })
        })
    })
}

module.exports = {
    createProductImpl,
    findByProductListImpl,
    findByProductDetailsImpl,
    UpdateByProductImpl,
    UpdateByVersionInfoSubsetImpl,
    DeleteByVersionInfoSubsetImpl,
    DeleteByProductImpl,
    UpdateByVersionInfoImpl,
    UpdateByDetailsImgImpl

}