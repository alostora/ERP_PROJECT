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
              v-model="filters.category_id"
              :options="categories"
              :optionLabel="categoryLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('categories.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onCategoryChange"
            />
          </div>

          <div class="col-12 col-md-6 col-lg-4 mb-1" v-if="this.filters.category_id">
            <Select
              v-model="filters.product_id"
              :options="products"
              :optionLabel="productLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('products.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
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
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import Select from 'primevue/select'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, CreateForm, UpdateForm, Select },

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

    categoryLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    productLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.fetchData()
    this.loadCategories(this.company_id)
  },

  methods: {
    async onCategoryChange() {
      await this.loadProducts(this.company_id, this.filters.category_id)

      this.filters.product_id = ''

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
