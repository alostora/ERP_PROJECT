<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('transferMoneys.title') })"
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
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('transferMoneys.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="formData.employee_id"
              :options="employees"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('transferMoneys.employee')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.employee_id" class="error-message">{{ errors.employee_id }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <Select
              v-model="from"
              :options="transferModuleValues"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('transferMoneys.from')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="determineTransferFrom"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="formData.from_id"
              :options="fromOptions"
              :optionLabel="transferMoneyOptionLabel"
              optionValue="id"
              :placeholder="$t('transferMoneys.from') + ' ' + fromPlaceholderLabel"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.from_id" class="error-message">{{ errors.from_id }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <Select
              v-model="to"
              :options="transferModuleValues"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('transferMoneys.to')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="determineTransferTo"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <Select
              v-model="formData.to_id"
              :options="toOptions"
              :optionLabel="transferMoneyOptionLabel"
              optionValue="id"
              :placeholder="$t('transferMoneys.to') + ' ' + toPlaceholderLabel"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.to_id" class="error-message">{{ errors.to_id }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputNumber id="amount" v-model="formData.amount" autocomplete="on" class="w-full" />
              <label for="amount">{{ $t('transferMoneys.amount') }}</label>
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
import Select from 'primevue/select'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, ToggleSwitch, Select },

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
      apiUrl: API_ROUTES.TRANSFER_MONEY.BASE,
      from: '',
      to: '',
      transferModuleValues: [
        { name: this.$t('transferMoneys.cashBox'), value: 1 },
        { name: this.$t('transferMoneys.bankAccount'), value: 2 },
        { name: this.$t('transferMoneys.wallet'), value: 3 },
      ],
      formData: {
        company_id: '',
        branch_id: '',
        employee_id: '',
        from_id: '',
        to_id: '',
        amount: '',
        notes: '',
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

    transferMoneyOptionLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    fromOptions() {
      if (this.from === 1) return this.cashBoxes
      if (this.from === 2) return this.bankAccounts
      if (this.from === 3) return this.wallets
      return []
    },

    fromPlaceholderLabel() {
      if (this.from === 1) return this.$t('transferMoneys.selectCashBox')
      if (this.from === 2) return this.$t('transferMoneys.selectBankAccount')
      if (this.from === 3) return this.$t('transferMoneys.selectWallet')
      return []
    },

    toOptions() {
      if (this.to === 1) return this.cashBoxes
      if (this.to === 2) return this.bankAccounts
      if (this.to === 3) return this.wallets
      return []
    },

    toPlaceholderLabel() {
      if (this.to === 1) return this.$t('transferMoneys.selectCashBox')
      if (this.to === 2) return this.$t('transferMoneys.selectBankAccount')
      if (this.to === 3) return this.$t('transferMoneys.selectWallet')
      return []
    },
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id

      this.loadBranches(this.formData.company_id)
      this.loadEmployees(this.formData.company_id)
    },

    determineTransferFrom() {
      if (this.from === 1) {
        this.loadCashBoxes(this.formData.company_id)
      }

      if (this.from === 2) {
        this.loadBankAccounts(this.formData.company_id)
      }

      if (this.from === 3) {
        this.loadWallets(this.formData.company_id)
      }
    },

    determineTransferTo() {
      if (this.to === 1) {
        this.loadCashBoxes(this.formData.company_id)
      }

      if (this.to === 2) {
        this.loadBankAccounts(this.formData.company_id)
      }

      if (this.to === 3) {
        this.loadWallets(this.formData.company_id)
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
