const {v4 : uuidv4} = require('uuid')
const Product = require('../models/productModel');

const getAllProducts = async(req,res)=>{
   try{
    const product = await Product.find();
    if(product){
      res.status(200).send(product)
    }
    if(!product){
        res.status(404).json({message:'Product not found'})
    }
    
    console.log(req.user);
   }
   catch(error){
     res.status(500).json({message:'Internal Server Error'})
     console.log(error);
   }
}
const addProduct = async(req,res)=>{
  try{
  const { title, description, price, category, image, Rating } = req.body;

  const newProduct = new Product({
      id:uuidv4(),
      title,
      description,
      price,
      category,
      image,
      Rating: Rating.map(r => ({
          rate: r.rate,
          count: r.count
      }))
  });

  await newProduct.save();
  console.log(req.user);
  res.status(201).json({ message: 'Product added successfully' });
} catch (error) {
  res.status(500).json({ message: 'Failed to add product' });
  console.log(error);
}
}

const updateProduct = async (req, res) => {
  try {
      const id = req.params.id;
      const { title, description, price, category, image, Rating } = req.body;

        const updatedProduct = await Product.findOneAndReplace(
          {id},
          {
              id,
              title,
              description,
              price,
              category,
              image,
              Rating: Rating.map(r => ({
                  rate: r.rate,
                  count: r.count
              }))
          },
          { new: true } 
        );

       if(updatedProduct){
        res.status(200).json(updatedProduct);
       }
       else{
        res.status(500).json({ message: "Failed to update product" });
       }

  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
  }
};


const deleteProduct = async(req,res)=>{
  try{
    const id = req.params;
    const product1 = await Product.findOne(id);
    
  if(!product1){
    res.status(404).json({message:"Product Not found"});
  }
  if(product1){
    const product = await Product.deleteOne(id)
  }
  res.status(200).json({message:"product deleted successfully"})
  }
  catch(error){
    res.status(500).json({message:"Failed to delete product"})
  }
}

module.exports = {getAllProducts,addProduct,updateProduct,deleteProduct};