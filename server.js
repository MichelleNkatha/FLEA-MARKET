// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db'); // ✅ DB connection

// Import routes
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Strath Flea Market API is running...');
});

// Start server after DB connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected...');
    return sequelize.sync(); // or { force: false }
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` API running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });
