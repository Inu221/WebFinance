require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

const connectDB = require("./db");
const assetRoutes = require("./routes/assets");
const cryptoRoutes = require("./routes/crypto");
const commoditiesRoutes = require("./routes/commodities");
const { updateCurrencyRates, updateCryptoRates, updateCommodityRates } = require('./updateRates');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assets", assetRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/commodities", commoditiesRoutes);

async function start() {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("✅ Backend server running on http://localhost:5000");
    });

    // Запуск cron
    cron.schedule("*/10 * * * *", async () => {
      console.log("🔁 [CRON] Обновление курсов валют с API ЦБ РФ, товаров");
      try {
        await updateCurrencyRates();
        await updateCommodityRates();
        console.log("✅ Курсы успешно обновлены.");
      } catch (err) {
        console.error("❌ Ошибка при обновлении курсов:", err.message);
      }
    });

    cron.schedule('*/5 * * * *', async () => {
      console.log('🔁 [CRON] Обновление курсов криптовалют с CoinGecko...');
      try {
        await updateCryptoRates();
        console.log('✅ Курсы криптовалют успешно обновлены.');
      } catch (err) {
        console.error('❌ Ошибка при обновлении крипты:', err.message);
      }
    });

    // Начальная загрузка
    await updateCurrencyRates();
    await updateCommodityRates();
    console.log("📥 Начальные курсы загружены.");

  } catch (err) {
    console.error("❌ Ошибка при старте приложения:", err.message);
  }
}

start();