var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login",function(req, res, next){
  console.log(req)
  var parmas = {
    "userName":req.body.username,
    "userPwd":req.body.userPwd,
  };
  console.log(parmas)
  User.findOne(parmas,function(err,data){
    console.log(22)
    fnErr(res, err);
    //存cookie
    res.cookie("userId",data.userId,{
      path:"/",
      maxAge:1000 * 60 * 60 * 24
    });
    //存 session
    //res.session.user = data;
    res.json({
      status: "0",
      Msg: '',
      result:{
        username:data.userName
      }
    })
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
