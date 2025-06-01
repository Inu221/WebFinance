// backend/updateRates.js
const axios = require('axios');
const xml2js = require('xml2js');
const Asset = require('./models/Asset');
const yahooFinance = require('yahoo-finance2').default;

// --- Курсы валют с ЦБ ---
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

      const asset = await Asset.findOne({ name, type: 'currency' });

      if (!asset) {
        await Asset.create({
          name,
          type: 'currency',
          price: normalizedPrice,
          lastUpdate: new Date(),
          history: [{ date: new Date(), price: normalizedPrice }],
        });
      } else {
        const lastPrice = asset.history.at(-1)?.price;
        asset.price = normalizedPrice;
        asset.lastUpdate = new Date();
        asset.history.push({ date: new Date(), price: normalizedPrice });
        await asset.save();
      }
    }

    console.log('✅ Курсы валют обновлены');
  } catch (err) {
    console.error('❌ Ошибка при обновлении валют:', err.message);
  }
}

// --- Криптовалюты (CoinGecko) ---
async function updateCryptoRates() {
  try {
    const limit = 30;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
    const response = await axios.get(url);
    const coins = response.data;

    for (const coin of coins) {
      const name = coin.symbol.toUpperCase();
      const fullName = coin.name;
      const price = coin.current_price;
      const icon = coin.image;

      let asset = await Asset.findOne({ name, type: 'crypto' });

      if (!asset) {
        await Asset.create({
          name,
          type: 'crypto',
          price,
          icon,
          lastUpdate: new Date(),
          history: [{ date: new Date(), price }],
        });
      } else {
        const lastPrice = asset.history.at(-1)?.price;
        asset.price = price;
        asset.icon = icon;
        asset.lastUpdate = new Date();
        asset.history.push({ date: new Date(), price });
        await asset.save();
      }
    }

    console.log('✅ Криптовалюты обновлены');
  } catch (err) {
    console.error('❌ Ошибка при обновлении криптовалют:', err.message);
  }
}

// --- Товары (реальные данные с Yahoo Finance) ---
async function updateCommodityRates() {
  const commodities = [
    { name: 'Gold', ticker: 'GC=F', icon: '🥇' },
    { name: 'Silver', ticker: 'SI=F', icon: '🥈' },
    { name: 'WTI Oil', ticker: 'CL=F', icon: '🛢️' },
    { name: 'Brent Oil', ticker: 'BZ=F', icon: '🛢️' },
    { name: 'Natural Gas', ticker: 'NG=F', icon: '🔥' },
    { name: 'Copper', ticker: 'HG=F', icon: '🟠' },
    { name: 'Platinum', ticker: 'PL=F', icon: '⚪' },
    { name: 'Palladium', ticker: 'PA=F', icon: '🔘' },
    { name: 'Corn', ticker: 'ZC=F', icon: '🌽' },
    { name: 'Wheat', ticker: 'ZW=F', icon: '🌾' },
    { name: 'Cotton', ticker: 'CT=F', icon: '🧵' },
    { name: 'Coffee', ticker: 'KC=F', icon: '☕' },
    { name: 'Sugar', ticker: 'SB=F', icon: '🍬' },
    { name: 'Soybeans', ticker: 'ZS=F', icon: '🌱' },
    { name: 'Cocoa', ticker: 'CC=F', icon: '🍫' },
    { name: 'Lean Hogs', ticker: 'HE=F', icon: '🐖' },
    { name: 'Live Cattle', ticker: 'LE=F', icon: '🐄' },
    { name: 'Orange Juice', ticker: 'OJ=F', icon: '🍊' },
    { name: 'Rough Rice', ticker: 'ZR=F', icon: '🍚' },
  ];

  for (const { name, ticker, icon } of commodities) {
    try {
      const result = await yahooFinance.quote(ticker);
      const price = result.regularMarketPrice;

      let asset = await Asset.findOne({ name, type: 'commodity' });

      if (!asset) {
        await Asset.create({
          name,
          type: 'commodity',
          price,
          icon,
          lastUpdate: new Date(),
          history: [{ date: new Date(), price }],
        });
      } else {
        const lastPrice = asset.history.at(-1)?.price;
        asset.price = price;
        asset.lastUpdate = new Date();
        asset.icon = icon;
        asset.history.push({ date: new Date(), price });
        await asset.save();        
      }

      console.log(`✅ Обновлено: ${name} — ${price}`);
    } catch (err) {
      console.error(`❌ Ошибка при обновлении ${name}:`, err.message);
    }
  }
}

module.exports = {
  updateCurrencyRates,
  updateCryptoRates,
  updateCommodityRates,
};