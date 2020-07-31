import {useEffect, useState} from 'react';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

export const useLocalization = () => {
  const [localizationConfigured, setLocalizationConfigured] = useState(false);

  useEffect(() => {
    i18n.translations = {
      en: {
        signIn: 'Sign In',
        reverseCurrencies: 'Reverse Currencies',
        baseCurrency: 'Base Currency',
        quoteCurrency: 'Quote Currency',
      },
      es: {
        signIn: 'Ingresar',
        reverseCurrencies: 'Monedas Inversas',
        baseCurrency: 'Moneda Base',
        quoteCurrency: 'Moneda de Cotización',
      },
    };
    i18n.fallbacks = true;
    i18n.defaultLocale = 'en';

    const handleLocalizationChange = () => {
      i18n.locale = RNLocalize.getLocales()[0].languageCode;
    };

    handleLocalizationChange();
    setLocalizationConfigured(true);

    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  return { localizationConfigured };
};
