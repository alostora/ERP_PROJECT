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
import formMixin from '@/mixins/form'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, tableMixin, customFunctions, validationRequest],
  components: {},

  props: {
    item_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.BASE,
      formData: {
        id: '',
        currency_id: '',
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
    populateForm() {
      this.formData = {
        id: this.itemData.id || '',
        currency_id: this.itemData.currency?.id || '',
        country_id: this.itemData.country?.id || '',
        governorate_id: this.itemData.governorate?.id || '',
        city_id: this.itemData.city?.id || '',
        name: this.itemData.name || '',
        name_ar: this.itemData.name_ar || '',
        phone: this.itemData.phone || '',
        email: this.itemData.email || '',
        address: this.itemData.address || '',
      }

      if (this.formData.country_id) {
        this.loadGovernorates(this.formData.country_id)
      }

      if (this.formData.governorate_id) {
        this.loadCities(this.formData.governorate_id)
      }
    },

    async onCountryChange() {
      await this.loadGovernorates(this.formData.country_id)

      this.formData.governorate_id = ''
    },

    async onGovernorateChange() {
      await this.loadCities(this.formData.governorate_id)

      this.formData.city_id = ''
    },

    async openModal() {
      this.formVisible = true

      await this.showItem(this.apiUrl, this.item_id)
      this.populateForm()
    },

    async handleSubmit() {
      if (!this.validateUpdateForm(this.formData)) {
        return
      }

      const data = { ...this.formData }
      delete data.id

      await this.submitUpdateForm(
        this.apiUrl,
        this.formData.id,
        data,
        this.$t('common.updatedSuccessfully')
      )
    },
  },
}
</script>
