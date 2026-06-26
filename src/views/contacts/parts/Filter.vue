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
        <div class="col-12 col-md-6 col-lg-4">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.phone"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('contacts.phone')"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.email"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('contacts.email')"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.address"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('contacts.address')"
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
  },

  mounted() {},

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },
  },
}
</script>
