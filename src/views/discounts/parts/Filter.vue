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
        <div class="col-6 col-md-6 col-lg-6">
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
        <div class="col-6 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.type_id"
              :options="discountTypes"
              :optionLabel="discountTypeLabel"
              optionValue="id"
              :placeholder="$t('discounts.type')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <FloatLabel variant="on">
              <DatePicker
                v-model="filters.date_from"
                inputId="date_from"
                showIcon
                showButtonBar
                iconDisplay="input"
                class="w-full"
                @update:modelValue="emitFetchData"
              />
              <label for="date_from">{{ $t('discounts.date_from') }}</label>
            </FloatLabel>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <FloatLabel variant="on">
              <DatePicker
                v-model="filters.date_to"
                inputId="date_to"
                showIcon
                showButtonBar
                iconDisplay="input"
                class="w-full"
                @update:modelValue="emitFetchData"
              />
              <label for="date_to">{{ $t('discounts.date_to') }}</label>
            </FloatLabel>
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
import DatePicker from 'primevue/datepicker'

import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DatePicker },

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

    discountTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadDiscountTypes()
  },

  methods: {
    emitFetchData() {
      const filtersToEmit = { ...this.filters }

      if (filtersToEmit.date_from) {
        filtersToEmit.date_from = this.formatDate(filtersToEmit.date_from)
      }
      if (filtersToEmit.date_to) {
        filtersToEmit.date_to = this.formatDate(filtersToEmit.date_to)
      }

      this.$emit('emitFetchData', filtersToEmit)
    },

    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
}
</script>
