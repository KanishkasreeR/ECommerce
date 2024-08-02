const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    products:[{
        productid:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]
})

const cart = mongoose.model('Cart',cartSchema);
module.exports = cart;