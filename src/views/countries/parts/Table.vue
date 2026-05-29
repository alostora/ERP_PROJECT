<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('countries.title') }}</h1>
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
              <input type="text" v-model="filters.query_string" @input="fetchData" class="input"
                :placeholder="$t('common.search')" />
            </div>
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

      <DataTable :value="items" :paginator="true" :rows="perPage" :totalRecords="meta.total"
        :rowsPerPageOptions="[5, 10, 25, 50]" :loading="loading" lazy @page="onPageChange" @sort="onSort"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" resizableColumns showGridlines>
        <Column field="id" :header="$t('countries.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('countries.name')" sortable />
        <Column field="name_ar" :header="$t('countries.name_ar')" sortable />

        <Column :header="$t('governorates.title')">
          <template #body="{ data }">
            <button class="btn-sm btn-outline"
              @click="$router.push({ name: 'governorates', query: { country_id: data.id } })">
              <i class="pi pi-map-marker"></i>
              {{ $t('governorates.title') }}
            </button>
          </template>
        </Column>

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data)" :title="$t('common.edit')">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="btn-icon text-danger" @click="deleteRow(data)" :title="$t('common.delete')">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm ref="createModal" @created="fetchData" />
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

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, CreateForm, UpdateForm },

  data() {
    return {
      apiUrl: API_ROUTES.COUNTRY.SEARCH,
      deleteUrl: API_ROUTES.COUNTRY.BASE,
      filters: { query_string: '' },
      selectedItem: {},
    }
  },

  mounted() {
    this.fetchData()
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
