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
        <Filter @emitFetchData="emitFetchData" :company_id="company_id" :branch_id="branch_id" />
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

        <Column :header="$t('payments.is_opening_balance')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_opening_balance" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_opening_balance" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.status')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info" v-if="data.status.prefix == 'COMPLETED'">
              {{ currentLanguage == 'ar' ? data.status.name_ar : data.status.name }}
            </div>
            <div class="badge badge-warning" v-else>
              {{ currentLanguage == 'ar' ? data.status.name_ar : data.status.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.payment_method')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{
                currentLanguage == 'ar' ? data.payment_method?.name_ar : data.payment_method?.name
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.cash_box')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info" v-if="data.cash_box">
              {{ currentLanguage == 'ar' ? data.cash_box?.name_ar : data.cash_box?.name }}
            </div>
            <div class="badge badge-warning" v-else>
              {{ $t('common.empty') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.bank_account')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info" v-if="data.bank_account">
              {{ currentLanguage == 'ar' ? data.bank_account?.name_ar : data.cash_box?.name }}
            </div>
            <div class="badge badge-warning" v-else>
              {{ $t('common.empty') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('payments.wallet')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info" v-if="data.wallet">
              {{ currentLanguage == 'ar' ? data.wallet?.name_ar : data.cash_box?.name }}
            </div>
            <div class="badge badge-warning" v-else>
              {{ $t('common.empty') }}
            </div>
          </template>
        </Column>

        <Column field="amount" :header="$t('payments.amount')" class="col-1" />

        <Column field="payment_date" :header="$t('payments.payment_date')" class="col-2">
          <template #body="{ data }">
            {{ formatDate(data.payment_date) }}
          </template>
        </Column>

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data)" :title="$t('common.edit')">
                <i class="pi pi-pen-to-square text-success"></i>
              </button>
              <button
                class="btn-icon"
                @click="openUpdateStatusModal(data)"
                :title="$t('payments.updateStatus')"
              >
                <i class="pi pi-step-forward-alt text-success"></i>
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
    <UpdateStatusForm ref="updateStatusModal" :selected_item="selectedItem" @updated="fetchData" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ToggleSwitch from 'primevue/toggleswitch'

import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import UpdateStatusForm from './UpdateStatusForm.vue'
import Filter from './Filter.vue'

import { API_ROUTES } from '@/constants/apiRoutes'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'

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
    UpdateStatusForm,
    ToggleSwitch,
    Filter,
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
      apiUrl: API_ROUTES.PAYMENT.SEARCH,
      deleteUrl: API_ROUTES.PAYMENT.BASE,
      company_id: '',
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
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    emitFetchData(emitedData) {
      this.filters = emitedData
      this.fetchData()
    },

    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    openUpdateModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    openUpdateStatusModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStatusModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
