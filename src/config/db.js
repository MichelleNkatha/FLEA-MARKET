const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // MySQL username
  process.env.DB_PASS,     // MySQL password
  {
    host: process.env.DB_HOST,  // Usually "localhost"
    dialect: 'mysql',
    logging: false              // Set to true if you want SQL logs in console
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected...");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();

// Import models
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Feedback = require('../models/Feedback');

// Define relationships
User.hasMany(Vendor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Vendor.belongsTo(User, { foreignKey: 'userId' });

Vendor.hasMany(Product, { foreignKey: 'vendorId', onDelete: 'CASCADE' });
Product.belongsTo(Vendor, { foreignKey: 'vendorId' });

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Vendor.hasMany(Feedback, { foreignKey: 'vendorId', onDelete: 'CASCADE' });
Feedback.belongsTo(Vendor, { foreignKey: 'vendorId' });

module.exports = { sequelize };
