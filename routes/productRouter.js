const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const auth = require('../middlewares/auth')

router.get('/products',auth,productController.getAllProducts)
router.post('/addProduct',auth,productController.addProduct)
router.put('/updateProduct/:id',auth,productController.updateProduct)
router.delete('/deleteProduct/:id',auth,productController.deleteProduct)

module.exports = router;