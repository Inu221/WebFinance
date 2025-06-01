import React, { useState, useEffect, useRef } from "react";
import DelayedMessage from "./DelayedMessage";

const formatPrice = (value, type) => {
  if (value === 0) return type === "currency" ? "0 ₽" : "0 $";

  let precision = 2;
  if (value < 0.0001) precision = 9;
  else if (value < 0.01) precision = 6;
  else if (value < 1) precision = 4;

  const symbol = type === "currency" ? "₽" : "$";
  return `${value.toLocaleString("ru-RU", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })} ${symbol}`;
};

export default function AssetList({ assets, selectedAsset, onSelect }) {
  const [showNotFound, setShowNotFound] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (assets.length === 0) {
      timerRef.current = setTimeout(() => setShowNotFound(true), 500);
    } else {
      setShowNotFound(false);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [assets]);

  const getCountryCode = (currencyCode) => {
    const map = {
      USD: "us", EUR: "eu", GBP: "gb", CNY: "cn", CAD: "ca", JPY: "jp", KGS: "kg", MDL: "md",
      NZD: "nz", QAR: "qa", RUB: "ru", AUD: "au", AZN: "az", AMD: "am", BYN: "by", BGN: "bg",
      BRL: "br", HUF: "hu", VND: "vn", HKD: "hk", GEL: "ge", DKK: "dk", AED: "ae", EGP: "eg",
      INR: "in", IDR: "id", KZT: "kz", NOK: "no", PLN: "pl", RON: "ro", SGD: "sg", TJS: "tj",
      THB: "th", TRY: "tr", TMT: "tm", UZS: "uz", UAH: "ua", CZK: "cz", SEK: "se", CHF: "ch",
      RSD: "rs", ZAR: "za", KRW: "kr", XDR: "un"
    };
    return map[currencyCode] || null;
  };

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {showNotFound && <DelayedMessage></DelayedMessage>}

      {assets.map((asset, index) => {
        const countryCode = getCountryCode(asset.name);
        const flagUrl = countryCode
          ? `https://flagcdn.com/w40/${countryCode}.png`
          : null;

        const isSelected = selectedAsset?._id === asset._id;

        return (
          <li
            key={asset._id}
            onClick={() => onSelect(asset)}
            className={`
              flex items-center justify-between cursor-pointer px-6 py-4
              rounded-lg transition-colors duration-200
              select-none
              ${
                isSelected
                  ? "bg-gray-100 dark:bg-gray-800 border border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300"
                  : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
            style={{
              animation: "fadeSlideIn 0.3s ease forwards",
              animationDelay: `${index * 0.06}s`,
              opacity: 0,
              transformOrigin: "top center",
              transform: "translateY(12px)",
            }}
          >
            <div className="flex items-center space-x-4">
              {asset.type === "crypto" && asset.icon ? (
                <img
                  src={asset.icon}
                  alt={`${asset.name} icon`}
                  className="w-9 h-9 object-contain rounded-md"
                  loading="lazy"
                />
              ) : asset.type === "commodity" && asset.icon ? (
                <span className="text-2xl">{asset.icon}</span>
              ) : flagUrl ? (
                <img
                  src={flagUrl}
                  alt={`${asset.name} flag`}
                  className="w-9 h-5 object-cover rounded-sm border border-gray-300 dark:border-gray-600"
                  loading="lazy"
                />
              ) : null}

              <div className="flex flex-col">
                <p className="text-base font-semibold leading-tight">{asset.name}</p>
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400">{asset.type}</p>
              </div>
            </div>

            <div className="text-right font-semibold text-base tabular-nums min-w-[88px]">
              {formatPrice(asset.price, asset.type)}
            </div>
          </li>
        );
      })}

      <style>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ul>
  );
}
