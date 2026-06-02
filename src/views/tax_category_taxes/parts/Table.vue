<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('taxCategoryTaxes.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="flex align-center gap-3 mb-2">
        <button
          class="btn btn-outline"
          @click="$router.push(`/company/tax-categories/${company_id}`)"
        >
          <i :class="currentLanguage === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
          {{ $t('common.back') }}
        </button>
      </div>
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
        <Column field="id" :header="$t('taxCategoryTaxes.sortOrder')" class="col-1" sortable>
          <template #body="{ data, index }">
            <div
              draggable="true"
              @dragstart="dragStart($event, index)"
              @dragover="dragOver($event)"
              @drop="drop($event, index)"
              class="drag-item"
            >
              <i class="pi pi-bars"></i>
              {{ data.sort_order }}
            </div>
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.taxCategory.name')">
          <template #body="{ data }">
            {{ data.tax_category ? data.tax_category.name : '-' }}
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.taxCategory.nameAr')">
          <template #body="{ data }">
            {{ data.tax_category ? data.tax_category.name_ar : '-' }}
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.name')">
          <template #body="{ data }">
            {{ data.tax ? data.tax.name : '-' }}
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.nameAr')">
          <template #body="{ data }">
            {{ data.tax ? data.tax.name_ar : '-' }}
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.value')">
          <template #body="{ data }">
            {{ data.tax ? data.tax.value : 0 }}
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.is_active')">
          <template #body="{ data }">
            <div v-if="data.tax && data.tax.is_active" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="data.tax && !data.tax.is_active" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.is_default')">
          <template #body="{ data }">
            <div v-if="data.tax && data.tax.is_default" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="data.tax && !data.tax.is_default" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.is_system')">
          <template #body="{ data }">
            <div v-if="data.tax && data.tax.is_system" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="data.tax && !data.tax.is_system" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('taxCategoryTaxes.tax.type')">
          <template #body="{ data }">
            <div v-if="data.tax && data.tax.type" class="badge badge-success">
              {{ currentLanguage === 'en' ? data.tax.type.name : data.tax.type.name_ar }}
            </div>
          </template>
        </Column>

        <Column
          field="fixed_amount_override"
          :header="$t('taxCategoryTaxes.fixedAmountOverride')"
        />

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
      :tax_category_id="tax_category_id"
    />
    <UpdateForm
      ref="updateModal"
      :tax_category_id="tax_category_id"
      :tax_id="tax_id"
      :selected_item="selectedItem"
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
    '$route.params.tax_category_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.TAX_CATEGORY_TAX.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    tax_category_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.TAX_CATEGORY_TAX.SEARCH,
      deleteUrl: API_ROUTES.TAX_CATEGORY_TAX.DELETE_TAX,
      filters: { query_string: '' },
      selectedItem: {},
      tax_id: null,
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
    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    openUpdateModal(item) {
      this.tax_id = item.tax.id
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    deleteRow(item) {
      const taxCategoryTaxId = this.tax_category_id + '/' + item.tax.id

      this.deleteItem(this.deleteUrl, taxCategoryTaxId, item.name)
    },
  },
}
</script>
