import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      taxUrl: API_ROUTES.TAX.LIST,
      taxCategoryTaxSetSorttUrl: API_ROUTES.TAX_CATEGORY_TAX.SET_SORT,
      taxes: [],
      taxRows: [
        {
          tax_id: null,
          fixed_amount_override: null,
        },
      ],
      dragIndex: null,
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
    async loadTaxes(companyId, taxCategoryId) {
      try {
        const params = { tax_category_id: taxCategoryId }

        const response = await API.get(`${this.taxUrl}/${companyId}`, { params })
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

    //////////////////////////////////////////////////////

    dragStart(event, index) {
      this.dragIndex = index
      event.dataTransfer.effectAllowed = 'move'
      event.target.style.opacity = '0.5'
    },

    dragOver(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },

    async drop(event, dropIndex) {
      event.preventDefault()
      event.target.style.opacity = '1'

      if (this.dragIndex === dropIndex) return

      const draggedItem = this.items[this.dragIndex]
      const newPosition = dropIndex + 1

      console.log('Dragged Item:', draggedItem)

      try {
        await API.patch(
          `${this.taxCategoryTaxSetSorttUrl}/${draggedItem.tax_category.id}/${draggedItem.tax.id}`,
          {
            new_position: newPosition,
          }
        )
        this.fetchData()
        this.$toast.add({
          severity: 'success',
          summary: this.$t('common.success'),
          detail: this.$t('taxCategoryTaxes.orderUpdated'),
          life: 3000,
        })
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('common.error'),
          // detail: error.response?.data?.message || this.$t('common.updateFailed'),
          detail: error,
          life: 3000,
        })
        this.fetchData()
      }

      this.dragIndex = null
    },
  },
}

export default customFunctions
