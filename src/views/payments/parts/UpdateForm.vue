<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('payments.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('payments.payment_methods') }}</label>
        <Select
          v-model="formData.payment_method_id"
          :options="paymentMethods"
          :optionLabel="paymentMethodLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('payments.payment_method')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.payment_method_id" class="error-message">{{
          errors.payment_method_id
        }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('payments.from') }}</label>
            <select v-model="module" @change="determinePaymentModule" class="select">
              <option :value="1">{{ $t('payments.cashBox') }}</option>
              <option :value="2">{{ $t('payments.bankAccount') }}</option>
              <option :value="3">{{ $t('payments.wallet') }}</option>
            </select>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ modulePlaceholderLabel }}</label>
            <Select
              v-model="module_id"
              :options="moduleOptions"
              :optionLabel="paymentOptionLabel"
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

      <div class="form-group">
        <label class="form-label required">{{ $t('payments.amount') }}</label>
        <input
          v-model="formData.amount"
          type="number"
          class="input"
          :class="{ 'input-error': errors.amount }"
        />
        <small v-if="errors.amount" class="error-message">{{ errors.amount }}</small>
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
import Select from 'primevue/select'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

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
        if (selectedItem && selectedItem.id) {
          this.populateForm(selectedItem)
        }
      },
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PAYMENT.BASE,
      module: '',
      module_id: '',
      formData: {
        id: '',
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

    paymentMethodLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    paymentOptionLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    moduleOptions() {
      if (this.module === 1) return this.cashBoxes
      if (this.module === 2) return this.bankAccounts
      if (this.module === 3) return this.wallets
      return []
    },

    modulePlaceholderLabel() {
      if (this.from === 1) return this.$t('payments.selectCashBox')
      if (this.from === 2) return this.$t('payments.selectBankAccount')
      if (this.from === 3) return this.$t('payments.selectWallet')
      return []
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        payment_method_id: selectedItem.payment_method_id || '',
        cash_box_id: selectedItem.cash_box_id || '',
        bank_account_id: selectedItem.bank_account_id || '',
        wallet_id: selectedItem.wallet_id || '',
        amount: selectedItem.amount || '',
      }

      if (this.formData.cash_box_id) {
        this.module_id = this.formData.cash_box_id
        this.module = 1
      }

      if (this.formData.bank_account_id) {
        this.module_id = this.formData.bank_account_id
        this.module = 2
      }

      if (this.formData.wallet_id) {
        this.module_id = this.formData.wallet_id
        this.module = 3
      }

      this.determinePaymentModule()
      this.assignValueToModule()
    },

    openModal() {
      this.formVisible = true
      this.loadPaymentMethods()
    },

    determinePaymentModule() {
      this.formData.cash_box_id = ''
      this.formData.bank_account_id = ''
      this.formData.wallet_id = ''

      if (this.module === 1) {
        this.loadCashBoxes(this.formData.company_id)
      }

      if (this.module === 2) {
        this.loadBankAccounts(this.formData.company_id)
      }

      if (this.module === 3) {
        this.loadWallets(this.formData.company_id)
      }
    },

    assignValueToModule() {
      if (this.module === 1) {
        this.formData.cash_box_id = this.module_id
      }

      if (this.module === 2) {
        this.formData.bank_account_id = this.module_id
      }

      if (this.module === 3) {
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
