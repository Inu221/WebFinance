const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset'); // модель из твоей схемы Mongo

// GET /api/assets - вернуть все активы с типом 'currency'
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find({ type: 'currency' }).sort({ name: 1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении активов' });
  }
});

module.exports = router;
