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
    "addressList": [{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCoed": String,
        "tel": String,
        "isDefault": Boolean
    }]
});
var User = mongoose.model("User", userSchema)
module.exports = User;