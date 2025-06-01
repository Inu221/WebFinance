import React from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Hero */}
      <m.section
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Финансовая аналитика без лишнего шума
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          WebFinance — платформа с актуальными данными, интерактивными графиками и мощной аналитикой по валютам, криптовалютам и товарам мирового рынка.
          <br />
          Легко. Быстро. Надёжно.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <Link
            to="/currency"
            className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Начать использовать
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Подробнее о сервисе
          </Link>
        </div>
      </m.section>

      {/* Features */}
      <m.section
        className="mt-32 grid gap-10 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        <Feature
          title="Мировые валюты"
          description="Отслеживайте курсы и тренды более 40 валют, анализируйте динамику за любой период."
          icon="💱"
          to="/currency"
          custom={0}
        />
        <Feature
          title="Криптовалюты"
          description="Поддержка популярных криптомонет, детальные графики в реальном времени."
          icon="💰"
          to="/crypto"
          custom={1}
        />
        <Feature
          title="Товары"
          description="Актуальные цены на нефть, золото, серебро и другие важные товары мирового рынка."
          icon="🛢️"
          to="/commodities"
          custom={2}
        />
      </m.section>

      {/* Value Props */}
      <m.section
        className="mt-32 border-t pt-20 border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Почему WebFinance?
        </h2>
        <div className="grid gap-12 md:grid-cols-3 text-center max-w-5xl mx-auto px-6">
          <Why icon="⚡" title="Актуальные данные" text="Обновляем информацию каждые 5-10 минут, чтобы вы всегда были в курсе." />
          <Why icon="📊" title="Интерактивные графики" text="Легко анализируйте динамику и делайте выводы с помощью удобных визуализаций." />
          <Why icon="🔒" title="Безопасность" text="Ваши данные надёжно защищены и конфиденциальны." />
        </div>
      </m.section>

      {/* Reviews */}
      <m.section
        className="mt-32 max-w-5xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Что говорят пользователи
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          <Review
            avatar="https://i.pravatar.cc/80?img=32"
            name="Алексей Иванов"
            text="WebFinance – идеальный помощник для ежедневного анализа рынка. Очень удобный и информативный сервис!"
          />
          <Review
            avatar="https://i.pravatar.cc/80?img=15"
            name="Мария Смирнова"
            text="Люблю графики и обновления в реальном времени. Всё работает быстро и стабильно, рекомендую!"
          />
          <Review
            avatar="https://i.pravatar.cc/80?img=48"
            name="Игорь Петров"
            text="Безопасность и точность данных – на высшем уровне. WebFinance стал моим незаменимым инструментом."
          />
        </div>
      </m.section>

      {/* Additional Benefits */}
      <m.section
        className="mt-32 bg-gray-50 dark:bg-gray-900 rounded-3xl p-14 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-14">
          Дополнительные преимущества
        </h2>
        <div className="grid gap-12 md:grid-cols-3 text-center">
          <Benefit
            icon="👨‍💼"
            title="Экспертная команда"
            description="Наши аналитики — профессионалы с многолетним опытом на финансовых рынках."
          />
          <Benefit
            icon="🕑"
            title="Поддержка 24/7"
            description="Всегда готовы помочь — обратитесь к нам в любое время."
          />
          <Benefit
            icon="🔄"
            title="Регулярные обновления"
            description="Мы постоянно улучшаем сервис и добавляем новые функции для вашего удобства."
          />
        </div>
      </m.section>

      {/* CTA */}
      <m.section
        className="mt-32 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Присоединяйтесь к WebFinance сегодня
        </h3>
        <Link
          to="/currency"
          className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          Перейти к аналитике
        </Link>
      </m.section>

      {/* Footer */}
      <footer className="mt-32 text-center text-sm text-gray-400 dark:text-gray-500 select-none">
        © 2025 WebFinance. Создано с использованием современных технологий.
      </footer>
    </div>
  );
}

function Feature({ icon, title, description, to, custom }) {
  return (
    <m.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      custom={custom}
      initial="hidden"
      animate="visible"
      transition={{ delay: custom * 0.2, duration: 0.5 }}
    >
      <Link
        to={to}
        className="group p-8 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition hover:bg-gray-50 dark:hover:bg-gray-800 block"
      >
        <div className="flex flex-col items-start space-y-4">
          <div className="text-5xl">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-base">{description}</p>
        </div>
      </Link>
    </m.div>
  );
}

function Why({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center space-y-4 px-6">
      <div className="text-4xl">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">{text}</p>
    </div>
  );
}

function Review({ avatar, name, text }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-4" />
      <p className="text-gray-700 dark:text-gray-300 italic">"{text}"</p>
      <span className="mt-4 font-semibold text-gray-900 dark:text-white">{name}</span>
    </div>
  );
}

function Benefit({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center space-y-4 px-4">
      <div className="text-6xl">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}
