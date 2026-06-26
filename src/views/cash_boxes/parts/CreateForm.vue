<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('cashBoxes.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('cashBoxes.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-group">
            <Select
              v-model="formData.level_code"
              :options="levelCodeValues"
              optionLabel="name"
              optionValue="value"
              :showClear="true"
              :placeholder="$t('cashBoxes.level_code')"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="determineLevelCode"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-group" v-if="this.formData.level_code === 2">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('cashBoxes.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('cashBoxes.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('cashBoxes.name_ar') }}</label>
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
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'

import { API_ROUTES } from '@/constants/apiRoutes'
import formMixin from '@/mixins/form'
import customFunctions from '../custom_functions/customFunctions'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, ToggleSwitch },

  props: {
    company_id: {
      type: String,
      required: true,
    },

    branch_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.CASH_BOX.BASE,

      levelCodeValues: [
        { name: this.$t('cashBoxes.company'), value: 1 },
        { name: this.$t('cashBoxes.branch'), value: 2 },
      ],

      formData: {
        company_id: '',
        branch_id: '',
        name: '',
        name_ar: '',
        details: '',
        details_ar: '',
        level_code: '',
        is_default: false,
      },
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },
  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id
    },

    determineLevelCode() {
      if (this.formData.level_code === 2) {
        this.loadBranches(this.company_id)
      }
      if (this.formData.level_code === 1) {
        this.formData.branch_id = ''
      }
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
