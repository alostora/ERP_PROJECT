<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('governorates.title') }}</h1>
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
        <Column field="id" :header="$t('governorates.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('governorates.name')" sortable />

        <Column field="name_ar" :header="$t('governorates.name_ar')" sortable />

        <Column :header="$t('cities.title')">
          <template #body="{ data }">
            <button
              class="btn-sm btn-outline"
              @click="
                $router.push({
                  name: 'cities',
                  params: { governorate_id: data.id, country_id: data.country_id },
                })
              "
            >
              <i class="pi pi-map-marker text-primary"></i>
              {{ $t('cities.title') }}
            </button>
          </template>
        </Column>

        <Column :header="$t('common.actions')">
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

    <CreateForm ref="createModal" @created="fetchData" />
    <UpdateForm ref="updateModal" :item_id="item_id" @updated="fetchData" />

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
    CreateForm,
    UpdateForm,
    Filter,
  },

  props: {
    country_id: {
      type: String,
      required: false,
    },
  },

  watch: {
    country_id: {
      handler(newVal) {
        if (newVal) {
          this.filters.country_id = newVal
          this.fetchData()
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.GOVERNORATE.SEARCH,
      deleteUrl: API_ROUTES.GOVERNORATE.BASE,
      filters: { query_string: '', country_id: this.country_id },
      item_id: '',
    }
  },

  mounted() {
    this.filters.country_id = this.country_id

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

    openUpdateModal(itemId) {
      this.item_id = itemId
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
