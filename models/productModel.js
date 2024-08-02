const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    Rating:[{
       rate:{
        type:Number
       },
       count:{
        type:Number
       }
}]
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;