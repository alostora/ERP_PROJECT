<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('transportRequests.title') }}</h1>
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
        <Column field="id" :header="$t('transportRequests.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('transportRequests.name')" class="col-1" />

        <Column :header="$t('transportRequests.from_branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.from_branch?.name_ar : data.from_branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.to_branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.to_branch?.name_ar : data.to_branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.from_warehouse')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{
                currentLanguage == 'ar' ? data.from_warehouse?.name_ar : data.from_warehouse?.name
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.to_warehouse')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.to_warehouse?.name_ar : data.to_warehouse?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.from_warehouse_stage')" class="col-1">
          <template #body="{ data }">
            <div
              :class="
                data.from_warehouse_stage?.affects_stock
                  ? 'badge badge-success'
                  : 'badge badge-warning'
              "
            >
              {{
                currentLanguage == 'ar'
                  ? data.from_warehouse_stage?.name_ar
                  : data.from_warehouse_stage?.name
              }}

              <Button
                :severity="data.from_warehouse_stage?.affects_stock ? 'success' : 'warn'"
                variant="outlined"
                class="ml-1 mr-1 btn btn-sm"
                :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                @click="openUpdateFromWarehouseStageModal(data)"
                :title="
                  $t('common.edit') +
                  ' ' +
                  (currentLanguage == 'ar'
                    ? data.from_warehouse_stage?.name_ar
                    : data.from_warehouse_stage?.name)
                "
                style="height: 20px"
              >
              </Button>
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.to_warehouse_stage')" class="col-1">
          <template #body="{ data }">
            <div
              :class="
                data.to_warehouse_stage?.affects_stock
                  ? 'badge badge-success'
                  : 'badge badge-warning'
              "
            >
              {{
                currentLanguage == 'ar'
                  ? data.to_warehouse_stage?.name_ar
                  : data.to_warehouse_stage?.name
              }}

              <Button
                :severity="data.to_warehouse_stage?.affects_stock ? 'success' : 'warn'"
                variant="outlined"
                class="ml-1 mr-1 btn btn-sm"
                :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                @click="openUpdateToWarehouseStageModal(data)"
                :title="
                  $t('common.edit') +
                  ' ' +
                  (currentLanguage == 'ar'
                    ? data.to_warehouse_stage?.name_ar
                    : data.to_warehouse_stage?.name)
                "
                style="height: 20px"
              >
              </Button>
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.from_warehouse_is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.from_warehouse_is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.from_warehouse_is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('transportRequests.to_warehouse_is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.to_warehouse_is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.to_warehouse_is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column field="created_at" :header="$t('transportRequests.createdAt')" class="col-1">
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
      :transport_request_id="transport_request_id"
      @updated="fetchData"
    />

    <UpdateFromWarehouseStageForm
      ref="updateFromWarehouseStageModal"
      :company_id="company_id"
      :branch_id="branch_id"
      :selected_item="selectedItem"
      @updated="fetchData"
    />
    <UpdateToWarehouseStageForm
      ref="updateToWarehouseStageModal"
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
import Button from 'primevue/button'

import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import UpdateFromWarehouseStageForm from './UpdateFromWarehouseStageForm.vue'
import UpdateToWarehouseStageForm from './UpdateToWarehouseStageForm.vue'
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
    Button,
    CreateForm,
    UpdateForm,
    UpdateFromWarehouseStageForm,
    UpdateToWarehouseStageForm,
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
          this.apiUrl = `${API_ROUTES.TRANSPORT_REQUEST.SEARCH}/${newVal}`
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
      apiUrl: API_ROUTES.TRANSPORT_REQUEST.SEARCH,
      deleteUrl: API_ROUTES.TRANSPORT_REQUEST.BASE,
      filters: { query_string: '' },
      transport_request_id: '',
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
      this.transport_request_id = itemId
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    openUpdateFromWarehouseStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateFromWarehouseStageModal.openModal()
      })
    },

    openUpdateToWarehouseStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateToWarehouseStageModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
