import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetList from "./components/AssetList";
import AssetChart from "./components/AssetChart";
import AggregatedInfo from "./components/AggregatedInfo";

const API_URL = "/api/assets";

export default function App() {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Загрузка данных
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = res.data;

        setAssets(data);

        const filtered = search.trim() === ""
          ? data
          : data.filter(asset =>
              asset.name.toLowerCase().includes(search.toLowerCase())
            );
        setFilteredAssets(filtered);

        if (selectedAsset) {
          const found = data.find(a => a.id === selectedAsset.id);
          setSelectedAsset(found || filtered[0] || null);
        } else {
          setSelectedAsset(filtered[0] || null);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
    const intervalId = setInterval(fetchAssets, 120000);
    return () => clearInterval(intervalId);
  }, [search]);

  // Обновление фильтра
  useEffect(() => {
    const filtered = search.trim() === ""
      ? assets
      : assets.filter(asset =>
          asset.name.toLowerCase().includes(search.toLowerCase())
        );
    setFilteredAssets(filtered);

    if (!selectedAsset || !filtered.find(a => a.id === selectedAsset.id)) {
      setSelectedAsset(filtered[0] || null);
    }
  }, [search, assets]);

  // Применение темы к <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-center md:text-left">
            Курс мировых валют
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Светлая тема" : "Тёмная тема"}
            className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
            title={darkMode ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
          >
            {darkMode ? (
              // Иконка солнца для тёмной темы (текущая - светлая)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-10H21m-18 0H3m15.364 6.364l.707.707m-12.02-12.02l.707.707m12.02 0l-.707.707m-12.02 12.02l-.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              // Иконка луны для светлой темы (текущая - тёмная)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>

        <input
          type="text"
          placeholder="Поиск актива..."
          className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-4 rounded bg-white dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Добавил scrollbar стили здесь */}
          <div
            className="
              md:w-1/3 bg-white dark:bg-gray-800 rounded shadow p-4 max-h-[660px] overflow-auto transition-colors
              scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200
              dark:scrollbar-thumb-blue-400 dark:scrollbar-track-gray-700
            "
          >
            <AssetList
              assets={filteredAssets}
              selectedAsset={selectedAsset}
              onSelect={setSelectedAsset}
              darkMode={darkMode}
            />
          </div>

          <div className="md:w-2/3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
            {selectedAsset ? (
              <>
                <h2 className="text-2xl font-bold mb-4">{selectedAsset.name}</h2>
                <AssetChart asset={selectedAsset} darkMode={darkMode} />
                <AggregatedInfo asset={selectedAsset} darkMode={darkMode} />
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center mt-1">
                Данные не найдены.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
