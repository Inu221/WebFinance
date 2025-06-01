import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  CategoryScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  zoomPlugin,
  CategoryScale
);

export default function AssetChart({ asset }) {
  const chartRef = useRef();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const palette = {
    currency: {
      line: isDark ? "#ef4444" : "#b91c1c",
      fill: isDark ? "rgba(239,68,68,0.2)" : "rgba(185,28,28,0.25)",
    },
    crypto: {
      line: isDark ? "#22c55e" : "#15803d",
      fill: isDark ? "rgba(34,197,94,0.2)" : "rgba(21,128,61,0.25)",
    },
    commodity: {
      line: isDark ? "#facc15" : "#ca8a04",
      fill: isDark ? "rgba(250,204,21,0.2)" : "rgba(202,138,4,0.25)",
    },
    default: {
      line: isDark ? "#3b82f6" : "#2563eb",
      fill: isDark ? "rgba(59,130,246,0.2)" : "rgba(37,99,235,0.25)",
    },
  };

  const { line, fill } = palette[asset.type] || palette.default;
  const currencySymbol = asset.type === "currency" ? "₽" : "$";

  const data = {
    datasets: [
      {
        label: `${asset.name} Цена`,
        data: asset.history.map((h) => ({
          x: new Date(h.date),
          y: h.price,
        })),
        borderColor: line,
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvas, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = canvas.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, fill);
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  const textColor = isDark ? "#f3f4f6" : "#1f2937";
  const gridColor = isDark ? "#334155" : "#e5e7eb";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? "#0f172a" : "#f9fafb",
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: line,
        borderWidth: 1,
        padding: 10,
        callbacks: {
          title: (items) =>
            new Date(items[0].parsed.x).toLocaleString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          label: (item) =>
            `Цена: ${item.parsed.y.toLocaleString("ru-RU", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 7,
            })} ${currencySymbol}`,
        },
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
        limits: {
          x: { minRange: 60 * 60 * 1000 }, // минимум 1 час
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "d MMMM yyyy, HH:mm",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { size: 12 },
          maxRotation: 0,
        },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { size: 12 },
          callback: (value) =>
            `${Number(value).toLocaleString("ru-RU", {
              minimumFractionDigits: value % 1 === 0 ? 0 : 2,
              maximumFractionDigits: 7,
            })} ${currencySymbol}`,
        },
      },
    },
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 w-full transition-all"
      style={{ height: 320 }}
    >
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
