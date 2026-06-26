<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('stockingRequests.title') }}</h1>
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
        <Column field="id" :header="$t('stockingRequests.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('stockingRequests.name')" class="col-1" />

        <Column :header="$t('stockingRequests.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('stockingRequests.warehouse')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.warehouse?.name_ar : data.warehouse?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('stockingRequests.stage')" class="col-1">
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

        <Column :header="$t('stockingRequests.is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column field="created_at" :header="$t('stockingRequests.createdAt')" class="col-1">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
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
import Button from 'primevue/button'
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
    Button,
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
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    emitFetchData(emitedData) {
      this.filters = emitedData
      this.fetchData()
    },

    openUpdateStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStageModal.openModal()
      })
    },
  },
}
</script>
