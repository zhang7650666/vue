var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods.js');
mongoose.connect("mongodb://127.0.0.1:27017/demo");
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
    var userId = "100000077";
    var productId = req.body.params.productId
    var User = require("../models/user.js");
    
    User.findOne({"userId":userId}, function(err, userData) {
        
        fnErr(res, err) //错误函数封装
        if (userData) {
            var goodsItem = false;
            userData.cartList.forEach(function(item,index){
                if(item.productId == productId){
                    goodsItem = true;
                    item.productNum ++
                }
            });
            if(goodsItem){
                console.log(1)
                userData.save(function(err, result) {
                    fnErr(res, err) //错误函数封装
                    res.json({
                        status: "0",
                        Msg: '',
                        result: 'success'
                    })
                })
            }else{
                console.log(2)
                Goods.findOne({ "productId": productId }, function(err, productData) {
                    fnErr(res, err) //错误函数封装
                    if(productData) {
                        productData.productNum = 1;
                        productData.checked = true;
                        userData.cartList.push(productData);                     
                        userData.save(function(err, result) {
                            
                            fnErr(res, err) //错误函数封装
                           
                            res.json({
                                status: "0",
                                Msg: '',
                                result: 'success'
                            })
                        })
                    }
                })
            }
           
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