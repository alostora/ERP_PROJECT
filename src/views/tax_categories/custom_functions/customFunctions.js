import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export const customFunctions = {
  mixins: [tableMixin],
  data() {
    return {
      taxUrl: API_ROUTES.TAX.SEARCH,
      taxCategorySetActiveUrl: API_ROUTES.TAX_CATEGORY.SET_ACTIVE,
      taxCategorySetInactiveUrl: API_ROUTES.TAX_CATEGORY.SET_INACTIVE,
      taxCategorySetDefaultUrl: API_ROUTES.TAX_CATEGORY.SET_DEFAULT,
      taxes: [],
    }
  },
  methods: {
    async loadTaxes(companyId) {
      try {
        const response = await API.get(`${this.taxUrl}/${companyId}`)
        this.taxes = response.data.data || []
      } catch (error) {}
    },

    async setDefaultTaxCategory(taxCategoryId) {
      this.$confirm.require({
        message: this.$t('common.confirmSetDefault'),
        header: this.$t('common.confirmSetDefault'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmYes'),
        rejectLabel: this.$t('common.confirmNo'),
        accept: async () => {
          this.loading = true
          try {
            await API.patch(`${this.taxCategorySetDefaultUrl}/${taxCategoryId}`)
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.updatedSuccessfully'),
              life: 3000,
            })
            this.fetchData()
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.error'),
              detail: error.response?.data?.message || this.$t('common.updateFailed'),
              life: 3000,
            })
          } finally {
            this.loading = false
          }
        },
        reject: () => {
          this.loading = false
        },
      })
    },

    async setActiveTaxCategory(taxCategoryId) {
      this.$confirm.require({
        message: this.$t('common.confirmSetActive'),
        header: this.$t('common.confirmSetActive'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmYes'),
        rejectLabel: this.$t('common.confirmNo'),
        accept: async () => {
          this.loading = true
          try {
            await API.patch(`${this.taxCategorySetActiveUrl}/${taxCategoryId}`)
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.updatedSuccessfully'),
              life: 3000,
            })
            this.fetchData()
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.error'),
              detail: error.response?.data?.message || this.$t('common.updateFailed'),
              life: 3000,
            })
          } finally {
            this.loading = false
          }
        },
        reject: () => {
          this.fetchData() // torevert status
          this.loading = false
        },
      })
    },

    async setInactiveTaxCategory(taxCategoryId) {
      this.$confirm.require({
        message: this.$t('common.confirmSetInactive'),
        header: this.$t('common.confirmSetInactive'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmYes'),
        rejectLabel: this.$t('common.confirmNo'),
        accept: async () => {
          this.loading = true
          try {
            await API.patch(`${this.taxCategorySetInactiveUrl}/${taxCategoryId}`)
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.updatedSuccessfully'),
              life: 3000,
            })
            this.fetchData()
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.error'),
              detail: error.response?.data?.message || this.$t('common.updateFailed'),
              life: 3000,
            })
          } finally {
            this.loading = false
          }
        },
        reject: () => {
          this.fetchData() // torevert status
          this.loading = false
        },
      })
    },
  },
}

export default customFunctions
