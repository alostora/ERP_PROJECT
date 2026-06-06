<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('transferMoneys.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="search-wrapper">
              <i class="pi pi-search search-icon"></i>
              <input
                type="text"
                v-model="filters.query_string"
                @input="fetchData"
                class="input"
                :placeholder="$t('common.search')"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 col-lg-4 mt-1">
            <Select
              v-model="filters.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('transferMoneys.branches')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="fetchData"
            />
          </div>
          <div class="col-12 col-md-6 col-lg-4 mt-1">
            <Select
              v-model="filters.status_id"
              :options="statusList"
              :optionLabel="statusLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('transferMoneys.status')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="fetchData"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6 col-md-12 mt-1">
            <div class="form-group">
              <select v-model="from" @change="determineTransferFrom" class="select">
                <option :value="null">{{ $t('common.select') }}</option>
                <option :value="1">{{ $t('transferMoneys.cashBox') }}</option>
                <option :value="2">{{ $t('transferMoneys.bankAccount') }}</option>
                <option :value="3">{{ $t('transferMoneys.wallet') }}</option>
              </select>
            </div>
          </div>

          <div class="col-lg-6 col-md-12 mt-1">
            <div class="form-group">
              <Select
                v-model="filters.from_id"
                :options="fromOptions"
                :optionLabel="transferMoneyOptionLabel"
                optionValue="id"
                :placeholder="$t('common.select') + ' ' + fromPlaceholderLabel"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="form-group">
              <select v-model="to" @change="determineTransferTo" class="select">
                <option :value="null">{{ $t('common.select') }}</option>
                <option :value="1">{{ $t('transferMoneys.cashBox') }}</option>
                <option :value="2">{{ $t('transferMoneys.bankAccount') }}</option>
                <option :value="3">{{ $t('transferMoneys.wallet') }}</option>
              </select>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="form-group">
              <Select
                v-model="filters.to_id"
                :options="toOptions"
                :optionLabel="transferMoneyOptionLabel"
                optionValue="id"
                :placeholder="$t('common.select') + ' ' + toPlaceholderLabel"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 col-md-3 col-lg-2">
            <select v-model="perPage" @change="fetchData" class="select">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        :value="items"
        :paginator="true"
        :rows="perPage"
        :totalRecords="meta.total"
        :rowsPerPageOptions="[5, 10, 25, 50]"
        :loading="loading"
        lazy
        @page="onPageChange"
        @sort="onSort"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        resizableColumns
        showGridlines
      >
        <Column field="id" :header="$t('transferMoneys.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="amount" :header="$t('transferMoneys.amount')" class="col-2" />

        <Column :header="$t('transferMoneys.from')" class="col-2">
          <template #body="{ data }">
            {{ currentLanguage == 'ar' ? data.from_model?.name_ar : data.from_model?.name }}
          </template>
        </Column>

        <Column :header="$t('transferMoneys.to')" class="col-2">
          <template #body="{ data }">
            {{ currentLanguage == 'ar' ? data.to_model?.name_ar : data.to_model?.name }}
          </template>
        </Column>

        <Column :header="$t('transferMoneys.status')" class="col-2">
          <template #body="{ data }">
            <div v-if="data.status" class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.status?.name_ar : data.status?.name }}
            </div>
          </template>
        </Column>

        <Column field="created_at" :header="$t('transferMoneys.createdAt')" class="col-2" />

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data)" :title="$t('common.edit')">
                <i class="pi pi-pen-to-square text-success"></i>
              </button>
              <button
                class="btn-icon text-danger"
                @click="deleteRow(data)"
                :title="$t('common.delete')"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm ref="createModal" @created="fetchData" :company_id="company_id" />
    <UpdateForm ref="updateModal" :selected_item="selectedItem" @updated="fetchData" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {
    DataTable,
    Column,
    Toast,
    ConfirmDialog,
    CreateForm,
    UpdateForm,
    ToggleSwitch,
    Select,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
          this.apiUrl = `${API_ROUTES.TRANSFER_MONEY.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },

    branch_id: {
      handler(newVal) {
        if (newVal) {
          this.filters.branch_id = newVal
          this.fetchData()
        }
      },
      immediate: true,
    },
  },

  props: {
    branch_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.TRANSFER_MONEY.SEARCH,
      deleteUrl: API_ROUTES.TRANSFER_MONEY.BASE,
      company_id: '',
      to: null,
      from: null,
      filters: { query_string: '', branch_id: '', from_id: '', to_id: '' },
      selectedItem: {},
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
    this.fetchData()
    this.loadBranches(this.company_id)
    this.loadStatusList()
  },

  methods: {
    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    openUpdateModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
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
