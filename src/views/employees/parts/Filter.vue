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
              @input="emiFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('common.search')"
            />
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <Select
            v-model="filters.branch_id"
            :options="branches"
            :optionLabel="branchLabel"
            optionValue="id"
            :placeholder="$t('employees.branch')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onBranchChange"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-4" v-if="filters.branch_id && warehouses.length">
          <Select
            v-model="filters.warehouse_id"
            :options="warehouses"
            :optionLabel="warehouseLabel"
            optionValue="id"
            :placeholder="$t('employees.warehouse')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emiFetchData"
          />
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
            @change="emiFetchData"
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

  emits: ['emiFetchData'],

  props: {
    company_id: {
      type: String,
      required: false,
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

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    warehouseLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadBranches(this.company_id)
  },

  methods: {
    emiFetchData() {
      this.$emit('emiFetchData', this.filters)
    },

    async onBranchChange() {
      await this.loadWarehouses(this.company_id, this.filters.branch_id)

      this.filters.warehouse_id = ''

      this.emiFetchData()
    },
  },
}
</script>
