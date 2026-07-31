import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'US Dollar ($ USD)', flag: '🇺🇸' },
  INR: { code: 'INR', symbol: '₹', rate: 83.0, label: 'Indian Rupee (₹ INR)', flag: '🇮🇳' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'British Pound (£ GBP)', flag: '🇬🇧' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.91, label: 'Euro (€ EUR)', flag: '🇪🇺' },
  JPY: { code: 'JPY', symbol: '¥', rate: 152.0, label: 'Japanese Yen (¥ JPY)', flag: '🇯🇵' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, label: 'Australian Dollar (A$ AUD)', flag: '🇦🇺' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, label: 'Canadian Dollar (C$ CAD)', flag: '🇨🇦' },
};

export const CurrencyProvider = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState(() => {
    const saved = localStorage.getItem('sl_currency');
    if (saved && CURRENCIES[saved]) return saved;

    // Auto location detection based on Intl timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India')) return 'INR';
      if (tz.includes('London') || tz.includes('Belfast')) return 'GBP';
      if (tz.includes('Paris') || tz.includes('Berlin') || tz.includes('Rome') || tz.includes('Madrid') || tz.includes('Amsterdam')) return 'EUR';
      if (tz.includes('Tokyo')) return 'JPY';
      if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane')) return 'AUD';
      if (tz.includes('Toronto') || tz.includes('Vancouver')) return 'CAD';
    } catch (e) {
      // Fallback to USD
    }
    return 'USD';
  });

  useEffect(() => {
    localStorage.setItem('sl_currency', currencyCode);
  }, [currencyCode]);

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const formatCurrency = (amountInUSD) => {
    if (amountInUSD === undefined || amountInUSD === null) return `${currentCurrency.symbol}0`;
    const converted = Math.round(Number(amountInUSD) * currentCurrency.rate);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currencyCode,
      setCurrencyCode,
      currentCurrency,
      formatCurrency,
      currencies: CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
