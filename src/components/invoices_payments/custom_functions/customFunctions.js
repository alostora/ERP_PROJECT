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
      const selectedPaymentMethod = this.paymentMethods.find(
        (paymentMethod) => paymentMethod.id === payment.payment_method_id
      )

      if (selectedPaymentMethod) {
        payment.selectedPaymentMethod = selectedPaymentMethod
        if (
          selectedPaymentMethod.prefix === 'CARD' ||
          selectedPaymentMethod.prefix === 'BANK_ACCOUNT' ||
          selectedPaymentMethod.prefix === 'CHECK'
        ) {
          if (!this.bankAccounts.length) {
            await this.loadBankAccounts()
          }
          this.$nextTick(() => {
            payment.cashBoxs = []
            payment.wallets = []
            payment.bankAccounts = this.bankAccounts
          })
        } else if (selectedPaymentMethod.prefix === 'MOBILE_WALLET') {
          if (!this.wallets.length) {
            await this.loadWallets()
          }
          this.$nextTick(() => {
            payment.bankAccounts = []
            payment.cashBoxs = []
            payment.wallets = this.wallets
          })
        } else if (selectedPaymentMethod.prefix === 'CASH') {
          if (!this.cashBoxs.length) {
            await this.loadCashBoxs()
          }
          this.$nextTick(() => {
            payment.bankAccounts = []
            payment.wallets = []
            payment.cashBoxs = this.cashBoxs
          })
        }
      } else {
        payment.bankAccounts = []
        payment.wallets = []
        payment.cashBoxs = []
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
