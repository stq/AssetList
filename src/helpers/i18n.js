import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../translations/en.js'

i18n
    .use(initReactI18next)
    .init({
        resources: {
          en: {
              translation: enTranslations
          }
        },
        lng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });


export default i18n;