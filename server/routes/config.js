const express = require('express');
const router = express.Router();
const Config = require('../models/Config');
const auth = require('../middleware/auth');

// GET /api/config/exchange-rate — read stored exchange rate
router.get('/exchange-rate', async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = await Config.create({ exchangeRate: 175 });
    }
    res.json({ rate: config.exchangeRate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/config/exchange-rate — update exchange rate (auth required)
router.put('/exchange-rate', auth, async (req, res) => {
  try {
    const { rate } = req.body;
    if (rate === undefined || typeof rate !== 'number' || rate <= 0) {
      return res.status(400).json({ error: 'rate must be a positive number' });
    }
    let config = await Config.findOne();
    if (!config) {
      config = new Config();
    }
    config.exchangeRate = rate;
    await config.save();
    res.json({ rate: config.exchangeRate });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
