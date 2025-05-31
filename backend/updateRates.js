// backend/updateRates.js
const axios = require('axios');
const xml2js = require('xml2js');
const Asset = require('./models/Asset');

async function updateCurrencyRates() {
  try {
    const response = await axios.get('https://www.cbr.ru/scripts/XML_daily.asp');
    const xml = response.data;

    const result = await xml2js.parseStringPromise(xml);
    const currencies = result.ValCurs.Valute;

    for (const cur of currencies) {
      const name = cur.CharCode[0];
      const price = parseFloat(cur.Value[0].replace(',', '.'));
      const nominal = parseInt(cur.Nominal[0]);
      const normalizedPrice = +(price / nominal).toFixed(4);

      // Находим актив в базе
      const asset = await Asset.findOne({ name, type: 'currency' });

      if (!asset) {
        // Если актива нет, создаём новый с историей
        await Asset.create({
          name,
          type: 'currency',
          price: normalizedPrice,
          lastUpdate: new Date(),
          history: [{ date: new Date(), price: normalizedPrice }]
        });
      } else {
        // Если есть, проверяем последнюю цену в истории
        const lastPrice = asset.history.length
          ? asset.history[asset.history.length - 1].price
          : null;

        if (lastPrice !== normalizedPrice) {
          // Если цена изменилась — обновляем актив и добавляем запись в историю
          asset.price = normalizedPrice;
          asset.lastUpdate = new Date();
          asset.history.push({ date: new Date(), price: normalizedPrice });
          await asset.save();
        }
        // Если цена не изменилась — ничего не делаем
      }
    }

    console.log('✅ Курсы валют обновлены');
  } catch (err) {
    console.error('❌ Ошибка при обновлении курсов ЦБ:', err.message);
  }
}

module.exports = updateCurrencyRates;
