const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.post('/addtocart',auth,cartController.addtocart);
router.get('/getcart',auth,cartController.getCartItems);
router.delete('/deletecartproduct/:id',auth,cartController.deleteproduct);

module.exports = router;