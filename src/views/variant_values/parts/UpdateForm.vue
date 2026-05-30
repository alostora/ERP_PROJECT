<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('variantValues.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
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
          {{ formLoading ? $t('common.loading') : $t('common.update') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    selected_item: {
      immediate: true,
      deep: true,
      handler(selectedItem) {
        if (selectedItem && selectedItem.id) {
          this.populateForm(selectedItem)
        }
      },
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.VARIANT_VALUE.BASE,
      formData: {
        id: '',
        value: '',
        value_ar: '',
      },
    }
  },

  mounted() {},

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        value: selectedItem.value || '',
        value_ar: selectedItem.value_ar || '',
      }
    },

    openModal() {
      this.formVisible = true
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
