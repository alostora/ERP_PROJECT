<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('payments.title') })"
    :modal="true"
    :style="{ width: '500px' }"
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

        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="formData.direction_code"
              :options="directionCodes"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('common.select') + ' ' + $t('payments.direction_code')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.direction_code" class="error-message">
            {{ errors.direction_code }}
          </small>
        </div>
      </div>

      <div class="row">
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
          </div>
          <small v-if="errors.amount" class="error-message">{{ errors.amount }}</small>
        </div>
      </div>

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
import Dialog from 'primevue/dialog'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    selected_item: {
      immediate: true,
      deep: true,
      handler(selectedItem) {
        this.loadPaymentMethods()
        if (selectedItem && selectedItem.id) {
          this.populateForm(selectedItem)
        }
      },
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
      directionCodes: [
        { name: this.$t('payments.in'), value: 1 },
        { name: this.$t('payments.out'), value: 2 },
      ],
      formData: {
        payment_method_id: '',
        direction_code: '',
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
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        payment_method_id: selectedItem.payment_method?.id || '',
        direction_code: selectedItem.direction_code?.code || '',
        cash_box_id: selectedItem.cash_box?.id || '',
        bank_account_id: selectedItem.bank_account?.id || '',
        wallet_id: selectedItem.wallet?.id || '',
        amount: selectedItem.amount || '',
      }

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

    openModal() {
      this.formVisible = true
    },

    closeFormModal() {
      this.formVisible = false
      this.formLoading = false
      this.formErrors = {}
      this.selectedPaymentMethod = null
      this.module_id = ''
      this.formData = {}
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
