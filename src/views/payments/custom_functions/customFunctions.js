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

      ////////////////////////////////////////

      paymentItemUrl: '',
      paymentItems: [], // all available paymentItems from loadPaymentItems function
      paymentIemRows: [],
    }
  },
  computed: {
    availablePaymentItemsForRow() {
      return (currentIndex) => {
        const selectedPaymentItemIds = this.paymentIemRows
          .filter((_, index) => index !== currentIndex) // return result without duplicated values ->> the (_) is to ignore the first parameter (row), we only need the index
          .map((row) => row.id) // return id
          .filter((id) => id) // return id that are not null/undefined

        return this.paymentItems.filter(
          (paymentItem) => !selectedPaymentItemIds.includes(paymentItem.id) // exclude already selected paymentItems
        )
      }
    },
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

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    async loadPaymentItems() {
      try {
        const response = await API.get(`${this.paymentItemUrl}/${this.company_id}`)
        this.paymentItems = response.data.data || []
      } catch (error) {}
    },

    addPaymentItemRow() {
      this.paymentIemRows.push({
        id: null,
        unit_price: 0,
        quantity: 0,
        amount: 0,
      })
    },

    removePaymentItemRow(index) {
      this.paymentIemRows.splice(index, 1)
    },

    async onPaymentItemChange(rowIndex) {
      this.paymentIemRows[rowIndex].unit_price = 0
      this.paymentIemRows[rowIndex].quantity = 0
      this.paymentIemRows[rowIndex].amount = 0
    },

    async determinePaymentItemsModule(withLoadItems = false) {
      const accountGuideId = this.formData.account_guide_id

      const accountGuide = this.accountGuides.find(
        (accountGuide) => accountGuide.id == accountGuideId
      )

      if (accountGuide) {
        this.formData.payment_asset_items = []
        this.formData.payment_liability_items = []
        this.formData.payment_equity_items = []
        this.formData.payment_income_items = []
        this.formData.payment_expense_items = []

        if (accountGuide.account_guide_type?.prefix === 'ASSET') {
          this.paymentItemUrl = API_ROUTES.PAYMENT_ASSET_ITEM.SEARCH

          this.formData.payment_asset_items = this.paymentIemRows
        }

        if (accountGuide.account_guide_type?.prefix === 'LIABILITY') {
          this.paymentItemUrl = API_ROUTES.PAYMENT_LIABILITY_ITEM.SEARCH

          this.formData.payment_liability_items = this.paymentIemRows
        }

        if (accountGuide.account_guide_type?.prefix === 'EQUITY') {
          this.paymentItemUrl = API_ROUTES.PAYMENT_EQUITY_ITEM.SEARCH

          this.formData.payment_equity_items = this.paymentIemRows
        }

        if (accountGuide.account_guide_type?.prefix === 'INCOME') {
          this.paymentItemUrl = API_ROUTES.PAYMENT_INCOME_ITEM.SEARCH

          this.formData.payment_income_items = this.paymentIemRows
        }

        if (accountGuide.account_guide_type?.prefix === 'EXPENSE') {
          this.paymentItemUrl = API_ROUTES.PAYMENT_EXPENSE_ITEM.SEARCH

          this.formData.payment_expense_items = this.paymentIemRows
        }

        this.formData.paymentIemRows = this.paymentIemRows // this value for validation instead of validate every key alone

        if (withLoadItems === true && this.paymentItemUrl != null) {
          await this.loadPaymentItems()
        }
      }
    },

    onUnitPriceChange(index) {
      const unit_price = this.paymentIemRows[index].unit_price
      const quantity = this.paymentIemRows[index].quantity

      this.paymentIemRows[index].amount = unit_price * quantity

      this.sumAmount()
    },

    onQuantityChange(index) {
      this.onUnitPriceChange(index)
    },

    sumAmount() {
      if (this.paymentIemRows.length) {
        const subTotal = this.paymentIemRows.reduce((sum, paymentItem) => {
          return sum + paymentItem.unit_price * paymentItem.quantity
        }, 0)

        this.formData.amount = subTotal > 0 ? subTotal : this.formData.amount
      }

      this.formData.amount = this.formData.amount ? this.formData.amount : 0
    },
  },
}

export default customFunctions
