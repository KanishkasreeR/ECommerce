const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const getCartItems = async (req, res) => {
    try {
        const userid = req.user;

        const cart = await Cart.findOne({ userid });
        if (cart) {
            const arr = [];
            let total = 0;
            for (const i of cart.products) {
                const product = await Product.findOne({ id: i.productid }); 
                const amt = product.price * i.quantity;
                total += amt;
                if (product) {
                    
                    arr.push({
                        title : product.title,
                        description : product.description,
                        price : product.price,
                        category : product.category,
                        image : product.image,
                        quantity : i.quantity,
                        amount : amt
                    });
                }
            }

            res.status(200).json({ products : arr ,subTotal : total});
        } else {
            res.status(404).json({ msg: "Cart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const addtocart = async (req, res) => {
    try {
      const { products } = req.body;
      const userid = req.user;
      const data = await Cart.findOne({ userid });
      if (data) {
          products.forEach(j => {
          const exist = data.products.find(p => p.productid === j.productid);
          
          if (exist) {
              exist.quantity = j.quantity;
          } 
        
          else {
              data.products.push({
              productid: j.productid,
              quantity: j.quantity
            });
          }
        });
  
        
        await data.save();
        res.status(200).send({ msg: "Products added to cart" });
  
      } else {
        
        const newCart = new Cart({
          userid,
          products: products.map(r => ({
            productid: r.productid,
            quantity: r.quantity
          }))
        });
        await newCart.save();
        res.status(200).send({ msg: "Products added to cart" });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ msg: "Internal server error" });
    }
  };

  const deleteproduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const userid = req.user;
        const cart = await Cart.findOne({ userid });
        
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productid.toString() === productid) {
                if (cart.products.length <= 1) {
                    await Cart.deleteOne({ userid });
                    return res.status(200).json({ msg: "Cart deleted Successfully" });
                } 
                else{
                    cart.products.splice(i, 1); 
                    await cart.save(); 
                    return res.status(200).json({ msg: "Deletion successful" });
                }
            }
        }

            return res.status(404).json({ msg: "Product not found in cart" });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports = {addtocart,getCartItems,deleteproduct};