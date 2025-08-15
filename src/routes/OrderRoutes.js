const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// Create new order
router.post('/', verifyToken, createOrder);

// Get all orders for logged-in user
router.get('/', verifyToken, getOrders);

module.exports = router;
