import React from "react";
import { format } from "date-fns";

export default function AggregatedInfo({ asset }) {
  const currencySymbol = asset.type === "currency" ? "₽" : "$";

  const formatPrice = (value) => {
    if (value === 0) return `0 ${currencySymbol}`;
    const precision =
      value < 0.0001 ? 9 : value < 0.01 ? 6 : value < 1 ? 4 : 2;
    return `${value.toFixed(precision)} ${currencySymbol}`;
  };

  const prices = asset.history.map((h) => h.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const avgPrice =
    prices.reduce((total, price) => total + price, 0) / prices.length;

  const lastUpdate =
    asset.history.length > 0
      ? format(
          new Date(asset.history[asset.history.length - 1].date),
          "dd.MM.yyyy, HH:mm"
        )
      : "нет данных";

  const info = [
    { label: "Максимальная цена", value: formatPrice(maxPrice) },
    { label: "Минимальная цена", value: formatPrice(minPrice) },
    { label: "Средняя цена", value: formatPrice(avgPrice) },
    { label: "Последнее обновление", value: lastUpdate },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
      {info.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4"
        >
          <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
            {label}
          </p>
          <p className="mt-1 text-gray-900 dark:text-gray-100 text-base">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
