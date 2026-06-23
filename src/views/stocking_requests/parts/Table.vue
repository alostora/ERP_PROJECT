<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('stockingRequests.title') }}</h1>
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
                :placeholder="$t('stockingRequests.branches')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
                @change="(onBranchChange(), fetchData())"
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
                :placeholder="$t('stockingRequests.warehouses')"
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
                :placeholder="$t('stockingRequests.stages')"
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
        <Column field="id" :header="$t('stockingRequests.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('stockingRequests.name')" class="col-2" />

        <Column :header="$t('salesInvoices.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('salesInvoices.warehouse')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.warehouse?.name_ar : data.warehouse?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('salesInvoices.stage')" class="col-1">
          <template #body="{ data }">
            <div :class="data.stage?.affects_stock ? 'badge badge-success' : 'badge badge-warning'">
              {{ currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name }}

              <Button
                :severity="data.stage?.affects_stock ? 'success' : 'warn'"
                variant="outlined"
                class="ml-1 mr-1 btn btn-sm"
                :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                @click="openUpdateStageModal(data)"
                :title="
                  $t('common.edit') +
                  ' ' +
                  (currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name)
                "
                style="height: 20px"
              >
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <UpdateStageForm
      ref="updateStageModal"
      :company_id="company_id"
      :branch_id="branch_id"
      :selected_item="selectedItem"
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
import Button from 'primevue/button'
import UpdateStageForm from './UpdateStageForm.vue'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {
    DataTable,
    Column,
    Toast,
    ConfirmDialog,
    Select,
    Button,
    UpdateStageForm,
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

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.STOCKING_REQUEST.SEARCH}/${newVal}`
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

  data() {
    return {
      apiUrl: API_ROUTES.STOCKING_REQUEST.SEARCH,
      deleteUrl: API_ROUTES.STOCKING_REQUEST.BASE,
      filters: { query_string: '' },
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
  },

  methods: {
    openUpdateStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStageModal.openModal()
      })
    },
  },
}
</script>
