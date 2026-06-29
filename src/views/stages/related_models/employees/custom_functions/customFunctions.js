import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      warehouseUrl: API_ROUTES.WAREHOUSE.SEARCH,
      warehouses: [],

      employeeUrl: API_ROUTES.EMPLOYEE.NONE_STAGE_EMPLOYEE_LIST,
      employees: [],
    }
  },
  methods: {
    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {}
    },

    async loadEmployees(stageId) {
      try {
        const response = await API.get(`${this.employeeUrl}/${stageId}`)
        this.employees = response.data.data || []
      } catch (error) {}
    },

    async loadWarehouses(companyId, branchId) {
      if (!branchId) {
        this.warehouses = []
        return
      }

      try {
        const params = { branch_id: branchId }
        const response = await API.get(`${this.warehouseUrl}/${companyId}`, { params })
        this.warehouses = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
