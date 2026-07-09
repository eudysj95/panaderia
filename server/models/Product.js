const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['panes', 'viveres', 'mayor'],
      message: '{VALUE} is not a valid category',
    },
  },
  unidades: {
    type: Number,
    default: 1,
    min: [1, 'Units must be at least 1'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
