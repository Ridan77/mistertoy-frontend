import i18n from 'i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next)
    .init({
        debug: false,
        resources: {
            en: {
                translation: {

                    home: 'Home',
                    toys: 'Toys',
                    dashboard: 'Dashboard',
                    about: 'About',
                    mister_toy: 'Mister Toy',
                    online: 'Online',
                    disconnected: 'Disconnected',
                    cart: 'Cart',
                    i18: 'internationalization',
                    user: 'My user'
                },
            },
            he: {
                translation: {
                    home: 'דף הבית',
                    toys: 'צעצועים',
                    dashboard: 'לוח בקרה',
                    about: 'אודותינו',
                    mister_toy: 'אדון צעצועים',
                    online: 'אונליין',
                    disconnected: 'אוף ליין',
                    cart: 'עגלת קניות',
                    i18: 'לוקליזציה',
                    user: 'המשתמש שלי'

                },
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    })

export default i18n
