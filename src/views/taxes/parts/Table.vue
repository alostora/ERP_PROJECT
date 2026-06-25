<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('taxes.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <Filter @emiFetchData="emiFetchData" />
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
        <Column field="id" :header="$t('taxes.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('taxes.name')" />

        <Column field="name_ar" :header="$t('taxes.name_ar')" />

        <Column :header="$t('taxes.type')">
          <template #body="{ data }">
            <div v-if="data.type" class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.type?.name_ar : data.type?.name }}
            </div>
          </template>
        </Column>

        <Column field="value" :header="$t('taxes.value')" />

        <Column :header="$t('taxes.is_active')">
          <template #body="{ data }">
            <ToggleSwitch v-model="data.is_active" @change="toggleActive(data)" />
            {{ data.is_active ? $t('common.yes') : $t('common.no') }}
          </template>
        </Column>

        <Column :header="$t('taxes.is_system')">
          <template #body="{ data }">
            <div v-if="data.is_system" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="!data.is_system" class="badge badge-warning">
              {{ $t('common.no') }}
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
import ToggleSwitch from 'primevue/toggleswitch'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Filter from './Filter.vue'
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'

import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {
    DataTable,
    Column,
    ToggleSwitch,
    Toast,
    ConfirmDialog,
    Filter,
    CreateForm,
    UpdateForm,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
          this.apiUrl = `${API_ROUTES.TAX.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.TAX.SEARCH,
      deleteUrl: API_ROUTES.TAX.BASE,
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
    emiFetchData(emitedData) {
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

    toggleActive(item) {
      if (item.is_active == false) {
        this.setInactiveTax(item.id)
      } else {
        this.setActiveTax(item.id)
      }
    },
  },
}
</script>
