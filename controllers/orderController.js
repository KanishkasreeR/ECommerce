const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const {v4:uuidv4} = require('uuidv4');

const addorder = async(req,res)=>{
    try{
      const {name,address,phoneno} = req.body;
      const userid = req.user;
      const userObjectId = new mongoose.Types.ObjectId(userid)

      const user = await User.findById(userObjectId);
      if(!user){
        return res.status(404).json({error:"User not found"})
      }

      const cart = await Cart.findOne({userid});
      if(!cart){
        return res.status(404).json({error:"Cart not found"})
      }
      if(!cart.products){
        return res.status(400).json({error:"Cart Product not available"})
      }
      console.log(user);
      let totalAmount = 0;
      for(const i of cart.products){
        const product = await Product.findOne({ id: i.productid }); 
        if(!product){
          return res.status(404).json({error:"Product not found"})
        }
        totalAmount += i.quantity * product.price;
      }
      
      const newOrder = new Order({
        'orderid' : uuidv4(),
        'userid' : userid,
        'name' : name,
        'email' : user.email,
        'address' : address,
        'phoneno' : phoneno,
        'products' : cart.products,
        'totalamount' : totalAmount
      })
      await newOrder.save();
      await Cart.findOneAndDelete({ userid: userObjectId });
      return res.status(200).json({msg:"Order created successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getOrders = async(req,res)=>{
  try{
    const userid = req.user;

        const order = await Order.findOne({ userid });
        if (order) {
            const arr = [];
            for (const i of order.products) {
                const product = await Product.findOne({ id: i.productid }); 
                if (product) {
                    
                    arr.push({
                        title : product.title,
                        description : product.description,
                        price : product.price,
                        category : product.category,
                        image : product.image,
                        quantity : i.quantity,
                    });
                }
            }

            res.status(200).json({orderId:order.orderid, products : arr,totalAmount : order.totalamount,
              orderDate : order.orderdate,
              estimateDate : order.estimatedate,orderStatus:order.orderstatus});
        } else {
            res.status(404).json({ msg: "Order not found" });
        }
  }
  catch(error){
    res.status(500).json({error:"Internal Server Error"})
  }
}

module.exports = {addorder,getOrders}

