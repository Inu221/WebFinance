import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Layout({ children, darkMode, setDarkMode }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `px-5 py-2 text-base font-medium transition-colors duration-200
     ${
       isActive(path)
         ? "text-blue-600 dark:text-blue-400 font-semibold"
         : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
     }`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      <header className="border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50">
        <div className="container mx-auto max-w-7xl flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl tracking-widest font-semibold select-none">
            WebFinance
          </h1>

          <nav className="flex items-center space-x-8">
            <Link to="/" className={linkClasses("/")}>Главная</Link>
            <Link to="/currency" className={linkClasses("/currency")}>Валюты</Link>
            <Link to="/crypto" className={linkClasses("/crypto")}>Криптовалюты</Link>
            <Link to="/commodities" className={linkClasses("/commodities")}>Товары</Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-6 p-2 rounded-md transition-colors duration-200
                         bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Переключить тему"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
