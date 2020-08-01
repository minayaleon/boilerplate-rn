import {useEffect, useState} from 'react';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

export const useLocalization = () => {
  const [localizationConfigured, setLocalizationConfigured] = useState(false);

  useEffect(() => {

    const langGetter = {
      en: () => require('./langs/en.json'),
      es: () => require('./langs/es.json')
    };

    const handleLocalizationChange = () => {
      const languageCode = RNLocalize.getLocales()[0].languageCode;
      // const languageCode = 'es';
      const lang = langGetter[languageCode]();
      const translations = { 'en': langGetter['en'](), [languageCode]: lang };

      i18n.locale = languageCode;
      i18n.translations = translations
      i18n.fallbacks = true;
      i18n.defaultLocale = 'en';
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
