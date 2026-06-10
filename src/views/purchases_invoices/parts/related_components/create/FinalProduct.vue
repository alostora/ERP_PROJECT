<template>
  <div class="card col-12 col-lg-7">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-3 col-md-3" v-for="product in finalProducts" :key="product.id">
        <div class="border rounded m-2 p-3">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="
                  product.main_image?.file?.file_path ||
                  'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'
                "
                :alt="product.name"
                class="w-full h-48 object-cover rounded"
              />
            </div>
          </div>

          <div
            class="mb-4 font-medium truncate inline-block"
            style="max-width: 100%"
            :title="product.name"
          >
            {{ product.name }}
          </div>

          <div class="flex justify-between items-center">
            <div class="row justify-between align-center mt-2">
              <div class="col-auto font-semibold text-xl">
                {{ product.grand_total_price }}
              </div>
              <div class="col-auto">
                <Button icon="pi pi-heart" severity="secondary" variant="outlined" />
                <Button
                  icon="pi pi-shopping-cart"
                  class="ml-2 mr-2"
                  @click="emitAppendProductToCart(product)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customFunctions from '../../../custom_functions/customFunctions'
import formMixin from '@/mixins/form'

import Tag from 'primevue/tag'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'FinalProduct',

  mixins: [customFunctions, formMixin],

  emits: ['appendProductToCart'],

  components: {
    Tag,
    Button,
    ProgressSpinner,
  },

  watch: {
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
      final_product_details: {
        final_product_id: '',
        name: '',
        grand_total_price: 0,
        quantity: 0,
      },
      cart_final_products: [],
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  mounted() {
    this.loadFinalProducts(this.company_id)
  },

  methods: {
    emitAppendProductToCart(product) {
      this.final_product_details = {
        final_product_id: product.id,
        name: product.name,
        unit_price: product.grand_total_price,
        quantity: 1,
        measurement_unit_id: product.purchases_measurement_unit?.id,
      }

      // Check if product already exists
      const existingProduct = this.cart_final_products.find(
        (p) => p.final_product_id === this.final_product_details.final_product_id
      )

      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        this.cart_final_products.push(this.final_product_details)
      }

      this.$emit('appendProductToCart', this.cart_final_products)
    },
  },
}
</script>
