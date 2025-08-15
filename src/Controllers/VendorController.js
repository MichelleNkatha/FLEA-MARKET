const Vendor = require('../models/Vendor');

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Admin only
exports.createVendor = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const vendor = await Vendor.create({
      name,
      description,
      userId: req.user.id // The admin who created it
    });

    res.status(201).json({ message: 'Vendor created', vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating vendor' });
  }
};

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching vendors' });
  }
};
