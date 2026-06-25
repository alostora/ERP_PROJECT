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
            v-model="filters.country_id"
            :options="countries"
            :optionLabel="countryLabel"
            optionValue="id"
            :placeholder="$t('countries.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onCountryChange"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-4" v-if="filters.country_id">
          <Select
            v-model="filters.governorate_id"
            :options="governorates"
            :optionLabel="governorateLabel"
            optionValue="id"
            :placeholder="$t('governorates.title')"
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

  watch: {
    '$route.params.country_id': {
      handler(newVal) {
        if (newVal) {
          this.filters.country_id = newVal
        }
      },
      immediate: true,
    },
    '$route.params.governorate_id': {
      handler(newVal) {
        if (newVal) {
          this.filters.governorate_id = newVal
        }
      },
      immediate: true,
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
        country_id: this.$route.params.country_id || '',
        governorate_id: this.$route.params.governorate_id || '',
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    countryLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    governorateLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    const countryId = this.$route.params.country_id

    if (countryId) {
      this.filters.country_id = countryId
      this.loadGovernorates(countryId)
    }

    const governorateId = this.$route.params.governorate_id

    if (governorateId) {
      this.filters.governorate_id = governorateId
    }

    this.loadCountries()
  },

  methods: {
    emiFetchData() {
      this.$emit('emiFetchData', this.filters)
    },

    async onCountryChange() {
      await this.loadGovernorates(this.filters.country_id)

      this.filters.governorate_id = ''

      this.emiFetchData()
    },
  },
}
</script>
