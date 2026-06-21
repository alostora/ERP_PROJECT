import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      paymentMethodUrl: API_ROUTES.LOOKUP.PAYMENT_METHOD,
      paymentMethods: [],

      paymentStatusUrl: API_ROUTES.LOOKUP.PAYMENT_STATUS,
      paymentStatusList: [],

      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      accountGuideUrl: API_ROUTES.ACCOUNT_GUIDE.SEARCH,
      accountGuides: [],

      cashBoxeUrl: API_ROUTES.CASH_BOX.SEARCH,
      cashBoxes: [],

      cashBoxeShiftUrl: API_ROUTES.CASH_BOX_SHIFT.SEARCH,
      cashBoxShifts: [],

      bankAccountUrl: API_ROUTES.BANK_ACCOUNT.SEARCH,
      bankAccounts: [],

      walletUrl: API_ROUTES.WALLET.SEARCH,
      wallets: [],
    }
  },

  methods: {
    async loadPaymentMethods() {
      try {
        const response = await API.get(`${this.paymentMethodUrl}`)
        this.paymentMethods = response.data.data || []
      } catch (error) {}
    },

    async loadPaymentStatus() {
      try {
        const response = await API.get(`${this.paymentStatusUrl}`)
        this.paymentStatusList = response.data.data || []
      } catch (error) {}
    },

    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {}
    },

    async loadAccountGuides(companyId) {
      try {
        const response = await API.get(`${this.accountGuideUrl}/${companyId}`)
        this.accountGuides = response.data.data || []
      } catch (error) {}
    },

    async loadCashBoxes(companyId) {
      try {
        const response = await API.get(`${this.cashBoxeUrl}/${companyId}`)
        this.cashBoxes = response.data.data || []
      } catch (error) {}
    },

    async loadCashBoxShifts(companyId, cashBoxId) {
      try {
        const params = { cash_box_id: cashBoxId }
        const response = await API.get(`${this.cashBoxeShiftUrl}/${companyId}`, { params })
        this.cashBoxShifts = response.data.data || []
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
