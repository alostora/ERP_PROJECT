<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('branches.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="flex align-center gap-3 mb-2">
        <button class="btn btn-outline" @click="$router.push(`/company/${company_id}`)">
          <i :class="currentLanguage === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
          {{ $t('common.back') }}
        </button>
      </div>

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
        <Column field="id" :header="$t('branches.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('branches.name')" sortable />

        <Column field="name_ar" :header="$t('branches.name_ar')" sortable />

        <Column field="phone" :header="$t('branches.phone')" sortable />

        <Column :header="$t('branches.is_default')">
          <template #body="{ data }">
            <div v-if="data.is_default" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="!data.is_default">
              <ToggleSwitch v-model="data.is_default" @change="setDefaultBranch(data.id)" />
            </div>
          </template>
        </Column>

        <Column field="created_at" :header="$t('branches.createdAt')" class="col-2">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
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

              <button
                class="btn-icon"
                @click="$router.push(`/company/branch/${data.company_id}/${data.id}`)"
                :title="$t('common.view')"
              >
                <i class="pi pi-eye text-info"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm ref="createModal" @created="fetchData" :company_id="company_id" />
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
    ToggleSwitch,
    CreateForm,
    UpdateForm,
    Filter,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.BRANCH.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.BRANCH.SEARCH,
      deleteUrl: API_ROUTES.BRANCH.BASE,
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
