const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const Productroutes = require('./routes/productRouter')
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(bodyparser.json())
app.use(cors());
// app.use(bodyparser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://kanishka:ZzMh63NyKD42Nw8d@cluster05.pgwmpx4.mongodb.net/ECommerce').then(()=>{
    console.log("Mongodb connected");
})

app.set('view engine','ejs');

app.use('/api',Productroutes);
app.use('/api',userRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);


app.listen(8000,()=>{
    console.log('Server running on port 8000');
})