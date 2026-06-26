<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('finalProducts.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
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
        <Column field="id" :header="$t('finalProducts.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column :header="$t('finalProducts.category')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar'
                  ? data.category?.name_ar || '-'
                  : data.category?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('finalProducts.product')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar' ? data.product?.name_ar || '-' : data.product?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('finalProducts.purchasesMeasurementUnit')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar'
                  ? data.purchases_measurement_unit?.name_ar || '-'
                  : data.purchases_measurement_unit?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('finalProducts.salesMeasurementUnit')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar'
                  ? data.sales_measurement_unit?.name_ar || '-'
                  : data.sales_measurement_unit?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column field="name" :header="$t('finalProducts.name')" class="col-1" sortable />

        <Column field="name_ar" :header="$t('finalProducts.name_ar')" class="col-1" sortable />

        <Column field="price" :header="$t('finalProducts.price')" class="col-1" sortable />

        <Column :header="$t('finalProducts.totalTax')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{ data.tax_calculation?.total_tax || 0 }}
            </div>
          </template>
        </Column>

        <Column
          field="grand_total_price"
          :header="$t('finalProducts.grandTotalPrice')"
          class="col-1"
          sortable
        />

        <Column :header="$t('finalProductVariantValues.title')">
          <template #body="{ data }">
            <button
              class="btn-sm btn-outline"
              @click="
                $router.push({
                  name: 'final-product-variant-values',
                  params: { company_id: company_id, final_product_id: data.id },
                })
              "
            >
              <i class="pi pi-link text-primary"></i>
              {{ $t('finalProductVariantValues.title') }}
            </button>
          </template>
        </Column>

        <Column :header="$t('common.actions')" class="col-1">
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

    <CreateForm ref="createModal" @created="fetchData" :company_id="company_id" />
    <UpdateForm
      ref="updateModal"
      :selected_item="selectedItem"
      :company_id="company_id"
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
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import Filter from './Filter.vue'

import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, CreateForm, UpdateForm, Filter },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
          this.apiUrl = `${API_ROUTES.FINAL_PRODUCT.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.FINAL_PRODUCT.SEARCH,
      deleteUrl: API_ROUTES.FINAL_PRODUCT.BASE,
      company_id: '',
      filters: { query_string: '', category_id: '', product_id: '' },
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
