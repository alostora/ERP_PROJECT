<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('variantValues.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('variantValues.variant') }}</label>
        <Select
          v-model="formData.variant_id"
          :options="variants"
          :optionLabel="variantLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('variants.title')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.variant_id" class="error-message">{{ errors.variant_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('variantValues.value') }}</label>
        <input
          v-model="formData.value"
          type="text"
          class="input"
          :class="{ 'input-error': errors.value }"
        />
        <small v-if="errors.value" class="error-message">{{ errors.value }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('variantValues.value_ar') }}</label>
        <input
          v-model="formData.value_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.value_ar }"
        />
        <small v-if="errors.value_ar" class="error-message">{{ errors.value_ar }}</small>
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
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import Select from 'primevue/select'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    variant_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.VARIANT_VALUE.BASE,
      formData: {
        company_id: '',
        variant_id: '',
        value: '',
        value_ar: '',
      },
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    variantLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadVariants(this.company_id)
  },

  methods: {
    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id

      this.formData.variant_id = this.variant_id || this.$route.params.variant_id
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
