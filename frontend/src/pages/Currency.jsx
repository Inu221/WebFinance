// src/pages/Currency.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetList from "../components/AssetList";
import AssetChart from "../components/AssetChart";
import AggregatedInfo from "../components/AggregatedInfo";
import DelayedMessage from "../components/DelayedMessage";

const API_URL = "/api/assets";

export default function Currency({ darkMode }) {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get(API_URL);
        setAssets(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке активов:", error);
      }
    };

    fetchAssets();
    const interval = setInterval(fetchAssets, 120000);
    return () => clearInterval(interval);
  }, []);

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!selectedAsset || !filteredAssets.some((a) => a.id === selectedAsset.id)) {
      setSelectedAsset(filteredAssets[0] || null);
    }
  }, [filteredAssets, selectedAsset]);

  return (
    <div className="container mx-auto max-w-7xl px-6 py-16 space-y-12 animate-fadeSlideUp">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Курсы мировых валют
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Следите за актуальными валютными курсами в режиме реального времени.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Поиск валюты..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-5 overflow-y-auto max-h-[640px] scrollbar-thin">
          <AssetList
            assets={filteredAssets}
            selectedAsset={selectedAsset}
            onSelect={setSelectedAsset}
            darkMode={darkMode}
          />
        </aside>

        <main className="col-span-1 md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {selectedAsset ? (
            <>
              <h2 className="text-2xl font-medium mb-6 text-indigo-600 dark:text-indigo-400">
                {selectedAsset.name}
              </h2>
              <div className="mb-6">
                <AssetChart asset={selectedAsset} darkMode={darkMode} />
              </div>
              <AggregatedInfo asset={selectedAsset} darkMode={darkMode} />
            </>
          ) : (
            <DelayedMessage>Данные не найдены.</DelayedMessage>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="pt-16 text-center text-sm text-gray-400 dark:text-gray-500">
        © 2025 WebFinance. Все права защищены.
      </footer>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease-out both;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #6366f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #4f46e5;
        }
      `}</style>
    </div>
  );
}
