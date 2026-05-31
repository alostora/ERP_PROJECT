import { createI18n } from 'vue-i18n'

// Import English translations
import enCommon from './locales/en/common'
import enUsers from './locales/en/users'
import enCountries from './locales/en/countries'
import enGovernorates from './locales/en/governorates'
import enCities from './locales/en/cities'
import enCompanies from './locales/en/companies'
import enClients from './locales/en/clients'
import enCategories from './locales/en/categories'
import enMeasurementUnitGroups from './locales/en/measurementUnitGroups'
import enMeasurementUnits from './locales/en/measurementUnits'
import enVariants from './locales/en/variants'
import enVariantValues from './locales/en/variantValues'
import enProducts from './locales/en/products'
import enFinalProducts from './locales/en/finalProducts'
import enFinalProductVariantValues from './locales/en/finalProductVariantValues'
import enStages from './locales/en/stages'

// Import Arabic translations
import arCommon from './locales/ar/common'
import arUsers from './locales/ar/users'
import arCountries from './locales/ar/countries'
import arGovernorates from './locales/ar/governorates'
import arCities from './locales/ar/cities'
import arCompanies from './locales/ar/companies'
import arClients from './locales/ar/clients'
import arCategories from './locales/ar/categories'
import arMeasurementUnitGroups from './locales/ar/measurementUnitGroups'
import arMeasurementUnits from './locales/ar/measurementUnits'
import arVariants from './locales/ar/variants'
import arVariantValues from './locales/ar/variantValues'
import arProducts from './locales/ar/products'
import arFinalProducts from './locales/ar/finalProducts'
import arFinalProductVariantValues from './locales/ar/finalProductVariantValues'
import arStages from './locales/ar/stages'

const messages = {
  en: {
    common: enCommon,
    users: enUsers,
    countries: enCountries,
    governorates: enGovernorates,
    cities: enCities,
    companies: enCompanies,
    clients: enClients,
    categories: enCategories,
    measurementUnitGroups: enMeasurementUnitGroups,
    measurementUnits: enMeasurementUnits,
    variants: enVariants,
    variantValues: enVariantValues,
    products: enProducts,
    finalProducts: enFinalProducts,
    finalProductVariantValues: enFinalProductVariantValues,
    stages: enStages,
  },
  ar: {
    common: arCommon,
    users: arUsers,
    countries: arCountries,
    governorates: arGovernorates,
    cities: arCities,
    companies: arCompanies,
    clients: arClients,
    categories: arCategories,
    measurementUnitGroups: arMeasurementUnitGroups,
    measurementUnits: arMeasurementUnits,
    variants: arVariants,
    variantValues: arVariantValues,
    products: arProducts,
    finalProducts: arFinalProducts,
    stages: arStages,
  },
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
