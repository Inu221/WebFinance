import React, { useState, useEffect } from "react";

function DelayedMessage({ children, delay = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <p
      className={`text-gray-600 dark:text-gray-400 text-center mt-20 select-none text-lg
        transition-opacity duration-500
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </p>
  );
}

export default DelayedMessage;
