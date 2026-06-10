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
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4 mb-1">
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
              v-model="filters.type_id"
              :options="stageTypes"
              :optionLabel="stageTypeLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('stages.type')"
              :filter="true"
              :filterPlaceholder="$t('common.search')"
              :showClear="true"
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
              <ToggleSwitch v-model="data.is_default" @change="setDefaultSage(data.id)" />
            </div>
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
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'

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
    Select,
    ToggleSwitch,
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

    stageTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.fetchData()
    this.loadStageTypes()
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
