<template>
  <Panel :toggleable="true" :collapsed="true" style="background-color: var(--surface-100)">
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-search text-warning p-1"></i>
        <span class="font-medium text-warning">
          {{ $t('common.search') }}
        </span>
      </div>
    </template>
    <div class="card-gray">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.query_string"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('common.search')"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-4 mb-1">
          <div class="search-wrapper">
            <Select
              v-model="filters.category_id"
              :options="categories"
              :optionLabel="categoryLabel"
              optionValue="id"
              :placeholder="$t('categories.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onCategoryChange"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-1" v-if="this.filters.category_id">
          <div class="search-wrapper">
            <Select
              v-model="filters.product_id"
              :options="products"
              :optionLabel="productLabel"
              optionValue="id"
              :placeholder="$t('products.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6 col-md-3 col-lg-2 mt-2">
          <Select
            v-model="filters.per_page"
            :options="perPageValues"
            optionLabel="name"
            optionValue="value"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {},

  emits: ['emitFetchData'],

  props: {
    company_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      perPageValues: [
        { name: 5, value: 5 },
        { name: 10, value: 10 },
        { name: 25, value: 25 },
        { name: 50, value: 50 },
      ],
      filters: {
        per_page: 10,
        query_string: '',
      },
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
    this.loadCategories(this.company_id)
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },

    async onCategoryChange() {
      await this.loadProducts(this.company_id, this.filters.category_id)

      this.filters.product_id = ''

      this.emitFetchData()
    },
  },
}
</script>
