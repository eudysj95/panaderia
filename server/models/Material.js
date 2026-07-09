const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  unidad: {
    type: String,
    default: 'kg',
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Material', materialSchema);
