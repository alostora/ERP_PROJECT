import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      statusListUrl: API_ROUTES.LOOKUP.TRANSFER_MONEY_STATUS,
      statusList: [],

      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      employeeUrl: API_ROUTES.EMPLOYEE.SEARCH,
      employees: [],

      cashBoxeUrl: API_ROUTES.CASH_BOX.SEARCH,
      cashBoxes: [],

      bankAccountUrl: API_ROUTES.BANK_ACCOUNT.SEARCH,
      bankAccounts: [],

      walletUrl: API_ROUTES.WALLET.SEARCH,
      wallets: [],
    }
  },

  methods: {
    async loadStatusList() {
      try {
        const response = await API.get(`${this.statusListUrl}`)
        this.statusList = response.data.data || []
      } catch (error) {}
    },

    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {}
    },

    async loadEmployees(companyId) {
      try {
        const response = await API.get(`${this.employeeUrl}/${companyId}`)
        this.employees = response.data.data || []
      } catch (error) {}
    },

    async loadCashBoxes(companyId) {
      try {
        const response = await API.get(`${this.cashBoxeUrl}/${companyId}`)
        this.cashBoxes = response.data.data || []
      } catch (error) {}
    },

    async loadBankAccounts(companyId) {
      try {
        const response = await API.get(`${this.bankAccountUrl}/${companyId}`)
        this.bankAccounts = response.data.data || []
      } catch (error) {}
    },

    async loadWallets(companyId) {
      try {
        const response = await API.get(`${this.walletUrl}/${companyId}`)
        this.wallets = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
