<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('users.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('employees.branch') }}</label>
        <div class="col-12">
          <Select
            v-model="formData.branch_id"
            :options="branches"
            :optionLabel="branchLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('employees.branch')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onBranchChange"
          />
        </div>
      </div>

      <div class="form-group" v-if="this.formData.branch_id && warehouses.length">
        <label class="form-label required">{{ $t('employees.warehouse') }}</label>
        <div class="col-12">
          <Select
            v-model="formData.warehouse_id"
            :options="warehouses"
            :optionLabel="warehouseLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('employees.warehouse')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('users.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('users.email') }}</label>
        <input
          v-model="formData.email"
          type="email"
          class="input"
          :class="{ 'input-error': errors.email }"
        />
        <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.passwordLeaveBlank') }}</label>
        <input v-model="formData.password" type="password" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.address') }}</label>
        <textarea v-model="formData.address" class="textarea" rows="3"></textarea>
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
      apiUrl: API_ROUTES.EMPLOYEE.BASE,
      formData: {
        id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        branch_id: '',
        warehouse_id: '',
      },
      errors: {},
    }
  },

  mounted() {},

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
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        name: selectedItem.name || '',
        email: selectedItem.email || '',
        phone: selectedItem.phone || '',
        password: '',
        address: selectedItem.address || '',
        company_id: selectedItem.company_id || '',
        branch_id: selectedItem.branch_id || '',
        warehouse_id: selectedItem.warehouse_id || '',
      }

      this.loadBranches(selectedItem.company_id)
      this.loadWarehouses(selectedItem.branch_id)
    },

    async onBranchChange() {
      await this.loadWarehouses(this.formData.branch_id)

      this.formData.warehouse_id = ''
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
      if (!data.password) delete data.password

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
