const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to check admin or vendor
function verifyVendorOrAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    if (decoded.role !== 'vendor' && decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Vendors or Admins only' });
    }
    next();
  });
}

// Create Product
router.post('/', verifyVendorOrAdmin, async (req, res) => {
  try {
    const { vendorId, productName, description, price } = req.body;
    const product = await Product.create({ vendorId, productName, description, price });
    res.json({ message: 'Product created', productId: product.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
