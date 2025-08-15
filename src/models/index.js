const User = require('./User');
const Vendor = require('./Vendor');

// Associations
Vendor.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Vendor, { foreignKey: 'user_id' });

module.exports = { User, Vendor };
