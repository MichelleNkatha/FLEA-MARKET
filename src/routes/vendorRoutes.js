const express = require('express');
const router = express.Router();
const { createVendor, getVendors } = require('../Controllers/VendorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, createVendor); // Admin creates vendor
router.get('/', getVendors); // Public fetch vendors

module.exports = router;
