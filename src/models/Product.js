const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Vendor = require('./Vendor');

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

// Relationship: Product belongs to Vendor
Product.belongsTo(Vendor, { foreignKey: 'vendorId', onDelete: 'CASCADE' });
Vendor.hasMany(Product, { foreignKey: 'vendorId' });

module.exports = Product;
