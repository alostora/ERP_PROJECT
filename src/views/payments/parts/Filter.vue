<template>
  <Panel :toggleable="true" :collapsed="true" style="background-color: var(--surface-100)">
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-search text-warning p-1"></i>
        <span class="font-medium text-warning">
          {{ $t('common.search') }}
        </span>
      </div>
    </template>
    <div class="card-gray">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.query_string"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('common.search')"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.account_guide_id"
              :options="accountGuides"
              :optionLabel="accountGuideLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.account_guide')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
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
          </div>
        </div>

        <div class="col-12 col-md-6" v-if="selectedPaymentMethod">
          <div class="search-wrapper">
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
          </div>
        </div>

        <div
          class="col-12 col-md-6 mt-2"
          v-if="selectedPaymentMethod && selectedPaymentMethod?.prefix === 'CASH'"
        >
          <div class="search-wrapper">
            <Select
              v-model="filters.cash_box_shift_id"
              :options="cashBoxShifts"
              :optionLabel="cashBoxShiftLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('payments.cash_box_shift')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-6 col-md-3 col-lg-2">
          <Select
            v-model="filters.per_page"
            :options="perPageValues"
            optionLabel="name"
            optionValue="value"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {},

  emits: ['emitFetchData'],

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
      module_id: '',
      selectedPaymentMethod: null,
      perPageValues: [
        { name: 5, value: 5 },
        { name: 10, value: 10 },
        { name: 25, value: 25 },
        { name: 50, value: 50 },
      ],
      filters: {
        per_page: 10,
        query_string: '',
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    statusLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
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

  mounted() {
    this.loadPaymentStatus()
    this.loadPaymentMethods()
    this.loadBranches(this.company_id)
    this.loadAccountGuides(this.company_id)
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },

    determinePaymentModule() {
      this.filters.cash_box_id = ''
      this.filters.cash_box_shift_id = ''
      this.filters.bank_account_id = ''
      this.filters.wallet_id = ''
      this.filters.payment_method_id = this.selectedPaymentMethod?.id

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

      this.emitFetchData()
    },

    assignValueToModule() {
      if (
        this.selectedPaymentMethod?.prefix === 'BANK_ACCOUNT' ||
        this.selectedPaymentMethod?.prefix === 'CHECK' ||
        this.selectedPaymentMethod?.prefix === 'CARD'
      ) {
        this.filters.bank_account_id = this.module_id
      }

      if (this.selectedPaymentMethod?.prefix === 'CASH') {
        this.filters.cash_box_id = this.module_id
        this.loadCashBoxShifts(this.company_id, this.filters.cash_box_id)
      }

      if (this.selectedPaymentMethod?.prefix === 'MOBILE_WALLET') {
        this.filters.wallet_id = this.module_id
      }

      this.emitFetchData()
    },
  },
}
</script>
