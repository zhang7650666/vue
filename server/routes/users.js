var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
require("../util/util.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/login", function(req, res, next) {
    var parmas = {
        "userName": req.body.username,
        "userPwd": req.body.userPwd,
    };
    User.findOne(parmas, function(err, data) {
        if (err) {
            fnErr(res, err);
            return;
        }

        if (data) {
            //存cookie
            res.cookie("userId", data.userId, {
                path: "/",
                maxAge: 1000 * 60 * 60 * 24
            });
            res.cookie("username", data.userName, {
                path: "/",
                maxAge: 1000 * 60 * 60 * 24
            });
            //存 session
            //res.session.user = data;
            res.json({
                status: "0",
                Msg: '',
                result: {
                    username: data.userName
                }
            })
        } else {
            res.json({
                status: "2",
                Msg: '用户不存在，或者用户名或者密码错误',
            })
        }

    })
});
//登出
router.post("/logout", function(req, res, next) {
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1,
    });
    res.cookie("username", "", {
        path: "/",
        maxAge: -1,
    })
    res.json({
        status: "0",
        Msg: '清除成功',
    })
})

//校验登录
router.get("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            "status": "0",
            "Msg": "已登录",
            "result": req.cookies.username,
        })
    } else {
        res.json({
            "status": "1",
            "Msg": "未登录",
            "result": [],
        })
    }
});
//查询当前用户的购物车 数据
router.post("/cartList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ "userId": userId }, function(err, data) {
        if (err) {
            fnErr(res, err);
            return;
        };
        if (data) {
            res.json({
                "status": "0",
                "Msg": "success",
                "result": data.cartList
            })
        } else {
            res.json({
                "status": "2",
                "Msg": "用户不存在"
            })
        }
    })
});
//删除购物车一条数据
router.post("/cartDel", function(req, res, next) {
        let productId = req.body.productId;
        let userId = req.cookies.userId;
        console.log(productId)
        User.update({ "userId": userId }, { $pull: { "cartList": { "productId": productId } } }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            res.json({
                "status": "0",
                "Msg": "数据删除成功",
                "result": data
            })

        })
    })
    //减少一条数据
router.post("/cartEdit", function(req, res, next) {
        let productId = req.body.productId;
        let userId = req.cookies.userId;
        let productNum = req.body.productNum;
        User.update({ "userId": userId, "cartList.productId": productId }, { "cartList.$.productNum": productNum }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            res.json({
                "status": "0",
                "Msg": "修改成功",
                "result": data
            })

        })
    })
    //选中
router.post("/checked", function(req, res, next) {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let checked = req.body.checked;
    if (productId) {
        User.update({ "userId": userId, "cartList.productId": productId }, { "cartList.$.checked": checked }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            res.json({
                "status": "0",
                "Msg": "修改成功",
                "result": data
            })
        })
    } else {
        User.findOne({ "userId": userId }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            if (data) {
                data.cartList.forEach(item => {
                    item.checked = checked
                });
                data.save(function(err, doc) {
                    if (err) {
                        fnErr(res, err);
                        return;
                    };
                    res.json({
                        "status": "0",
                        "Msg": "修改成功",
                        "result": 'success'
                    })
                })
            }


        })
    }

});
//配送地址接口
router.post("/address", function(req, res, next) {
        let userId = req.cookies.userId
        User.findOne({ "userId": userId }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            res.json({
                "status": "0",
                "Msg": "success",
                "result": data.addressList
            })
        })
    })
    //设置默认配送地址
router.post("/setDefault", function(req, res, next) {
        let userId = req.cookies.userId;
        let addressId = req.body.addressId;
        if (!addressId) {
            res.json({
                status: "1001",
                Msg: '没有用户addressId',
            });
        }
        User.findOne({ "userId": userId }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            data.addressList.forEach((item) => {
                if (item.addressId == addressId) {
                    item.isDefault = true
                } else {
                    item.isDefault = false;
                };
            })
            data.save(function(err, doc) {
                if (err) {
                    fnErr(res, err);
                    return;
                };
                res.json({
                    "status": "0",
                    "Msg": "设置成功",
                    result: addressId
                })
            })
        })
    })
    //删除一条配送地址
router.post("/addressDel", function(req, res, next) {
        let userId = req.cookies.userId;
        let addressId = req.body.addressId;
        if (!addressId) {
            res.json({
                status: "1001",
                Msg: '没有用户addressId',
            });
        }
        User.update({ "userId": userId }, { $pull: { "addressList": { "addressId": addressId } } }, function(err, data) {
            if (err) {
                fnErr(res, err);
                return;
            };
            res.json({
                "status": "0",
                "Msg": "删除成功",
                result: "删除成功"
            })

        })
    })
    //支付接口
    router.post("/payMent", function(req, res, next){
        let userId = req.cookies.userId;
        let total = req.body.total;
        let addressId = req.body.addressId;
        User.findOne({"userId":userId},function(err,data){
            if(err){
                fnErr(res,err);
                return;
            };
            //获取当前用户地址信息
            let address = {};
            data.addressList.forEach((item) =>{
                if(addressId == item.item){
                    address = item;
                }
            });
            //获取用户购物车中购买的商品

            let goods = [];
            data.cartList.filter((item)=>{
                if(item.checked){
                    goods.push(item);
                }
            });
            //商品订单ID创建
            let platform = "622";
            let r1 = Math.floor(Math.random() * 10);
            let r2 = Math.floor(Math.random() * 10);
            let sysDate = new Date().Format("yyyyMMddhhmmss");
            let createDate = new Date("yyyy-MM-dd hh:mm:ss");
            let orderId = platform + r1 + sysDate + r2;
            let obj = {
                "orderId":orderId,
                "orderTotal":total,
                "addressInfo":address,
                "orderStatus":true,
                "createDate":createDate
            }
            data.orderList.push(obj);
            data.save(function(err,doc){
                if(err){
                    fnErr(res,err);
                    return;
                };
                res.json({
                    "status":"0",
                    "Msg":"数据保存成功",
                    "result":{
                        "orderId":obj.orderId,
                        "orderTotal":total,
                    }
                })
            })
           

        })
    });
    //获取购物车数量
    router.post("/getCartCount", function(req, res, next){
        let userId ="";
        let count = 0;
        if(req.cookies && req.cookies.userId){
            userId = req.cookies.userId;
        };
        User.findOne({"userId":userId},function(err, data){
            if(err){
                fnErr(res, err);
                return;
            };
            data.cartList.forEach(item =>{
               count += item.productNum
            });
            res.json({
                "status":"0",
                "Msg":"请求成功",
                "result":count
            })
        })
    })
    //错误函数封装
function fnErr(res, err) {
    if (err) {
        res.json({
            status: "1",
            Msg: err.message,
        });
    }
}
module.exports = router;