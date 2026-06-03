<template>
  <div class="page">
    <div v-if="loading">
      <div class="skeleton-cover"></div>
      <div class="row mt-4">
        <div class="col-12 col-md-4">
          <div class="skeleton-card">
            <div class="skeleton-logo"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text-sm"></div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="skeleton-card">
            <div class="skeleton-title"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line-short"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="page-header">
        <div>
          <h1 class="page-title">{{ itemData.name }}</h1>
          <p class="text-secondary">{{ itemData.name_ar }}</p>
        </div>
        <button class="btn btn-outline" @click="$router.back()">
          <i :class="currentLanguage === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"></i>
          {{ $t('common.back') }}
        </button>
      </div>

      <div class="card p-0 overflow-hidden mb-4">
        <img
          v-if="itemData.company?.cover"
          :src="itemData.company?.cover.file_path"
          :alt="itemData.name"
          class="w-full h-200 object-cover"
        />
        <div v-else class="h-200 flex-center bg-hover">
          <i class="pi pi-building text-3xl text-secondary"></i>
        </div>
      </div>

      <div class="row">
        <!-- Company Info Card -->
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="flex-center mt-n-50">
              <img
                v-if="itemData.company?.logo"
                :src="itemData.company?.logo.file_path"
                :alt="itemData.name"
                class="logo-image"
              />
              <div v-else class="logo-placeholder">
                <i class="pi pi-building text-2xl"></i>
              </div>
            </div>
            <h2 class="text-xl font-bold mt-3">{{ itemData.name }}</h2>
            <p class="text-secondary">{{ itemData.company?.name }}</p>

            <div class="divider"></div>

            <div class="flex flex-column gap-2">
              <div class="flex align-center gap-2 text-secondary">
                <i class="pi pi-envelope text-primary"></i>
                <span>{{ itemData.company?.email || '-' }}</span>
              </div>
              <div class="flex align-center gap-2 text-secondary">
                <i class="pi pi-phone text-primary"></i>
                <span> {{ itemData.phone || itemData.company?.phone || '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-8">
          <div class="card">
            <h3 class="text-lg font-semibold mb-3">{{ $t('branches.basicInfo') }}</h3>

            <div class="row">
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('branches.name') }}</label>
                  <p class="text-sm font-medium">{{ itemData.name }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('branches.name_ar') }}</label>
                  <p class="text-sm font-medium">{{ itemData.name_ar }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('branches.email') }}</label>
                  <p class="text-sm font-medium">{{ itemData.company?.email || '-' }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('branches.phone') }}</label>
                  <p class="text-sm font-medium">
                    {{ itemData.phone || itemData.company?.phone || '-' }}
                  </p>
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('branches.address') }}</label>
                  <p class="text-sm font-medium">
                    {{
                      currentLanguage == 'ar'
                        ? itemData.address_ar || itemData.company?.address || '-'
                        : itemData.address || itemData.company?.address || '-'
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <h3 class="text-lg font-semibold mb-3 mt-2">
              {{ $t('branches.location') }}
            </h3>

            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('countries.title') }}</label>
                  <p class="text-sm font-medium">{{ getCountryName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('governorates.title') }}</label>
                  <p class="text-sm font-medium">{{ getGovernorateName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('cities.title') }}</label>
                  <p class="text-sm font-medium">{{ getCityName() }}</p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <h3 class="text-lg font-semibold mb-3 mt-2">
              {{ $t('common.currency') }}
            </h3>

            <div class="row">
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('common.currency') }}</label>
                  <p class="text-sm font-medium">{{ getCurrencyName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t('common.currencyCode') }}</label>
                  <p class="text-sm font-medium">
                    {{ itemData.company?.currency?.prefix || '-' }}
                  </p>
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
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export default {
  name: 'Show',
  mixins: [tableMixin],
  data() {
    return {
      apiUrl: API_ROUTES.BRANCH.BASE,
    }
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
          this.showItem(this.apiUrl, newVal)
        }
      },
      immediate: true,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  methods: {
    getCountryName() {
      if (!this.itemData.company?.country) return '-'
      return this.currentLanguage === 'ar'
        ? this.itemData.company?.country.name_ar
        : this.itemData.company?.country.name
    },

    getGovernorateName() {
      if (!this.itemData.company?.governorate) return '-'
      return this.currentLanguage === 'ar'
        ? this.itemData.company?.governorate.name_ar
        : this.itemData.company?.governorate.name
    },

    getCityName() {
      if (!this.itemData.company?.city) return '-'
      return this.currentLanguage === 'ar'
        ? this.itemData.company?.city.name_ar
        : this.itemData.company?.city.name
    },

    getCurrencyName() {
      if (!this.itemData.company?.currency) return '-'
      return this.currentLanguage === 'ar'
        ? this.itemData.company?.currency.name_ar
        : this.itemData.company?.currency.name
    },
  },
}
</script>
