// models/Asset.js
const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  lastUpdate: Date,
  history: [
    {
      date: Date,
      price: Number
    }
  ]
});

module.exports = mongoose.model('Asset', AssetSchema);
