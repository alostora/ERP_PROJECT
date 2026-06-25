<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('cities.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
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
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onCountryChange"
            />
            <small v-if="errors.country_id" class="error-message">{{ errors.country_id }}</small>
          </div>
        </div>

        <div class="col-12" v-if="governorates.length">
          <div class="form-group">
            <Select
              v-model="formData.governorate_id"
              :options="governorates"
              :optionLabel="governorateLabel"
              optionValue="id"
              :placeholder="$t('governorates.title')"
              :filter="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.country_id" class="error-message">{{ errors.country_id }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('cities.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('cities.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
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
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: {},

  data() {
    return {
      apiUrl: API_ROUTES.CITY.BASE,
      formData: {
        name: '',
        name_ar: '',
        country_id: '',
        governorate_id: '',
      },
    }
  },

  mounted() {
    this.loadCountries()
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

  methods: {
    async onCountryChange() {
      await this.loadGovernorates(this.formData.country_id)

      this.formData.governorate_id = ''
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
