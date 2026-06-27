<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('payments.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <div class="form-group">
              <label class="form-label">{{ $t('payments.is_opening_balance') }}</label>
              <div class="flex align-center"></div>
              <ToggleSwitch v-model="formData.is_opening_balance" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12">
          <div class="form-group">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
        </div>
      </div>

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

        <div
          class="col-12 col-md-12"
          v-if="selectedPaymentMethod && selectedPaymentMethod?.prefix === 'CASH'"
        >
          <div class="form-group">
            <Select
              v-model="formData.cash_box_shift_id"
              :options="cashBoxShifts"
              :optionLabel="cashBoxShiftLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.cash_box_shift')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.cash_box_shift_id" class="error-message">
            {{ errors.cash_box_shift_id }}
          </small>
        </div>
      </div>

      <div class="row">
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
        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="formData.account_guide_id"
              :options="accountGuides"
              :optionLabel="accountGuideLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.account_guide')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.account_guide_id" class="error-message">
            {{ errors.account_guide_id }}
          </small>
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
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, ToggleSwitch },

  props: {
    company_id: {
      type: String,
      required: true,
    },

    branch_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PAYMENT.BASE,
      selectedPaymentMethod: null,
      module_id: '',
      directionCodes: [
        { name: this.$t('payments.in'), value: 1 },
        { name: this.$t('payments.out'), value: 2 },
      ],
      formData: {
        company_id: '',
        branch_id: '',
        is_opening_balance: '',
        payment_method_id: '',
        account_guide_id: '',
        cash_box_id: '',
        cash_box_shift_id: '',
        bank_account_id: '',
        wallet_id: '',
        amount: '',
      },
    }
  },

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
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id

      this.loadPaymentMethods()
      this.loadBranches(this.formData.company_id)
      this.loadAccountGuides(this.company_id)
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
      this.formData.cash_box_shift_id = ''
      this.formData.bank_account_id = ''
      this.formData.wallet_id = ''
      this.formData.payment_method_id = this.selectedPaymentMethod?.id

      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        this.loadBankAccounts(this.formData.company_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        this.loadCashBoxes(this.formData.company_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        this.loadWallets(this.formData.company_id)
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
        this.loadCashBoxShifts(this.formData.company_id, this.formData.cash_box_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        this.formData.wallet_id = this.module_id
      }
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
