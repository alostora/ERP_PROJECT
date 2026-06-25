<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('companies.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card mt-2">
      <Filter @emiFetchData="emiFetchData" />
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
        <Column field="id" :header="$t('companies.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="logo" :header="$t('companies.logo')">
          <template #body="slotProps">
            <div class="flex-center">
              <img
                v-if="slotProps.data.logo"
                :src="slotProps.data.logo.file_path"
                :alt="slotProps.data.name"
                class="table-image-sm"
              />
              <div v-else class="image-placeholder">
                <i class="pi pi-image"></i>
              </div>
            </div>
          </template>
        </Column>

        <Column field="name" :header="$t('companies.name')" sortable />

        <Column field="name_ar" :header="$t('companies.name_ar')" sortable />

        <Column field="phone" :header="$t('companies.phone')" sortable />

        <Column field="email" :header="$t('companies.email')" sortable />

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
              <button
                class="btn-icon"
                @click="$router.push(`/company/${data.id}`)"
                :title="$t('common.view')"
              >
                <i class="pi pi-eye text-info"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm ref="createModal" @created="fetchData" />
    <UpdateForm ref="updateModal" :item_id="itemId" @updated="fetchData" />

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
import Image from 'primevue/image'
import Filter from './Filter.vue'

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
    Image,
    Filter,
  },

  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.SEARCH,
      deleteUrl: API_ROUTES.COMPANY.BASE,
      itemId: '',
    }
  },

  computed: {},

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

    openUpdateModal(itemId) {
      this.itemId = itemId
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
