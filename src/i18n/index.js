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
import enTaxes from './locales/en/taxes'
import enTaxCategories from './locales/en/taxCategories'
import enTaxCategoryTaxes from './locales/en/taxCategoryTaxes'
import enEmployees from './locales/en/employees'
import enContacts from './locales/en/contacts'
import enBranches from './locales/en/branches'
import enWarehouses from './locales/en/warehouses'
import enDiscounts from './locales/en/discounts'
import enAccountGuides from './locales/en/accountGuides'
import enCashBoxes from './locales/en/cashBoxes'
import enBankAccounts from './locales/en/bankAccounts'
import enWallets from './locales/en/wallets'
import enTransferMoneys from './locales/en/transferMoneys'
import enPayments from './locales/en/payments'
import enPurchasesInvoices from './locales/en/purchasesInvoices'
import enPurchasesInvoicesReturns from './locales/en/purchasesInvoicesReturns'
import enSalesInvoices from './locales/en/salesInvoices'
import enSalesInvoicesReturns from './locales/en/salesInvoicesReturns'

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
import arTaxes from './locales/ar/taxes'
import arTaxCategories from './locales/ar/taxCategories'
import arTaxCategoryTaxes from './locales/ar/taxCategoryTaxes'
import arEmployees from './locales/ar/employees'
import arContacts from './locales/ar/contacts'
import arBranches from './locales/ar/branches'
import arWarehouses from './locales/ar/warehouses'
import arDiscounts from './locales/ar/discounts'
import arAccountGuides from './locales/ar/accountGuides'
import arCashBoxes from './locales/ar/cashBoxes'
import arBankAccounts from './locales/ar/bankAccounts'
import arWallets from './locales/ar/wallets'
import arTransferMoneys from './locales/ar/transferMoneys'
import arPayments from './locales/ar/payments'
import arPurchasesInvoices from './locales/ar/purchasesInvoices'
import arPurchasesInvoicesReturns from './locales/ar/purchasesInvoicesReturns'
import arSalesInvoices from './locales/ar/salesInvoices'
import arSalesInvoicesReturns from './locales/ar/salesInvoicesReturns'

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
    taxes: enTaxes,
    taxCategories: enTaxCategories,
    taxCategoryTaxes: enTaxCategoryTaxes,
    employees: enEmployees,
    contacts: enContacts,
    branches: enBranches,
    warehouses: enWarehouses,
    discounts: enDiscounts,
    accountGuides: enAccountGuides,
    cashBoxes: enCashBoxes,
    bankAccounts: enBankAccounts,
    wallets: enWallets,
    transferMoneys: enTransferMoneys,
    payments: enPayments,
    purchasesInvoices: enPurchasesInvoices,
    purchasesInvoicesReturns: enPurchasesInvoicesReturns,
    salesInvoices: enSalesInvoices,
    salesInvoicesReturns: enSalesInvoicesReturns,
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
    finalProductVariantValues: arFinalProductVariantValues,
    stages: arStages,
    taxes: arTaxes,
    taxCategories: arTaxCategories,
    taxCategoryTaxes: arTaxCategoryTaxes,
    employees: arEmployees,
    contacts: arContacts,
    branches: arBranches,
    warehouses: arWarehouses,
    discounts: arDiscounts,
    accountGuides: arAccountGuides,
    cashBoxes: arCashBoxes,
    bankAccounts: arBankAccounts,
    wallets: arWallets,
    transferMoneys: arTransferMoneys,
    payments: arPayments,
    purchasesInvoices: arPurchasesInvoices,
    purchasesInvoicesReturns: arPurchasesInvoicesReturns,
    salesInvoices: arSalesInvoices,
    salesInvoicesReturns: arSalesInvoicesReturns,
  },
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
