const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");

// GET /api/commodities - все товары
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find({ type: "commodity" }).sort({ name: 1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении товаров" });
  }
});

module.exports = router;
