<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('discounts.final_products') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="flex align-center gap-3 mb-2">
        <button class="btn btn-outline" @click="$router.push(`/company/discounts/${company_id}`)">
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
        <Column field="id" :header="$t('discounts.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column :header="$t('discounts.final_product_name')">
          <template #body="{ data }">
            <span class="font-mono">{{ data.final_product?.name || '-' }}</span>
          </template>
        </Column>

        <Column :header="$t('discounts.final_product_name_ar')">
          <template #body="{ data }">
            <span class="font-mono">{{ data.final_product?.name_ar || '-' }}</span>
          </template>
        </Column>

        <Column field="created_at" :header="$t('discounts.createdAt')" class="col-1">
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
      :discount_id="discount_id"
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
import CreateForm from './CreateForm.vue'
import Filter from './Filter.vue'

import { customFunctions } from '../custom_functions/customFunctions'
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, CreateForm, Filter },

  props: {
    company_id: {
      type: String,
      required: false,
    },
    discount_id: {
      type: String,
      required: false,
    },
  },

  watch: {
    discount_id: {
      handler(newVal) {
        if (newVal) {
          this.apiUrl = `${API_ROUTES.DISCOUNT_FINAL_PRODUCT.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.DISCOUNT_FINAL_PRODUCT.SEARCH,
      deleteUrl: API_ROUTES.DISCOUNT_FINAL_PRODUCT.BASE,
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

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
