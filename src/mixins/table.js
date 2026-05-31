import API from './api'

export const tableMixin = {
  data() {
    return {
      items: [],
      itemData: [],
      loading: false,
      meta: { current_page: 1, total: 0, last_page: 1 },
      perPage: 10,
      paginate: true,
      searchQuery: '',
      sortField: null,
      sortOrder: null,
      searchTimeout: null,
    }
  },

  methods: {
    async fetchData() {
      this.loading = true

      try {
        const params = {
          page: this.meta.current_page,
          per_page: this.perPage,
          paginate: this.paginate,
        }

        if (this.searchQuery?.trim()) {
          params.search = this.searchQuery.trim()
        }

        if (this.sortField) {
          params.sort_by = this.sortField
          params.sort_order = this.sortOrder === 1 ? 'asc' : 'desc'
        }

        if (this.filters) {
          Object.keys(this.filters).forEach((key) => {
            const value = this.filters[key]
            if (value !== null && value !== undefined && value !== '') {
              params[key] = value
            }
          })
        }

        const response = await API.get(this.apiUrl, { params })
        this.items = response.data.data || []
        this.meta = response.data.meta || { total: 0, current_page: 1 }
      } catch (error) {
        console.error(error)
        // Show error message using i18n
        this.$toast.add({
          severity: 'error',
          summary: this.$t('common.error'),
          detail: this.$t('common.fetchFailed'),
          life: 3000,
        })
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.meta.current_page = 1
        this.fetchData()
      }, 500)
    },

    onPageChange(event) {
      this.perPage = event.rows
      this.meta.current_page = event.page + 1
      this.fetchData()
    },

    onSort(event) {
      this.sortField = event.sortField
      this.sortOrder = event.sortOrder
      this.fetchData()
    },

    async deleteItem(url, id, name) {
      this.$confirm.require({
        message: this.$t('common.confirmDeleteMessage', { itemName: name }),
        header: this.$t('common.confirmDeleteTitle'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmDeleteYes'),
        rejectLabel: this.$t('common.confirmDeleteNo'),
        accept: async () => {
          this.loading = true
          try {
            await API.delete(`${url}/${id}`)
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.deletedSuccessfully'),
              life: 3000,
            })
            this.fetchData()
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.error'),
              detail: error.response?.data?.message || this.$t('common.deleteFailed'),
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

    async showItem(url, id) {
      this.loading = true
      try {
        const response = await API.get(`${url}/${id}`)
        this.itemData = response.data.data || {}
      } catch (error) {
        console.error(error)
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load item data',
          life: 3000,
        })
      } finally {
        this.loading = false
      }
    },
  },
}

export default tableMixin
