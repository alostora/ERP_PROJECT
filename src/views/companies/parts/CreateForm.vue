<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('companies.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.client_id"
              :options="clients"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('clients.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.client_id" class="error-message">{{ errors.client_id }}</small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.currency_id"
              :options="currencies"
              :optionLabel="currencyLabel"
              optionValue="id"
              :placeholder="$t('companies.currency')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.currency_id" class="error-message">{{ errors.currency_id }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.country_id"
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
            <small v-if="errors.country_id" class="error-message">{{ errors.country_id }}</small>
          </div>
        </div>
      </div>

      <div class="row" v-if="governorates.length">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.governorate_id"
              :options="governorates"
              :optionLabel="governorateLabel"
              optionValue="id"
              :placeholder="$t('governorates.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onGovernorateChange"
            />
            <small v-if="errors.governorate_id" class="error-message">{{
              errors.governorate_id
            }}</small>
          </div>
        </div>
      </div>

      <div class="row" v-if="cities.length">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.city_id"
              :options="cities"
              :optionLabel="cityLabel"
              optionValue="id"
              :placeholder="$t('cities.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.city_id" class="error-message">{{ errors.city_id }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('companies.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('companies.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="phone" v-model="formData.phone" autocomplete="on" class="w-full" />
              <label for="phone">{{ $t('companies.phone') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.phone" class="error-message">{{ errors.phone }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="email" v-model="formData.email" autocomplete="on" class="w-full" />
              <label for="email">{{ $t('companies.email') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="address"
                v-model="formData.address"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="address">{{ $t('companies.address') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.address" class="error-message">{{ errors.address }}</small>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline ml-2 mr-2" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Textarea from 'primevue/textarea'

import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select, InputText, FloatLabel, Textarea },

  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.BASE,
      formData: {
        currency_id: '',
        client_id: '',
        country_id: '',
        governorate_id: '',
        city_id: '',
        name: '',
        name_ar: '',
        phone: '',
        email: '',
        address: '',
      },
    }
  },

  mounted() {
    this.loadClients()
    this.loadCurrencies()
    this.loadCountries()
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    currencyLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    countryLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    governorateLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    cityLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    async onCountryChange() {
      await this.loadGovernorates(this.formData.country_id)

      this.formData.governorate_id = ''
    },

    async onGovernorateChange() {
      await this.loadCities(this.formData.governorate_id)

      this.formData.city_id = ''
    },

    openModal() {
      this.openFormModal()
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
