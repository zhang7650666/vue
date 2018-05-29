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
});
//查询商品列表
router.get("/", function(req, res, next) {
    var sort = parseInt(req.query.sort) || 1;
    var page = parseInt(req.query.page) || 1;
    var pageSize = parseInt(req.query.pageSize) || 8;
    var priceLeave = req.query.priceLeave;
    var skip = (page - 1) * pageSize
    var params = {};
    var priceStart = 0;
    var priceEnd = 0;
    if (priceLeave != "all") {
        switch (priceLeave) {
            case "0":
                priceStart = 0;
                priceEnd = 500;
                break;
            case "1":
                priceStart = 500;
                priceEnd = 1000;
                break;
            case "2":
                priceStart = 1000;
                priceEnd = 2000;
                break;
            case "3":
                priceStart = 2000;
                priceEnd = 4000;
                break;
        };
        params = {
            productPrice: {
                $gt: priceStart,
                $lte: priceEnd
            }
        }
        console.log(params)
    }
    var goodsModel = Goods.find(params).skip(skip).limit(pageSize);

    goodsModel.sort({ 'productPrice': sort })
    goodsModel.exec(function(err, data) {
        fnErr(res, err) //错误函数封装
        res.json({
            status: "0",
            Msg: "",
            result: {
                count: data.length,
                Data: data
            }
        })

    })

});
// 加入购物车
router.post("/addCart", function(req, res, next) {
    var userId = "1000000072";
    var productId = req.body.productId
    var User = require("../models/user.js");
    console.log(2)
    User.findOne({}, function(err, userData) {
        console.log(3)
        fnErr(res, err) //错误函数封装
        if (userData) {
            console.log(4)
            Goods.findOne({ "productId": productId }, function(err, productData) {
                console.log(5)
                fnErr(res, err) //错误函数封装
                if (!productData) {
                    console.log(6)
                    productData.productNum = 1;
                    productData.checked = true;
                    productData.cartList.push(productData);
                    productData.save(function(err, result) {
                        console.log(7)
                        fnErr(res, err) //错误函数封装
                        console.log(8)
                        res.json({
                            status: "0",
                            Msg: '',
                            result: 'success'
                        })
                    })
                }
            })
        }


    })
});
//错误函数封装
function fnErr(res, err) {
    if (err) {
        res.json({
            status: "1",
            Msg: err.message,
        });
        return;
    }
}
module.exports = router;