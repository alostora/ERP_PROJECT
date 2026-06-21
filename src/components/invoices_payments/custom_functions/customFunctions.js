import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import LOOKUP_TYPES from '@/constants/lookupTypes'

export const customFunctions = {
  data() {
    return {
      finalProductFilters: {
        branch_id: '',
        category_id: '',
      },

      paymentMethodUrl: API_ROUTES.LOOKUP.PAYMENT_METHOD,
      paymentMethods: [],

      bankAccountsUrl: API_ROUTES.BANK_ACCOUNT.SEARCH,
      bankAccounts: [],

      cashBoxsUrl: API_ROUTES.CASH_BOX.SEARCH,
      cashBoxs: [],

      walletsUrl: API_ROUTES.WALLET.SEARCH,
      wallets: [],
    }
  },

  methods: {
    async loadPaymentMethods() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.paymentMethodUrl}`)
        this.paymentMethods = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async determineMethod(payment) {
      const selected = this.paymentMethods.find((m) => m.id === payment.payment_method_id)
      if (!selected) {
        payment.selectedPaymentMethod = null
        payment.bankAccounts = []
        payment.cashBoxs = []
        payment.wallets = []
        return
      }
      payment.selectedPaymentMethod = selected

      // Save current selections before clearing
      const currentBankAccountId = payment.bank_account_id
      const currentCashBoxId = payment.cash_box_id
      const currentWalletId = payment.wallet_id

      // Clear arrays (but keep IDs for later)
      payment.bank_account_id = null
      payment.cash_box_id = null
      payment.wallet_id = null

      if (
        selected.prefix === 'CARD' ||
        selected.prefix === 'BANK_ACCOUNT' ||
        selected.prefix === 'CHECK'
      ) {
        if (!this.bankAccounts.length) await this.loadBankAccounts()
        payment.bankAccounts = [...this.bankAccounts]
        payment.cashBoxs = []
        payment.wallets = []
        // Restore bank account selection if still valid
        if (
          currentBankAccountId &&
          payment.bankAccounts.some((b) => b.id === currentBankAccountId)
        ) {
          payment.bank_account_id = currentBankAccountId
        }
      } else if (selected.prefix === 'MOBILE_WALLET') {
        if (!this.wallets.length) await this.loadWallets()
        payment.wallets = [...this.wallets]
        payment.bankAccounts = []
        payment.cashBoxs = []
        if (currentWalletId && payment.wallets.some((w) => w.id === currentWalletId)) {
          payment.wallet_id = currentWalletId
        }
      } else if (selected.prefix === 'CASH') {
        if (!this.cashBoxs.length) await this.loadCashBoxs()
        payment.cashBoxs = [...this.cashBoxs]
        payment.bankAccounts = []
        payment.wallets = []
        if (currentCashBoxId && payment.cashBoxs.some((c) => c.id === currentCashBoxId)) {
          payment.cash_box_id = currentCashBoxId
        }
      }
    },
    async loadBankAccounts() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.bankAccountsUrl}/${this.company_id}`)
        this.bankAccounts = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadCashBoxs() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.cashBoxsUrl}/${this.company_id}`)
        this.cashBoxs = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadWallets() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.walletsUrl}/${this.company_id}`)
        this.wallets = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    addInvoicePaymentRow() {
      this.localFormData.payments.push({
        bankAccounts: [],
        cashBoxs: [],
        wallets: [],
        selectedPaymentMethod: [],
        amount: '',
        payment_method_id: '',
        cash_box_id: '',
        bank_account_id: '',
        check_number: '',
        check_due_date: '',
        wallet_id: '',
        mobile_number: '',
        notes: '',
      })
    },

    deleteInvoicePaymentRow(paymentIndex) {
      this.localFormData.payments.splice(paymentIndex, 1)
    },
  },
}

export default customFunctions
