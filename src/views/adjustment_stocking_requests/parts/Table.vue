<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('adjustmentStockingRequests.title') }}</h1>
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
        <Column field="id" :header="$t('adjustmentStockingRequests.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('adjustmentStockingRequests.name')" class="col-2" />

        <Column field="name" :header="$t('adjustmentStockingRequests.name')" class="col-2" />

        <Column :header="$t('adjustmentStockingRequests.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('adjustmentStockingRequests.stage')" class="col-1">
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

        <Column :header="$t('adjustmentStockingRequests.is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column
          field="created_at"
          :header="$t('adjustmentStockingRequests.createdAt')"
          class="col-1"
        >
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
      :adjustment_stocking_request_id="adjustment_stocking_request_id"
      @updated="fetchData"
    />

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
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'

import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import UpdateStageForm from './UpdateStageForm.vue'
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
    FloatLabel,
    Button,
    CreateForm,
    UpdateForm,
    UpdateStageForm,
    Filter,
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
          this.apiUrl = `${API_ROUTES.ADJUSTMENT_STOCKING_REQUEST.SEARCH}/${newVal}`
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
      apiUrl: API_ROUTES.ADJUSTMENT_STOCKING_REQUEST.SEARCH,
      deleteUrl: API_ROUTES.ADJUSTMENT_STOCKING_REQUEST.BASE,
      filters: { query_string: '' },
      adjustment_stocking_request_id: '',
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

    openUpdateModal(itemId) {
      this.adjustment_stocking_request_id = itemId
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    openUpdateStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStageModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
