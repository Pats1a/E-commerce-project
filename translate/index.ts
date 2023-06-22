import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import global from './global.json'

const resources = { 
    en: {
        translation: {
            global: global.en,
        },
    },
    ge: {
        translation: {
            global: global.ge,
        },
    },
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources,
    fallbackLng: 'en',
    lng: 'ge',
    debug: true,
})

export default i18n;