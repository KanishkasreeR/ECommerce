const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type: String,
        unique:true,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    return next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next()
})

//next -  acts as a middleware
//pre - middleware
//100 - hashing is stronf but computation power is more and the server gets heated
// 10 - represents the no of bytes we are hashing

const User = mongoose.model('User',userSchema);
module.exports = User;