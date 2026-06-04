import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
    },
    lng: 'en', // Default to English
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['cookie'],
    },
    fallbackLng: ['fr', 'en'], // Allow fallback to French
    compatibilityJSON: 'v3',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;