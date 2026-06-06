<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('payments.title') }}</h1>
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

        <div class="row mt-1">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="form-group">
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
                @change="fetchData"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="form-group">
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
                @change="fetchData"
              />
            </div>
          </div>
        </div>

        <div class="row mt-1">
          <div class="col-12 col-md-6 col-lg-4">
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
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
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
                </div>
              </div>

              <div
                class="col-12 col-md-6"
                v-if="selectedPaymentMethod && selectedPaymentMethod?.prefix === 'CASH'"
              >
                <div class="form-group">
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
                    @change="fetchData"
                  />
                </div>
              </div>
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
        <Column field="id" :header="$t('payments.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column :header="$t('payments.is_opening_balance')">
          <template #body="{ data }">
            <div v-if="data.is_opening_balance" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_opening_balance" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.status')">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.status.name_ar : data.status.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.payment_method')">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{
                currentLanguage == 'ar' ? data.payment_method?.name_ar : data.payment_method?.name
              }}
            </div>
          </template>
        </Column>

        <Column field="amount" :header="$t('payments.amount')" class="col-2" />

        <Column field="payment_date" :header="$t('payments.payment_date')" class="col-2" />

        <Column field="created_at" :header="$t('payments.createdAt')" class="col-2" />

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
          this.apiUrl = `${API_ROUTES.PAYMENT.SEARCH}/${newVal}`
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
      module_id: '',
      selectedPaymentMethod: null,
      filters: {
        query_string: '',
        branch_id: '',
        payment_method_id: '',
        status_id: '',
        account_guide_id: '',
        cash_box_id: '',
        cash_box_shift_id: '',
        bank_account_id: '',
        wallet_id: '',
        date_from: '',
        date_to: '',
      },
      selectedItem: {},
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
    this.fetchData()
    this.loadPaymentStatus()
    this.loadPaymentMethods()
    this.loadBranches(this.company_id)
    this.loadAccountGuides(this.company_id)
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

      this.fetchData()
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

      this.fetchData()
    },
  },
}
</script>
