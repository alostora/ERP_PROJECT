import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  data() {
    return {
      errors: {},
      paymentMethods: [],
    }
  },
  mounted() {
    this.loadPaymentMethodsForValidation(this.company_id)
  },
  methods: {
    async loadPaymentMethodsForValidation(companyId) {
      try {
        const response = await API.get(API_ROUTES.LOOKUP.PAYMENT_METHOD)
        this.paymentMethods = response.data.data || []
      } catch (error) {
        console.error('Error loading payment methods:', error)
      }
    },

    validateCreateForm(form) {
      this.errors = {}

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('purchasesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('purchasesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('purchasesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('purchasesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'purchasesInvoices.validation.duplicateFinalProducts'
          )
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'purchasesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'purchasesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'purchasesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'purchasesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'purchasesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'purchasesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'purchasesInvoices.validation.operationDetailsRequired'
                )
              }
            })
          }
        })
      }

      // Validate additional costs
      if (form.additional_costs?.length) {
        form.additional_costs.forEach((cost, index) => {
          if (!cost.name?.trim()) {
            this.errors[`additional_costs.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountValueRequired'
            )
          }
        })
      }

      // Validate payments
      if (form.payments?.length) {
        form.payments.forEach((payment, index) => {
          if (!payment.amount || payment.amount < 1) {
            this.errors[`payments.${index}.amount`] = this.$t(
              'purchasesInvoices.validation.amountRequired'
            )
          }

          if (!payment.payment_method_id?.trim()) {
            this.errors[`payments.${index}.payment_method_id`] = this.$t(
              'purchasesInvoices.validation.paymentMethodIdRequired'
            )
          }

          if (payment.payment_method_id?.trim() && form.company_id?.trim()) {
            const selected = this.paymentMethods.find(
              (paymentMethod) => paymentMethod.id === payment.payment_method_id
            )

            if (!selected) {
              this.errors[`payments.${index}.payment_method_id`] = this.$t(
                'purchasesInvoices.validation.paymentMethodIdRequired'
              )
            }

            if (
              (selected.prefix === 'CARD' ||
                selected.prefix === 'BANK_ACCOUNT' ||
                selected.prefix === 'CHECK') &&
              !payment.bank_account_id?.trim()
            ) {
              this.errors[`payments.${index}.bank_account_id`] = this.$t(
                'purchasesInvoices.validation.bankAccountIdRequired'
              )
            } else if (selected.prefix === 'CASH' && !payment.cash_box_id?.trim()) {
              this.errors[`payments.${index}.cash_box_id`] = this.$t(
                'purchasesInvoices.validation.cashBoxIdRequired'
              )
            } else if (selected.prefix === 'MOBILE_WALLET' && !payment.wallet_id?.trim()) {
              this.errors[`payments.${index}.wallet_id`] = this.$t(
                'purchasesInvoices.validation.walletIdRequired'
              )
            }
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('purchasesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('purchasesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('purchasesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('purchasesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'purchasesInvoices.validation.duplicateFinalProducts'
          )
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'purchasesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'purchasesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'purchasesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'purchasesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'purchasesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'purchasesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'purchasesInvoices.validation.operationDetailsRequired'
                )
              }
            })
          }
        })
      }

      // Validate additional costs
      if (form.additional_costs?.length) {
        form.additional_costs.forEach((cost, index) => {
          if (!cost.name?.trim()) {
            this.errors[`additional_costs.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountValueRequired'
            )
          }
        })
      }

      // Validate payments
      if (form.payments?.length) {
        form.payments.forEach((payment, index) => {
          if (!payment.amount || payment.amount < 1) {
            this.errors[`payments.${index}.amount`] = this.$t(
              'purchasesInvoices.validation.amountRequired'
            )
          }

          if (!payment.payment_method_id?.trim()) {
            this.errors[`payments.${index}.payment_method_id`] = this.$t(
              'purchasesInvoices.validation.paymentMethodIdRequired'
            )
          }

          if (payment.payment_method_id?.trim() && form.company_id?.trim()) {
            const selected = this.paymentMethods.find(
              (paymentMethod) => paymentMethod.id === payment.payment_method_id
            )

            if (!selected) {
              this.errors[`payments.${index}.payment_method_id`] = this.$t(
                'purchasesInvoices.validation.paymentMethodIdRequired'
              )
            }

            if (
              (selected.prefix === 'CARD' ||
                selected.prefix === 'BANK_ACCOUNT' ||
                selected.prefix === 'CHECK') &&
              !payment.bank_account_id?.trim()
            ) {
              this.errors[`payments.${index}.bank_account_id`] = this.$t(
                'purchasesInvoices.validation.bankAccountIdRequired'
              )
            } else if (selected.prefix === 'CASH' && !payment.cash_box_id?.trim()) {
              this.errors[`payments.${index}.cash_box_id`] = this.$t(
                'purchasesInvoices.validation.cashBoxIdRequired'
              )
            } else if (selected.prefix === 'MOBILE_WALLET' && !payment.wallet_id?.trim()) {
              this.errors[`payments.${index}.wallet_id`] = this.$t(
                'purchasesInvoices.validation.walletIdRequired'
              )
            }
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageForm(form) {
      this.errors = {}

      // Stage ID required
      if (!form.stage_id?.trim()) {
        this.errors.stage_id = this.$t('purchasesInvoices.validation.stageIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('purchasesInvoices.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
