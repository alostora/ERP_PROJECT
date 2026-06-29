<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">
        {{ $t('stage_employees.title') }}

        <Message severity="info" size="small">
          {{ $t('stage_employees.stage_name') }} <Badge> {{ itemData.name }}</Badge>
        </Message>
      </h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="flex align-center gap-3 mb-2">
        <button class="btn btn-outline" @click="$router.push(`/company/stages/${company_id}`)">
          <i :class="currentLanguage === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
          {{ $t('common.back') }}
        </button>
      </div>

      <div class="filters-bar">
        <Filter @emitFetchData="emitFetchData" :company_id="company_id" />
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
        <Column field="id" :header="$t('stage_employees.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="logo" :header="$t('employees.avatar')" class="col-1">
          <template #body="slotProps">
            <div class="flex-center">
              <img
                v-if="slotProps.data.employee.avatar"
                :src="slotProps.data.employee.avatar.file_path"
                :alt="slotProps.data.employee.name"
                class="table-image-sm"
              />
              <div v-else class="image-placeholder">
                <i class="pi pi-image"></i>
              </div>
            </div>
          </template>
        </Column>

        <Column field="employee.name" :header="$t('stage_employees.employee_name')" sortable />

        <Column field="employee.email" :header="$t('stage_employees.employee_email')" sortable />

        <Column field="employee.phone" :header="$t('stage_employees.employee_phone')" />

        <Column field="created_at" :header="$t('stage_employees.createdAt')" class="col-1">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
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
      :stage_id="stage_id"
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
import Message from 'primevue/message'
import Badge from 'primevue/badge'

import CreateForm from './CreateForm.vue'
import Filter from './Filter.vue'

import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, Message, Badge, CreateForm, Filter },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    stage_id: {
      type: String,
      required: true,
    },
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal) {
          this.loadBranches(newVal)
        }
      },
      immediate: true,
    },
    '$route.params.stage_id': {
      handler(newVal) {
        if (newVal) {
          this.apiUrl = `${API_ROUTES.STAGE_EMPLOYEE.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.STAGE_EMPLOYEE.SEARCH,
      deleteUrl: API_ROUTES.STAGE_EMPLOYEE.BASE,
      filters: { query_string: '', branch_id: '', warehouse_id: '' },
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
    this.showItem(API_ROUTES.STAGE.BASE, this.stage_id)
  },

  methods: {
    emitFetchData(emitedData) {
      this.filters = emitedData
      this.fetchData()
    },

    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
