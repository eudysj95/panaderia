require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const materialRoutes = require('./routes/materials');
const configRoutes = require('./routes/config');
const seedRoutes = require('./routes/seed');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/config', configRoutes);
app.use('/api/seed', seedRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Connect to MongoDB and start server
async function start() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
