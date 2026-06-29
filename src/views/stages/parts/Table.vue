<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('stages.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <Filter @emitFetchData="emitFetchData" />
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
        <Column field="stage_sort" :header="$t('stages.stage_sort')" sortable>
          <template #body="{ data, index }">
            <div
              draggable="true"
              @dragstart="dragStart($event, index)"
              @dragover="dragOver($event)"
              @drop="drop($event, index)"
              class="drag-item"
            >
              <i class="pi pi-bars"></i>
              {{ data.stage_sort }}
            </div>
          </template>
        </Column>

        <Column field="name" :header="$t('stages.name')" />

        <Column field="name_ar" :header="$t('stages.name_ar')" />

        <Column :header="$t('stages.type')">
          <template #body="{ data }">
            <div v-if="data.type" class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.type?.name_ar : data.type?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('stages.affects_stock')">
          <template #body="{ data }">
            <div v-if="data.affects_stock" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="!data.affects_stock">
              <ToggleSwitch
                v-model="data.affects_stock"
                @change="setAffectsStockStage(data.id)"
                :disabled="data.affects_stock"
              />
            </div>
          </template>
        </Column>

        <Column :header="$t('stages.is_default')">
          <template #body="{ data }">
            <div v-if="data.is_default" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="!data.is_default">
              <ToggleSwitch v-model="data.is_default" @change="setDefaultStage(data.id)" />
            </div>
          </template>
        </Column>

        <Column :header="$t('stages.employees')">
          <template #body="{ data }">
            <button
              class="btn-sm btn-outline"
              @click="
                $router.push({
                  name: 'stage-related-models',
                  params: { company_id: this.company_id, stage_id: data.id },
                })
              "
            >
              <i class="pi pi-link text-primary"></i>
              {{ $t('contacts.relatedModels') }}
            </button>
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

    <CreateForm
      ref="createModal"
      @created="fetchData"
      :company_id="company_id"
      :type_id="filters.type_id"
    />
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
          this.apiUrl = `${API_ROUTES.STAGE.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.STAGE.SEARCH,
      deleteUrl: API_ROUTES.STAGE.BASE,
      company_id: '',
      filters: { query_string: '', type_id: '' },
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

<style scoped>
.drag-item {
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
}

.drag-item:active {
  cursor: grabbing;
}
</style>
