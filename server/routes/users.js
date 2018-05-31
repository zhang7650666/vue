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
    });
//删除购物车一条数据
router.post("/cartDel", function(req, res, next) {
  let productId = req.body.productId;
  let userId = req.cookies.userId;
  console.log(productId)
  User.update({"userId":userId},{$pull:{"cartList":{"productId":productId}}},function(err,data){
    if(err){
      fnErr(res, err);
      return;
    };
    res.json({
      "status":"0",
      "Msg":"数据删除成功",
      "result":data
    })

  })
})
//减少一条数据
router.post("/cartEdit",function(req, res, next){
  let productId = req.body.productId;
  let userId = req.cookies.userId;
  let productNum = req.body.productNum;
  User.update({"userId":userId,"cartList.productId":productId},{"cartList.$.productNum":productNum},function(err,data){
    if(err){
      fnErr(res, err);
      return;
    };
    res.json({
      "status":"0",
      "Msg":"修改成功",
      "result":data
    })

  })
})
//选中
router.post("/checked",function(req, res, next){
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let checked = req.body.checked;
  if(productId){
    User.update({"userId":userId,"cartList.productId":productId},{"cartList.$.checked":checked},function(err,data){
      if(err){
        fnErr(res, err);
        return;
      };
      res.json({
        "status":"0",
        "Msg":"修改成功",
        "result":data
      })
  
    })
  }else{
    User.update({"userId":userId},{"cartList.$.checked":checked},function(err,data){
      if(err){
        fnErr(res, err);
        return;
      };
      res.json({
        "status":"0",
        "Msg":"修改成功",
        "result":data
      })
  
    })
  }
  
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