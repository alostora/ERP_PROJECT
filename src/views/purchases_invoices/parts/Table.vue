<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('purchasesInvoices.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <div class="row mb-1">
          <div class="col-12 col-md-6 col-lg-3">
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
          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <Select
                v-model="filters.branch_id"
                :options="branches"
                :optionLabel="branchLabel"
                optionValue="id"
                :placeholder="$t('common.all') + ' ' + $t('branches.title')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="onBranchChange"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <Select
                v-model="filters.warehouse_id"
                :options="warehouses"
                :optionLabel="warehouseLabel"
                optionValue="id"
                :placeholder="$t('common.all') + ' ' + $t('warehouses.title')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <Select
                v-model="filters.stage_id"
                :options="stages"
                :optionLabel="stageLabel"
                optionValue="id"
                :placeholder="$t('common.all') + ' ' + $t('stages.title')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>
        </div>

        <div class="row mb-1">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <i class="pi pi-search search-icon"></i>
              <input
                type="text"
                v-model="filters.reference_code"
                @input="fetchData"
                class="input"
                :placeholder="$t('purchasesInvoices.reference_code')"
              />
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <Select
                v-model="filters.is_closed"
                :options="isColsedValues"
                optionLabel="name"
                optionValue="value"
                :placeholder="$t('common.all') + ' ' + $t('purchasesInvoices.is_closed')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <div class="search-wrapper">
              <Select
                v-model="filters.contact_id"
                :options="contacts"
                optionLabel="name"
                optionValue="id"
                :placeholder="$t('common.all') + ' ' + $t('contacts.title')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="fetchData"
              />
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="row mb-1">
          <div class="col-12 col-md-6 col-lg-3">
            <label class="form-label">{{ $t('purchasesInvoices.date_from') }}</label>
            <input type="date" v-model="filters.date_from" @input="fetchData" class="input" />
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <label class="form-label">{{ $t('purchasesInvoices.date_to') }}</label>
            <input type="date" v-model="filters.date_to" @input="fetchData" class="input" />
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
        <Column field="id" :header="$t('purchasesInvoices.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column
          field="reference_code"
          :header="$t('purchasesInvoices.reference_code')"
          class="col-2"
        />

        <Column field="name" :header="$t('purchasesInvoices.name')" class="col-2" />

        <Column :header="$t('purchasesInvoices.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoices.stage')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.stage?.affects_stock" class="badge badge-success">
              {{ currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name }}
            </div>
            <div v-else class="badge badge-warning">
              {{ currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoices.is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoices.contact')" class="col-1">
          <template #body="{ data }">
            {{ data.contact?.name || '-' }}
          </template>
        </Column>
        <Column
          field="net_amount_after_costs_and_discounts"
          :header="$t('purchasesInvoices.net_amount_after_costs_and_discounts')"
          class="col-1"
        />

        <Column field="created_at" :header="$t('purchasesInvoices.createdAt')" class="col-1">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>

        <Column :header="$t('common.actions')" class="col-1">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data.id)" :title="$t('common.edit')">
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

    <CreateForm
      ref="createModal"
      @created="fetchData"
      :company_id="company_id"
      :branch_id="branch_id"
    />

    <UpdateForm
      ref="updateModal"
      :company_id="company_id"
      :branch_id="branch_id"
      :invoice_id="invoice_id"
      @updated="fetchData"
    />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Select from 'primevue/select'
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, Select, CreateForm, UpdateForm },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.PURCHASES_INVOICE.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },

    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.filters.branch_id = newVal
        }
      },
      immediate: true,
    },
  },

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
      apiUrl: API_ROUTES.PURCHASES_INVOICE.SEARCH,
      deleteUrl: API_ROUTES.PURCHASES_INVOICE.BASE,
      filters: { query_string: '' },
      invoice_id: '',
      isColsedValues: [
        { name: this.$t('common.no'), value: '0' },
        { name: this.$t('common.yes'), value: '1' },
      ],
      isActiveValues: [
        { name: this.$t('common.no'), value: 'inactive' },
        { name: this.$t('common.yes'), value: 'active' },
      ],
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    warehouseLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    stageLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.fetchData()
    this.loadBranches(this.company_id)
    this.loadStages(this.company_id)
    this.loadContacts(this.company_id)
  },

  methods: {
    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    openUpdateModal(itemId) {
      this.invoice_id = itemId
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
