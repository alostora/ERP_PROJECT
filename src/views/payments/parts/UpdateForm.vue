<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('payments.title') })"
    :modal="true"
    :style="{ width: '600px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="selectedPaymentMethod"
              :options="paymentMethods"
              :optionLabel="paymentMethodLabel"
              :placeholder="$t('common.select') + ' ' + $t('payments.payment_method')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="determinePaymentModule"
            />
            <small v-if="errors.payment_method_id" class="error-message">
              {{ errors.payment_method_id }}
            </small>
          </div>
        </div>

        <div class="col-12 col-md-6" v-if="selectedPaymentMethod">
          <div class="form-group">
            <Select
              v-model="module_id"
              :options="moduleOptions"
              :optionLabel="moduleOptionLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + modulePlaceholderLabel"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="assignValueToModule"
            />
            <small v-if="errors.module_id" class="error-message">{{ errors.module_id }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputNumber id="amount" v-model="formData.amount" autocomplete="on" class="w-full" />
              <label for="amount">{{ $t('payments.amount') }}</label>
            </FloatLabel>
            <small v-if="errors.amount" class="error-message">{{ errors.amount }}</small>
          </div>
        </div>
      </div>

      <!-- /////////////////////////////////////////////////////////////////////////////// -->
      <!-- Payment Items Section -->

      <Panel :toggleable="true" :collapsed="true" v-if="formData.account_guide_id">
        <template #header>
          <div class="flex items-center gap-2">
            <i class="pi pi-search text-warning p-1"></i>
            <span class="font-medium text-warning">
              {{ $t('payments.paymentItems') }}
            </span>
          </div>
        </template>
        <div class="field mb-3">
          <div class="flex justify-between align-center mb-3">
            <button type="button" class="btn btn-sm mt-2" @click="addPaymentItemRow">
              <i class="pi pi-plus text-success"></i>
            </button>
          </div>

          <!-- Payment Item Rows -->
          <div v-for="(paymentIemRow, index) in paymentIemRows" :key="index" class="card mb-3">
            <!-- Remove Button -->
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <button
                    type="button"
                    class="btn btn-outline btn-icon btn btn-success btn-s ml-1 mr-1"
                    @click="addPaymentItemRow"
                  >
                    <i class="pi pi-plus text-success"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline btn-icon btn text-danger btn-sm"
                    @click="removePaymentItemRow(index)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- Payment Item Selection -->
              <div class="col-12">
                <div class="form-group">
                  <Select
                    v-model="paymentIemRow.id"
                    :options="availablePaymentItemsForRow(index)"
                    optionLabel="name"
                    optionValue="id"
                    :placeholder="$t('payments.paymentItems')"
                    :filter="true"
                    :showClear="true"
                    class="w-full"
                    @change="onPaymentItemChange(index)"
                  />
                  <small v-if="errors[`paymentIemRows.${index}.id`]" class="error-message">
                    {{ errors[`paymentIemRows.${index}.id`] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- Payment Item Unit Price -->
              <div class="col-6">
                <div class="form-group">
                  <FloatLabel variant="on">
                    <InputNumber
                      id="item_unit_price"
                      v-model="paymentIemRow.unit_price"
                      autocomplete="on"
                      class="w-full"
                      @update:modelValue="onUnitPriceChange(index)"
                    />
                    <label for="item_unit_price">{{ $t('payments.unit_price') }}</label>
                  </FloatLabel>
                  <small v-if="errors[`paymentIemRows.${index}.unit_price`]" class="error-message">
                    {{ errors[`paymentIemRows.${index}.unit_price`] }}
                  </small>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <FloatLabel variant="on">
                    <InputNumber
                      id="item_quantity"
                      v-model="paymentIemRow.quantity"
                      autocomplete="on"
                      class="w-full"
                      @update:modelValue="onQuantityChange(index)"
                    />
                    <label for="item_quantity">{{ $t('payments.quantity') }}</label>
                  </FloatLabel>
                  <small v-if="errors[`paymentIemRows.${index}.quantity`]" class="error-message">
                    {{ errors[`paymentIemRows.${index}.quantity`] }}
                  </small>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <FloatLabel variant="on">
                    <InputNumber
                      id="item_amount"
                      v-model="paymentIemRow.amount"
                      autocomplete="on"
                      class="w-full"
                      @update:modelValue="sumAmount"
                      readonly
                    />
                    <label for="item_amount">{{ $t('payments.amount') }}</label>
                  </FloatLabel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <!-- Payment Items Section -->
      <!-- /////////////////////////////////////////////////////////////////////////////// -->

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline ml-2 mr-2" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.update') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import tableMixin from '@/mixins/table'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, tableMixin, customFunctions, validationRequest],
  components: {},

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    selected_item: {
      handler(newVal) {},
      immediate: true,
      deep: true,
    },

    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PAYMENT.BASE,
      selectedPaymentMethod: null,
      company_id: '',
      module_id: '',
      formData: {
        payment_method_id: '',
        cash_box_id: '',
        bank_account_id: '',
        wallet_id: '',
        amount: '',
      },
    }
  },

  mounted() {},

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    paymentMethodLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    accountGuideLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    cashBoxShiftLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    moduleOptionLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    moduleOptions() {
      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        return this.cashBoxes
      }

      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        return this.bankAccounts
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        return this.wallets
      }
      return []
    },

    modulePlaceholderLabel() {
      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        return this.$t('payments.bank_accounts')
      }

      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        return this.$t('payments.cash_boxes')
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        return this.$t('payments.wallets')
      }

      return []
    },
  },

  methods: {
    async populateForm() {
      this.formData = {
        id: this.itemData.id || '',
        payment_method_id: this.itemData.payment_method?.id || '',
        cash_box_id: this.itemData.cash_box?.id || '',
        bank_account_id: this.itemData.bank_account?.id || '',
        wallet_id: this.itemData.wallet?.id || '',
        amount: this.itemData.amount || '',
        account_guide_id: this.itemData.account_guide?.id || '',
      }

      await this.populatePaymentItemRow(this.itemData)

      // Set module_id (only one value)
      this.module_id =
        this.formData.cash_box_id ||
        this.formData.bank_account_id ||
        this.formData.wallet_id ||
        null

      this.$nextTick(() => {
        this.selectedPaymentMethod = this.paymentMethods.find(
          (method) => method.id === this.formData.payment_method_id
        )

        if (!this.selectedPaymentMethod) return

        const prefix = this.selectedPaymentMethod.prefix

        if (prefix === 'BANK_ACCOUNT' || prefix === 'CHECK' || prefix === 'CARD') {
          this.loadBankAccounts(this.company_id)
        } else if (prefix === 'CASH') {
          this.loadCashBoxes(this.company_id)
        } else if (prefix === 'MOBILE_WALLET') {
          this.loadWallets(this.company_id)
        }
      })
    },

    async populatePaymentItemRow(payment) {
      let items = []
      let key = ''

      if (payment.payment_payment_asset_items.length) {
        items = payment.payment_payment_asset_items
        key = 'payment_income_item'
      }

      if (payment.payment_payment_equity_items.length) {
        items = payment.payment_payment_equity_items
        key = 'payment_equity_item'
      }

      if (payment.payment_payment_expense_items.length) {
        items = payment.payment_payment_expense_items
        key = 'payment_expense_item'
      }

      if (payment.payment_payment_income_items.length) {
        items = payment.payment_payment_income_items
        key = 'payment_income_item'
      }

      if (payment.payment_payment_liability_items.length) {
        items = payment.payment_payment_liability_items
        key = 'payment_liability_item'
      }

      if (items.length && key) {
        this.paymentIemRows = items.map((item) => ({
          id: item[key]?.id || null,
          unit_price: item.unit_price || 0,
          quantity: item.quantity || 1,
          amount: item.amount || 0,
        }))
        console.log(this.paymentIemRows)
        this.sumAmount() // ← Recalculate total
      }

      await this.determinePaymentItemsModule(true)
    },

    async openModal() {
      this.formVisible = true
      await this.loadAccountGuides(this.company_id)
      await this.loadPaymentMethods()
      await this.showItem(this.apiUrl, this.selected_item.id)
      this.populateForm()
    },

    closeFormModal() {
      this.formVisible = false
      this.formLoading = false
      this.formErrors = {}
      this.selectedPaymentMethod = null
      this.module_id = ''
      this.formData = {}
      this.paymentIemRows = [
        {
          id: null,
          unit_price: 0,
          quantity: 0,
          amount: 0,
        },
      ]
    },

    determinePaymentModule() {
      this.formData.cash_box_id = ''
      this.formData.bank_account_id = ''
      this.formData.wallet_id = ''
      this.formData.payment_method_id = this.selectedPaymentMethod?.id

      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        this.loadBankAccounts(this.company_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        this.loadCashBoxes(this.company_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        this.loadWallets(this.company_id)
      }
    },

    assignValueToModule() {
      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        this.formData.bank_account_id = this.module_id
      }

      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        this.formData.cash_box_id = this.module_id
        this.loadCashBoxShifts(this.company_id, this.formData.cash_box_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        this.formData.wallet_id = this.module_id
      }
    },

    async handleSubmit() {
      this.determinePaymentItemsModule(false)

      if (!this.validateUpdateForm(this.formData)) {
        return
      }

      const data = { ...this.formData }
      delete data.id

      await this.submitUpdateForm(
        this.apiUrl,
        this.formData.id,
        data,
        this.$t('common.updatedSuccessfully')
      )
    },
  },
}
</script>
