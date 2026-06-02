import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      taxUrl: API_ROUTES.TAX.SEARCH,
      taxes: [],
      taxRows: [
        {
          tax_id: null,
          fixed_amount_override: null,
        },
      ],
    }
  },

  computed: {
    availableTaxesForRow() {
      return (currentIndex) => {
        const selectedTaxIds = this.taxRows
          .filter((_, index) => index !== currentIndex)
          .map((row) => row.tax_id)
          .filter((id) => id)

        return this.taxes.filter((tax) => !selectedTaxIds.includes(tax.id))
      }
    },
  },

  methods: {
    async loadTaxes(companyId) {
      try {
        const response = await API.get(`${this.taxUrl}/${companyId}`)
        this.taxes = response.data.data || []
      } catch (error) {
        console.error('Error loading taxes:', error)
      }
    },

    addTaxRow() {
      this.taxRows.push({
        tax_id: null,
        fixed_amount_override: null,
      })
    },

    removeTaxRow(index) {
      if (this.taxRows.length > 1) {
        this.taxRows.splice(index, 1)
        this.formData.taxes = this.taxRows.filter((row) => row.tax_id)
      }
    },

    getSelectedTaxName(taxId) {
      if (!taxId) return ''
      const tax = this.taxes.find((t) => t.id === taxId)
      return tax ? (this.currentLanguage === 'ar' ? tax.name_ar : tax.name) : ''
    },

    onTaxChange(rowIndex, event) {
      this.taxRows[rowIndex].tax_id = event.value
      this.formData.taxes = this.taxRows.filter((row) => row.tax_id)
    },

    onFixedAmountChange(rowIndex, event) {
      this.taxRows[rowIndex].fixed_amount_override = event.target.value
      this.formData.taxes = this.taxRows.filter((row) => row.tax_id)
    },
  },
}

export default customFunctions
