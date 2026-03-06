import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Design is now permanently dark — always force dark-mode class
  const [darkMode] = useState(true);

  useEffect(() => {
    document.body.classList.add('dark-mode');
    return () => { };
  }, []);

  // Keep toggleDarkMode as a no-op for backward compatibility
  const toggleDarkMode = () => { };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};
