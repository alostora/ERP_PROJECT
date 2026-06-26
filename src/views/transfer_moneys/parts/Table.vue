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

        <Column field="created_at" :header="$t('transferMoneys.createdAt')" class="col-1">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>

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
import ToggleSwitch from 'primevue/toggleswitch'

import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
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
    ToggleSwitch,
    CreateForm,
    UpdateForm,
    Filter,
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
      filters: { query_string: '', branch_id: '', from_id: '', to_id: '' },
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

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
