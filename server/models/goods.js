let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "productPrice": Number,
    "productImg": String,
    "productNum":Number,
    "checked":Boolean,
});
let Good = mongoose.model("Good", productSchema)
module.exports = Good;