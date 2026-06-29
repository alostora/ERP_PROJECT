<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('stage_employees.title') })"
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
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('stage_employees.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onBranchChange"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group" v-if="this.formData.branch_id && warehouses.length">
            <Select
              v-model="formData.warehouse_id"
              :options="warehouses"
              :optionLabel="warehouseLabel"
              optionValue="id"
              :placeholder="$t('stage_employees.warehouse')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <MultiSelect
              v-model="formData.employee_ids"
              :options="employees"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('stage_employees.title')"
              :filter="true"
              :showClear="true"
              display="chip"
              class="w-full mb-3"
            />
          </div>
          <small v-if="errors.employee_ids" class="error-message">{{ errors.employee_ids }}</small>
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
import MultiSelect from 'primevue/multiselect'

import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { MultiSelect },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    stage_id: {
      type: String,
      required: true,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },
  data() {
    return {
      apiUrl: API_ROUTES.STAGE_EMPLOYEE.CREATE_STAGE_EMPLOYEES,
      formData: {
        company_id: this.company_id,
        stage_id: this.stage_id,
        branch_id: '',
        warehouse_id: '',
        employee_ids: [],
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

    warehouseLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    async onBranchChange() {
      await this.loadWarehouses(this.company_id, this.formData.branch_id)

      this.formData.warehouse_id = ''
    },

    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.stage_id = this.stage_id || this.$route.params.stage_id

      this.loadBranches(this.formData.company_id)
      this.loadEmployees(this.formData.stage_id)
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
