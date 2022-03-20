const mongoose = require("mongoose");//require 패키지를 불러온다

const schema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required:true,
    }
})


module.exports = mongoose.model("Cart", schema)
