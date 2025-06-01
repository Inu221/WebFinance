// models/Asset.js
const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['currency', 'crypto', 'commodity'], required: true },
  price: { type: Number, required: true },
  lastUpdate: { type: Date, default: Date.now },
  icon: { type: String },  // URL иконки
  history: [
    {
      date: { type: Date, default: Date.now },
      price: Number
    }
  ]
});

AssetSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Asset', AssetSchema);
