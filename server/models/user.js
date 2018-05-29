var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "productPrice": Number,
        "productImg": String,
        "checked": false,
        "productNum": Number
    }],
    "addressList": Array
});
var User = mongoose.model("User", userSchema)
module.exports = User;