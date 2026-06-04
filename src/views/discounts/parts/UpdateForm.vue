<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('discounts.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.date_from') }}</label>
            <input
              v-model="formattedDateFrom"
              type="datetime-local"
              class="input"
              :class="{ 'input-error': errors.date_from }"
            />
            <small v-if="errors.date_from" class="error-message">{{ errors.date_from }}</small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.date_to') }}</label>
            <input
              v-model="formattedDateTo"
              type="datetime-local"
              class="input"
              :class="{ 'input-error': errors.date_to }"
            />
            <small v-if="errors.date_to" class="error-message">{{ errors.date_to }}</small>
          </div>
        </div>
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
      apiUrl: API_ROUTES.DISCOUNT.BASE,
      formData: {
        id: '',
        name: '',
        name_ar: '',
        date_from: '',
        date_to: '',
      },
    }
  },

  mounted() {},

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    formattedDateFrom: {
      get() {
        if (!this.formData.date_from) return ''
        return this.formData.date_from.replace('Z', '').slice(0, 16)
      },
      set(value) {
        this.formData.date_from = value ? new Date(value).toISOString() : ''
      },
    },
    formattedDateTo: {
      get() {
        if (!this.formData.date_to) return ''
        return this.formData.date_to.replace('Z', '').slice(0, 16)
      },
      set(value) {
        this.formData.date_to = value ? new Date(value).toISOString() : ''
      },
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        name: selectedItem.name || '',
        name_ar: selectedItem.name_ar || '',
        date_from: selectedItem.date_from || '',
        date_to: selectedItem.date_to || '',
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
