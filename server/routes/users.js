var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
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