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

          <div class="col-12 col-md-6 col-lg-4 mb-1">
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

        <Column field="amount" :header="$t('transferMoneys.amount')" />

        <Column :header="$t('transferMoneys.from')">
          <template #body="{ data }">
            {{ currentLanguage == 'ar' ? data.from_model?.name_ar : data.from_model?.name }}
          </template>
        </Column>

        <Column :header="$t('transferMoneys.to')">
          <template #body="{ data }">
            {{ currentLanguage == 'ar' ? data.to_model?.name_ar : data.to_model?.name }}
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
      filters: { query_string: '', branch_id: '' },
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
  },

  mounted() {
    this.fetchData()
    this.loadBranches(this.company_id)
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
  },
}
</script>
