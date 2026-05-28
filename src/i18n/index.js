import { createI18n } from 'vue-i18n'

// Import English translations
import enCommon from './locales/en/common'
import enUsers from './locales/en/users'
import enCountries from './locales/en/countries'
import enGovernorates from './locales/en/governorates'

// Import Arabic translations
import arCommon from './locales/ar/common'
import arUsers from './locales/ar/users'
import arCountries from './locales/ar/countries'
import arGovernorates from './locales/ar/governorates'

const messages = {
     en: {
          common: enCommon,
          users: enUsers,
          countries: enCountries,
          governorates: enGovernorates,
     },
     ar: {
          common: arCommon,
          users: arUsers,
          countries: arCountries,
          governorates: arGovernorates,
     },
}

const i18n = createI18n({
     legacy: false,
     locale: localStorage.getItem('language') || 'en',
     fallbackLocale: 'en',
     messages,
})

export default i18n