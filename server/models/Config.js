const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  exchangeRate: {
    type: Number,
    default: 175,
    min: [0, 'Exchange rate must be positive'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Config', configSchema);
