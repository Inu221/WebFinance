import React from "react";
import { format } from "date-fns";

export default function AggregatedInfo({ asset }) {
  const prices = asset.history.map((h) => h.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const lastUpdate =
    asset.history.length > 0
      ? format(new Date(asset.history[asset.history.length - 1].date), "dd.MM.yyyy, HH:mm")
      : "нет данных";

  const info = [
    { label: "Максимальная цена", value: `${maxPrice.toFixed(2)} ₽` },
    { label: "Минимальная цена", value: `${minPrice.toFixed(2)} ₽` },
    { label: "Средняя цена", value: `${avgPrice.toFixed(2)} ₽` },
    { label: "Последнее обновление", value: lastUpdate },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 text-sm">
      {info.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-3 flex flex-col justify-center"
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          <p className="mt-1">{value}</p>
        </div>
      ))}
    </div>
  );
}
