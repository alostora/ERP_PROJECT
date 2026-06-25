<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('stages.title') })"
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
        <Select
          v-model="formData.type_id"
          :options="stageTypes"
          :optionLabel="stageTypeLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('stages.type')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.type_id" class="error-message">{{ errors.type_id }}</small>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('stages.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('stages.affects_stock') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.affects_stock" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('stages.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('stages.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="details"
                v-model="formData.details"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="details">{{ $t('stages.details') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="details_ar"
                v-model="formData.details_ar"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="details_ar">{{ $t('stages.details_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
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
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select, ToggleSwitch },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    type_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.STAGE.BASE,
      formData: {
        company_id: '',
        type_id: '',
        is_default: '',
        affects_stock: '',
        name: '',
        name_ar: '',
        details: '',
        details_ar: '',
      },
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    stageTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadStageTypes()
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.type_id = this.type_id
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
