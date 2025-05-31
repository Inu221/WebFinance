import React from "react";

export default function AssetList({ assets, selectedAsset, onSelect }) {
  const getCountryCode = (currencyCode) => {
    const map = {
      USD: "us", EUR: "eu", GBP: "gb", CNY: "cn", CAD: "ca",
      JPY: "jp", KGS: "kg", MDL: "md", NZD: "nz", QAR: "qa",
      RUB: "ru", AUD: "au", AZN: "az", AMD: "am", BYN: "by",
      BGN: "bg", BRL: "br", HUF: "hu", VND: "vn", HKD: "hk",
      GEL: "ge", DKK: "dk", AED: "ae", EGP: "eg", INR: "in",
      IDR: "id", KZT: "kz", NOK: "no", PLN: "pl", RON: "ro",
      SGD: "sg", TJS: "tj", THB: "th", TRY: "tr", TMT: "tm",
      UZS: "uz", UAH: "ua", CZK: "cz", SEK: "se", CHF: "ch",
      RSD: "rs", ZAR: "za", KRW: "kr", XDR: "un"
    };
    return map[currencyCode] || null;
  };

  return (
    <ul className="space-y-2">
      {assets.length === 0 && (
        <li className="p-3 text-center text-gray-600 dark:text-gray-400">Актив не найден</li>
      )}

      {assets.map((asset) => {
        const countryCode = getCountryCode(asset.name);
        const flagUrl = countryCode
          ? `https://flagcdn.com/w40/${countryCode}.png`
          : null;

        const isSelected = selectedAsset?._id === asset._id;

        return (
          <li
            key={asset.id}
            onClick={() => onSelect(asset)}
            className={`
              flex items-center justify-between cursor-pointer rounded-lg p-3
              transition duration-300 ease-in-out transform
              ${isSelected
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-800 hover:bg-blue-100 hover:text-gray-900 hover:shadow-sm hover:scale-[1.02] dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              }
            `}
          >
            <div className="flex items-center gap-3">
              {flagUrl && (
                <img
                  src={flagUrl}
                  alt={`${asset.name} flag`}
                  className={`w-10 h-6 object-cover rounded-md shadow-sm border border-gray-300 dark:border-gray-600 ${
                    isSelected ? "brightness-90" : ""
                  }`}
                  loading="lazy"
                />
              )}
              <div>
                <p className="font-semibold">{asset.name}</p>
                <p className="text-xs capitalize">{asset.type}</p>
              </div>
            </div>

            <div className="text-right font-semibold min-w-[80px]">
              {asset.price.toFixed(2)} ₽
            </div>
          </li>
        );
      })}
    </ul>
  );
}
