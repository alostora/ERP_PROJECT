<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('employees.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('employees.branch')"
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
              :placeholder="$t('employees.warehouse')"
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
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('employees.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="email" v-model="formData.email" autocomplete="on" class="w-full" />
              <label for="email">{{ $t('employees.email') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>

        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="phone" v-model="formData.phone" autocomplete="on" class="w-full" />
              <label for="phone">{{ $t('employees.phone') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.phone" class="error-message">{{ errors.phone }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">{{ $t('employees.passwordLeaveBlank') }}</label>
            <FloatLabel variant="on">
              <Password id="password" v-model="formData.password" toggleMask />
              <label for="password">{{ $t('employees.password') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
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
              <label for="address">{{ $t('employees.address') }}</label>
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
          {{ formLoading ? $t('common.loading') : $t('common.update') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Password from 'primevue/password'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Password },

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
        company_id: selectedItem.company_id || '',
        branch_id: selectedItem.branch_id || '',
        warehouse_id: selectedItem.warehouse_id || '',
        name: selectedItem.name || '',
        email: selectedItem.email || '',
        phone: selectedItem.phone || '',
        password: '',
        address: selectedItem.address || '',
      }

      this.loadBranches(selectedItem.company_id)
      this.loadWarehouses(selectedItem.branch_id)
    },

    async onBranchChange() {
      await this.loadWarehouses(this.formData.company_id, this.formData.branch_id)

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
