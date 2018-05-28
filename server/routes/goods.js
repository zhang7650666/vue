var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods.js');
mongoose.connect("mongodb://127.0.0.1:27017/test");
mongoose.connection.on("connected", function() {
    console.log("mongoDB collected successs");
});
mongoose.connection.on("error", function() {
    console.log("mongoDB collected fail");
})
mongoose.connection.on("disconnected", function() {
    console.log("mongoDB collected disconnected");
})
router.get("/", function(req, res, next) {
    var sort = req.query.sort;
    var page = parseInt(req.query.page);
    var pageSize = parseInt(req.query.pageSize);
    var skip = (page - 1) * pageSize
    var params = {};
    var goodsModel = Goods.find(params).skip(skip).limit(pageSize).sort({ 'salePrice': sort });
    goodsModel.exec(function(err, doc) {
            if (err) {
                res.json({
                    status: "1",
                    Msg: err.message
                });
                return;
            } else {
                res.json({
                    Data: doc
                })

            }
        })
        // res.send({
        //     status: "0",
        //     Msg: "",
        //     result: {
        //         count: data.length,
        //         list: data
        //     }
        // })
});
module.exports = router;