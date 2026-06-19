<template>
  <div class="card col-12 col-md-12 col-lg-8">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <div v-else class="row">
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3"
        v-for="product in finalProducts"
        :key="product.id"
      >
        <div class="mb-2">
          <div style="width: 100%">
            <div class="rounded p-2 bg-primary-50">
              <div class="relative mx-auto">
                <img
                  :src="
                    product.main_image?.file?.file_path ||
                    'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'
                  "
                  :alt="currentLanguage == 'ar' ? product.name : product.name_ar"
                  class="w-full object-cover rounded"
                  style="height: 100px"
                />
              </div>
              <Message severity="secondary" size="small">
                <div
                  class="mb-4 font-medium truncate inline-block text-success text-lg"
                  style="max-width: 100%"
                  :title="currentLanguage == 'ar' ? product.name_ar : product.name"
                >
                  {{ currentLanguage == 'ar' ? product.name_ar : product.name }}
                </div>
              </Message>

              <Message severity="secondary" size="small">
                {{ $t('salesInvoicesReturns.sold_quantity') }}
                <Badge size="small">
                  {{
                    product.sold_quantity +
                    ' ' +
                    (currentLanguage == 'ar'
                      ? product.sold_measurement_unit.name_ar
                      : product.sold_measurement_unit.name)
                  }}

                  ({{
                    product.sold_measurement_unit.factor_value +
                    (currentLanguage == 'ar'
                      ? product.measurement_unit.name_ar
                      : product.measurement_unit.name)
                  }})
                </Badge>
              </Message>

              <Message severity="secondary" size="small">
                <span class="text-xs p-1">
                  {{ $t('salesInvoicesReturns.remaining_returnable_quantity') }}
                </span>
                <Badge size="small">
                  {{ product.quantity + ' : ' }}
                  {{
                    currentLanguage == 'ar'
                      ? product.measurement_unit.name_ar
                      : product.measurement_unit.name
                  }}
                </Badge>
              </Message>

              <div class="row">
                <div class="col-12 font-semibold">
                  <Message severity="secondary" size="small">
                    {{ $t('salesInvoicesReturns.unit_price') }}
                    ({{
                      currentLanguage == 'ar'
                        ? product.measurement_unit.name_ar
                        : product.measurement_unit.name
                    }})
                    <Badge size="small">
                      {{ ' : ' + product.price }}
                    </Badge>
                  </Message>
                </div>
                <div class="col-12">
                  <Button
                    icon="pi pi-cart-plus"
                    class="btn-lg"
                    style="width: 100%"
                    @click="emitAppendProductToCart(product)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customFunctions from '../../custom_functions/customFunctions'
import formMixin from '@/mixins/form'

import Tag from 'primevue/tag'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Badge from 'primevue/badge'

export default {
  name: 'FinalProduct',

  mixins: [customFunctions, formMixin],

  emits: ['appendProductToCart'],

  components: {
    Tag,
    Button,
    ProgressSpinner,
    Message,
    Badge,
  },

  watch: {
    '$route.params.sales_invoice_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
        }
      },
      immediate: true,
    },
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
        }
      },
      immediate: true,
    },

    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
        }
      },
      immediate: true,
    },
    final_products: {
      handler(newVal) {
        if (newVal) {
          this.cart_final_products = newVal
        }
      },
      immediate: true,
    },
  },

  props: {
    sales_invoice_id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    branch_id: {
      type: String,
      required: false,
    },
    final_products: { type: Array, default: () => [] },
  },

  data() {
    return {
      cart_final_products: [],
      final_product_details: {
        final_product_id: '',
        name: '',
        price: 0,
        quantity: 0,
        operations: [],
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  mounted() {
    this.loadFinalProducts(this.sales_invoice_id)
  },

  methods: {
    emitAppendProductToCart(product) {
      this.final_product_details = {
        final_product_id: product.id,
        name: product.name,
        name_ar: product.name_ar,
        final_product_variant_values: product.final_product_variant_values,
        unit_price: product.price,
        measurement_unit_id: product.measurement_unit_id,
        quantity: product.quantity,
        remaining_returnable_quantity: product.remaining_returnable_quantity,
        operations: product.operations,
        sales_invoice_id: product.sales_invoice_id,
        sold_quantity: product.sold_quantity,
        sold_measurement_unit: product.sold_measurement_unit,
      }

      // Check if product already exists
      const existingProduct = this.cart_final_products.find(
        (p) => p.final_product_id === this.final_product_details.final_product_id
      )

      if (existingProduct) {
        if (existingProduct.quantity < existingProduct.remaining_returnable_quantity) {
          existingProduct.quantity += 1
        }
      } else {
        this.cart_final_products.unshift(this.final_product_details)
      }

      this.$emit('appendProductToCart', this.cart_final_products)
    },
  },
}
</script>
