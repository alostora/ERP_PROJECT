<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('finalProductVariantValues.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="flex align-center gap-3 mb-2">
        <button
          class="btn btn-outline"
          @click="$router.push(`/company/final-products/${company_id}`)"
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
        <Column field="id" :header="$t('finalProductVariantValues.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column :header="$t('finalProductVariantValues.finalProduct')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar'
                  ? data.final_product?.name_ar || '-'
                  : data.final_product?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('finalProductVariantValues.variant')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar' ? data.variant?.name_ar || '-' : data.variant?.name || '-'
              }}
            </div>
          </template>
        </Column>

        <Column :header="$t('finalProductVariantValues.variantValue')" class="col-1">
          <template #body="{ data }">
            <div class="info-item">
              {{
                currentLanguage === 'ar'
                  ? data.variant_value?.value_ar || '-'
                  : data.variant_value?.value || '-'
              }}
            </div>
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

    <CreateForm
      ref="createModal"
      :company_id="company_id"
      :final_product_id="final_product_id"
      @created="fetchData"
    />
    <UpdateForm
      ref="updateModal"
      :selected_item="selectedItem"
      :company_id="company_id"
      :final_product_id="final_product_id"
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

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DataTable, Column, Toast, ConfirmDialog, CreateForm, UpdateForm },

  watch: {
    final_product_id: {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.FINAL_PRODUCT_VARIANT_VALUE.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      default: '',
    },
    final_product_id: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.FINAL_PRODUCT_VARIANT_VALUE.SEARCH,
      deleteUrl: API_ROUTES.FINAL_PRODUCT_VARIANT_VALUE.BASE,
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
    goBack() {
      this.$router.push(`/company/final-products/${this.company_id}`)
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
