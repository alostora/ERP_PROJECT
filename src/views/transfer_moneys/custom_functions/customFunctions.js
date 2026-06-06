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
      } catch (error) {
        console.error('Error loading status list:', error)
      }
    },

    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {
        console.error('Error loading branches:', error)
      }
    },

    async loadEmployees(companyId) {
      try {
        const response = await API.get(`${this.employeeUrl}/${companyId}`)
        this.employees = response.data.data || []
      } catch (error) {
        console.error('Error loading employees:', error)
      }
    },

    async loadCashBoxes(companyId) {
      try {
        const response = await API.get(`${this.cashBoxeUrl}/${companyId}`)
        this.cashBoxes = response.data.data || []
      } catch (error) {
        console.error('Error loading cash boxes:', error)
      }
    },

    async loadBankAccounts(companyId) {
      try {
        const response = await API.get(`${this.bankAccountUrl}/${companyId}`)
        this.bankAccounts = response.data.data || []
      } catch (error) {
        console.error('Error loading bank accouns:', error)
      }
    },

    async loadWallets(companyId) {
      try {
        const response = await API.get(`${this.walletUrl}/${companyId}`)
        this.wallets = response.data.data || []
      } catch (error) {
        console.error('Error loading wallets:', error)
      }
    },
  },
}

export default customFunctions
