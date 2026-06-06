import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      branchUrl: API_ROUTES.BRANCH.SEARCH,
      walletSetDefaultUrl: API_ROUTES.WALLET.SET_DEFAULT,
      walletSetActiveUrl: API_ROUTES.WALLET.SET_ACTIVE,
      walletSetInactiveUrl: API_ROUTES.WALLET.SET_INACTIVE,
      branches: [],
    }
  },

  methods: {
    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {
        console.error('Error loading branches:', error)
      }
    },

    async setDefaultWallet(walletId) {
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
            await API.patch(`${this.walletSetDefaultUrl}/${walletId}`)
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

    async setActiveWallet(walletId) {
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
            await API.patch(`${this.walletSetActiveUrl}/${walletId}`)
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

    async setInactiveWallet(walletId) {
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
            await API.patch(`${this.walletSetInactiveUrl}/${walletId}`)
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
