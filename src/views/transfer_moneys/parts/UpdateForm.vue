<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('transferMoneys.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('transferMoneys.status') }}</label>
        <Select
          v-model="formData.status_id"
          :options="statusList"
          :optionLabel="statusLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('transferMoneys.status')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.status_id" class="error-message">{{ errors.status_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('transferMoneys.notes') }}</label>

        <textarea v-model="formData.notes" class="textarea" rows="3"></textarea>
        <small v-if="errors.notes" class="error-message">{{ errors.notes }}</small>
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
import Select from 'primevue/select'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

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
      apiUrl: API_ROUTES.TRANSFER_MONEY.SET_STATUS,
      formData: {
        id: '',
        status_id: '',
        notes: '',
      },
    }
  },

  mounted() {
    this.loadStatusList()
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    statusLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        status_id: selectedItem.status_id || '',
        notes: selectedItem.notes || '',
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
