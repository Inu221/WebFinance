const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");

// GET /api/crypto - все криптовалюты
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find({ type: "crypto" }).sort({ name: 1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении криптовалют" });
  }
});

module.exports = router;
