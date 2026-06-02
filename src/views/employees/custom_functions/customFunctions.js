import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      branchUrl: API_ROUTES.BRANCH.SEARCH,
      warehouseUrl: API_ROUTES.WAREHOUSE.SEARCH,
      branches: [],
      warehouses: [],
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

    async loadWarehouses(warehouseId) {
      if (!warehouseId) {
        this.warehouses = []
        return
      }

      try {
        const response = await API.get(`${this.warehouseUrl}/${warehouseId}`)
        this.warehouses = response.data.data || []
      } catch (error) {
        console.error('Error loading warehouses:', error)
      }
    },
  },
}

export default customFunctions
