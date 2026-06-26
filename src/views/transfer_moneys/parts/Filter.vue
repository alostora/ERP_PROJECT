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
          <i class="pi pi-search search-icon"></i>
          <InputText
            id="query_string"
            v-model="filters.query_string"
            @input="emitFetchData"
            autocomplete="off"
            class="input"
            :placeholder="$t('common.search')"
          />
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <Select
            v-model="filters.branch_id"
            :options="branches"
            :optionLabel="branchLabel"
            optionValue="id"
            :placeholder="$t('transferMoneys.branches')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <Select
            v-model="filters.status_id"
            :options="statusList"
            :optionLabel="statusLabel"
            optionValue="id"
            :placeholder="$t('transferMoneys.status')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-lg-6 col-md-12">
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

        <div class="col-lg-6 col-md-12">
          <Select
            v-model="filters.from_id"
            :options="fromOptions"
            :optionLabel="transferMoneyOptionLabel"
            optionValue="id"
            :placeholder="$t('transferMoneys.from') + ' ' + fromPlaceholderLabel"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-lg-6 col-md-12">
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

        <div class="col-12 col-md-6 col-lg-6">
          <Select
            v-model="filters.to_id"
            :options="toOptions"
            :optionLabel="transferMoneyOptionLabel"
            optionValue="id"
            :placeholder="$t('transferMoneys.to') + ' ' + toPlaceholderLabel"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
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
      from: null,
      to: null,
      transferModuleValues: [
        { name: this.$t('transferMoneys.cashBox'), value: 1 },
        { name: this.$t('transferMoneys.bankAccount'), value: 2 },
        { name: this.$t('transferMoneys.wallet'), value: 3 },
      ],
      perPageValues: [
        { name: 5, value: 5 },
        { name: 10, value: 10 },
        { name: 25, value: 25 },
        { name: 50, value: 50 },
      ],

      filters: {
        per_page: 10,
        query_string: '',
        branch_id: '',
        from_id: '',
        to_id: '',
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

    statusLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    /////////////////////////////////////

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
      return ''
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
      return ''
    },
  },

  mounted() {
    this.loadBranches(this.company_id)
    this.loadStatusList()
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },

    determineTransferFrom() {
      if (this.from === 1) {
        this.loadCashBoxes(this.company_id)
      }

      if (this.from === 2) {
        this.loadBankAccounts(this.company_id)
      }

      if (this.from === 3) {
        this.loadWallets(this.company_id)
      }
    },

    determineTransferTo() {
      if (this.to === 1) {
        this.loadCashBoxes(this.company_id)
      }

      if (this.to === 2) {
        this.loadBankAccounts(this.company_id)
      }

      if (this.to === 3) {
        this.loadWallets(this.company_id)
      }
    },
  },
}
</script>
