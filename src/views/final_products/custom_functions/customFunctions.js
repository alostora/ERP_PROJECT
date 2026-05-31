import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      categoryUrl: API_ROUTES.CATEGORY.SEARCH,
      productUrl: API_ROUTES.PRODUCT.SEARCH,
      measurementUnitUrl: API_ROUTES.MEASUREMENT_UNIT.SEARCH,
      variantUrl: API_ROUTES.VARIANT.SEARCH,
      variantValueUrl: API_ROUTES.VARIANT_VALUE.SEARCH,
      categories: [],
      products: [],
      measurementUnits: [],
      ////////////////////////////////////////

      variants: [], // all available variants from loadVariants function
      variantValues: {},
      variantRows: [
        {
          variant_id: null,
          variant_value_id: null,
        },
      ],
    }
  },

  computed: {
    availableVariantsForRow() {
      return (currentIndex) => {
        const selectedVariantIds = this.variantRows
          .filter((_, index) => index !== currentIndex) // return result without duplicated values ->> the (_) is to ignore the first parameter (row), we only need the index
          .map((row) => row.variant_id) // return variant_id
          .filter((id) => id) // return variant_id that are not null/undefined

        return this.variants.filter(
          (variant) => !selectedVariantIds.includes(variant.id) // exclude already selected variants
        )
      }
    },
  },
  methods: {
    async loadCategories(companyId) {
      try {
        const response = await API.get(`${this.categoryUrl}/${companyId}`)
        this.categories = response.data.data || []
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    },

    async loadProducts(companyId, categoryId) {
      try {
        const params = { category_id: categoryId }
        const response = await API.get(`${this.productUrl}/${companyId}`, { params })
        this.products = response.data.data || []
      } catch (error) {
        console.error('Error loading products:', error)
      }
    },

    async loadMeasurementUnits(companyId) {
      try {
        const response = await API.get(`${this.measurementUnitUrl}/${companyId}`)
        this.measurementUnits = response.data.data || []
      } catch (error) {
        console.error('Error loading measurement units:', error)
      }
    },

    //////////////////////////////////////////////////////////////////////////////////

    async loadVariants(companyId) {
      try {
        const response = await API.get(`${this.variantUrl}/${companyId}`)
        this.variants = response.data.data || []
      } catch (error) {
        console.error('Error loading variants:', error)
      }
    },

    async loadVariantValues(variantId) {
      try {
        const response = await API.get(`${this.variantValueUrl}/${variantId}`)

        const variantValuesData = response.data.data || []

        this.variantValues = {
          ...this.variantValues,
          [variantId]: variantValuesData,
        }

        // this.$forceUpdate()
      } catch (error) {
        this.variantValues = {
          ...this.variantValues,
          [variantId]: [],
        }
      }
    },

    addVariantRow() {
      this.variantRows.push({
        variant_id: null,
        variant_value_id: null,
      })
    },

    removeVariantRow(index) {
      if (this.variantRows.length > 1) {
        this.variantRows.splice(index, 1)

        this.formData.variants = this.variantRows.filter(
          (row) => row.variant_id && row.variant_value_id
        )
      }
    },

    getSelectedVariantName(variantId) {
      if (!variantId) return ''
      const variant = this.variants.find((v) => v.id === variantId)
      return variant ? variant.name : ''
    },

    getSelectedVariantValueName(valueId, variantId) {
      if (!valueId || !variantId) return ''
      const values = this.variantValues[variantId] || []
      const value = values.find((v) => v.id === valueId)
      return value ? value.value : ''
    },

    getVariantValues(variantId) {
      if (!variantId) return []
      return this.variantValues[variantId] || []
    },

    getVariantLabel(variant) {
      return `${variant.variant?.name}: ${variant.variant_value.value}`
    },

    async onVariantChange(rowIndex, event) {
      const variantId = event.value

      this.variantRows[rowIndex].variant_value_id = null

      if (variantId) {
        await this.loadVariantValues(variantId)
      }
    },

    async onVariantValueChange(rowIndex, event, variantId) {
      this.formData.variants = this.variantRows.filter(
        (row) => row.variant_id && row.variant_value_id
      )
    },
  },
}

export default customFunctions
