require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

const connectDB = require("./db");
const assetRoutes = require("./routes/assets");
const updateCurrencyRates = require("./updateRates");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/assets", assetRoutes);

// Подключение к MongoDB и запуск сервера
connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("✅ Backend server running on http://localhost:5000");
    });

    // Для теста: автообновление каждый 1 минуту
    cron.schedule("12 * * * *", async () => {
      console.log("🔁 [CRON] Обновление курсов валют с API ЦБ РФ...");
      try {
        await updateCurrencyRates();
        console.log("✅ Курсы успешно обновлены.");
      } catch (err) {
        console.error("❌ Ошибка при обновлении курсов:", err.message);
      }
    });

    // Первый запуск сразу после старта сервера
    updateCurrencyRates().then(() =>
      console.log("📥 Начальные курсы загружены.")
    );
  })
  .catch((err) => {
    console.error("❌ Ошибка подключения к MongoDB:", err.message);
  });
