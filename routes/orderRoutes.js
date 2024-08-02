const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth')

router.post('/addorder',auth,orderController.addorder);
router.get('/getorder',auth,orderController.getOrders)

module.exports = router;