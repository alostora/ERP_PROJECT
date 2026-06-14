<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('purchasesInvoices.title') })"
    modal
    :style="{ width: '50vw', height: '30vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeFormModal"
  >
    <div class="card flex justify-center">
      <Stepper :value="activeStep" :linear="activeStep == maxStageSort" class="basis-[50rem]">
        <StepList>
          <Step
            v-for="(stage, index) in stages"
            :key="stage"
            :value="String(stage.stage_sort)"
            @click="goToStep(stage, 'parent')"
            :pt="{
              title: {
                style: {
                  color:
                    activeStep == maxStageSort ? 'var(--color-success)' : 'var(--color-warning)',
                  fontWeight: 'bold',
                },
              },
            }"
          >
            {{ $t('purchasesInvoices.stage') }}
            {{ currentLanguage == 'ar' ? stage.name_ar : stage.name }}
          </Step>
        </StepList>
        <StepPanels>
          <StepPanel
            v-for="stage in stages"
            :key="stage.stage_sort"
            v-slot="{ activateCallback }"
            :value="String(stage.stage_sort)"
            class="border rounded"
          >
            <Card>
              <template #title>
                <div
                  class="border rounded p-1"
                  :class="activeStep == maxStageSort ? 'bg-success-100' : 'bg-warning-100'"
                >
                  {{ currentLanguage == 'ar' ? stage.name_ar : stage.name }}
                </div>
              </template>
              <template #content>
                <form
                  @submit.prevent="handleSubmit"
                  @click.stop
                  v-if="stage.stage_sort != maxStageSort"
                >
                  <label class="form-label">{{ $t('purchasesInvoices.stage_comment') }}</label>
                  <textarea
                    v-model="formData.comment"
                    class="textarea w-full h-full"
                    rows="3"
                    :placeholder="$t('common.add') + ' ' + $t('purchasesInvoices.stage_comment')"
                    @click.stop
                  ></textarea>
                </form>
                <div class="flex gap-4" v-if="stage.stage_sort != maxStageSort">
                  <Button
                    v-if="stage.stage_sort > minStageSort"
                    :label="$t('common.back')"
                    severity="warn"
                    type="button"
                    class="ml-1 mr-1 mb-3"
                    :icon="currentLanguage == 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"
                    @click="(activateCallback(String(stage.stage_sort - 1)), goToStep(stage))"
                  />
                  <Button
                    v-if="stage.stage_sort < maxStageSort"
                    :label="$t('common.next')"
                    severity="success"
                    type="button"
                    class="ml-1 mr-1 mb-3"
                    :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                    iconPos="right"
                    @click="(activateCallback(String(stage.stage_sort + 1)), goToStep(stage))"
                  />
                </div>
              </template>
            </Card>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </Dialog>
</template>

<script>
import { API_ROUTES } from '@/constants/apiRoutes'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import validationRequest from '../validation/validationRequest'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Card from 'primevue/card'

export default {
  name: 'UpdateStageForm',

  mixins: [formMixin, customFunctions, validationRequest],

  components: {
    Dialog,
    Button,
    Stepper,
    StepList,
    StepPanels,
    Step,
    StepPanel,
    StepPanel,
    Card,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.company_id = newVal
        }
      },
      immediate: true,
    },

    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.branch_id = newVal
        }
      },
      immediate: true,
    },
    invoice_id: {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
        }
      },
      immediate: true,
    },
    stage_sort: {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.activeStep = String(newVal)
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    branch_id: {
      type: String,
      required: false,
    },
    invoice_id: {
      type: String,
      required: false,
    },
    stage_sort: {
      type: String,
      required: false,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
    maxStageSort() {
      if (!this.stages || !this.stages.length) return 0
      return Math.max(...this.stages.map((s) => s.stage_sort))
    },
    minStageSort() {
      if (!this.stages || !this.stages.length) return 0
      return Math.min(...this.stages.map((s) => s.stage_sort))
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PURCHASES_INVOICE.UPDATE_STAGE,
      activeStep: String(this.stage_sort),
      formData: {
        id: this.invoice_id,
        invoice_id: this.invoice_id,
        company_id: this.company_id,
        branch_id: this.branch_id,
        stage_id: '',
        comment: '',
      },
    }
  },

  methods: {
    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id
      this.formData.invoice_id = this.invoice_id || this.$route.params.invoice_id
      this.formData.id = this.invoice_id || this.$route.params.invoice_id

      this.loadStages(this.formData.company_id)
    },

    goToStep(stage, parent = null) {
      if (stage.stage_sort == this.maxStageSort) {
        return
      }

      if (parent == null) {
        if (stage.stage_sort > this.minStageSort) {
          const backStage = this.stages.find((s) => s.stage_sort === stage.stage_sort - 1)
          // console.log(stage.stage_sort - 1)
          // console.log('backStage', backStage.stage_sort)
          this.formData.stage_id = backStage.id
        }

        if (stage.stage_sort < this.maxStageSort) {
          const nextStage = this.stages.find((s) => s.stage_sort === stage.stage_sort + 1)
          // console.log(stage.stage_sort + 1)
          // console.log('nextStage', nextStage.stage_sort)
          this.formData.stage_id = nextStage.id
        }
      } else {
        this.formData.stage_id = stage.id
      }

      this.handleSubmit()
    },
    /* 
    goToStage(stage) {
      console.log('hosaaaaam', stage)
      this.activeStep = String(stage.stage_sort)
    }, */

    async handleSubmit() {
      console.log(this.formData)
      if (!this.validateUpdateStageForm(this.formData)) {
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
