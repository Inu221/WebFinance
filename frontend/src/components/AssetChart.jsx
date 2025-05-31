import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AssetChart({ asset }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = {
    labels: asset.history.map((h) =>
      new Date(h.date).toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" })
    ),
    datasets: [
      {
        label: `${asset.name} Цена`,
        data: asset.history.map((h) => h.price),
        fill: false,
        borderColor: "rgb(37 99 235)", // blue-600
        backgroundColor: "rgb(37 99 235)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDark ? "#f3f4f6" : "#1f2937", // gray-100 vs gray-800
        },
      },
      title: {
        display: true,
        text: `Цена ${asset.name} за последние дни`,
        color: isDark ? "#f3f4f6" : "#111827", // gray-100 vs gray-900
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#1f2937", // gray-200 vs gray-800
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb", // gray-700 vs gray-200
        },
      },
      y: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#1f2937",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow rounded-lg p-4">
      <Line options={options} data={data} />
    </div>
  );
}
