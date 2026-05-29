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
          <i class="pi pi-arrow-left"></i>
          {{ $t("common.back") }}
        </button>
      </div>

      <div class="card p-0 overflow-hidden mb-4">
        <img
          v-if="itemData.cover"
          :src="itemData.cover.file_path"
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
                v-if="itemData.logo"
                :src="itemData.logo.file_path"
                :alt="itemData.name"
                class="logo-image"
              />
              <div v-else class="logo-placeholder">
                <i class="pi pi-building text-2xl"></i>
              </div>
            </div>
            <h2 class="text-xl font-bold mt-3">{{ itemData.name }}</h2>
            <p class="text-secondary">{{ itemData.name_ar }}</p>

            <div class="divider"></div>

            <div class="flex flex-column gap-2">
              <div class="flex align-center gap-2 text-secondary">
                <i class="pi pi-envelope text-primary"></i>
                <span>{{ itemData.email || "-" }}</span>
              </div>
              <div class="flex align-center gap-2 text-secondary">
                <i class="pi pi-phone text-primary"></i>
                <span>{{ itemData.phone || "-" }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-8">
          <div class="card">
            <h3 class="text-lg font-semibold mb-3">{{ $t("companies.basicInfo") }}</h3>

            <div class="row">
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t("companies.name") }}</label>
                  <p class="text-sm font-medium">{{ itemData.name }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("companies.name_ar")
                  }}</label>
                  <p class="text-sm font-medium">{{ itemData.name_ar }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("companies.email")
                  }}</label>
                  <p class="text-sm font-medium">{{ itemData.email || "-" }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("companies.phone")
                  }}</label>
                  <p class="text-sm font-medium">{{ itemData.phone || "-" }}</p>
                </div>
              </div>
              <div class="col-12">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("companies.address")
                  }}</label>
                  <p class="text-sm font-medium">{{ itemData.address || "-" }}</p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <h3 class="text-lg font-semibold mb-3 mt-2">
              {{ $t("companies.location") }}
            </h3>

            <div class="row">
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("countries.title")
                  }}</label>
                  <p class="text-sm font-medium">{{ getCountryName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("governorates.title")
                  }}</label>
                  <p class="text-sm font-medium">{{ getGovernorateName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{ $t("cities.title") }}</label>
                  <p class="text-sm font-medium">{{ getCityName() }}</p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <h3 class="text-lg font-semibold mb-3 mt-2">
              {{ $t("common.currency") }}
            </h3>

            <div class="row">
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("common.currency")
                  }}</label>
                  <p class="text-sm font-medium">{{ getCurrencyName() }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="mb-3">
                  <label class="text-xs text-secondary">{{
                    $t("common.currencyCode")
                  }}</label>
                  <p class="text-sm font-medium">
                    {{ itemData.currency?.prefix || "-" }}
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
import { API_ROUTES } from "@/constants/apiRoutes";
import tableMixin from "@/mixins/table";

export default {
  name: "CompanyShow",
  mixins: [tableMixin],
  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.BASE,
    };
  },

  watch: {
    "$route.params.company_id": {
      handler(newVal) {
        if (newVal && newVal !== "undefined") {
          this.showItem(this.apiUrl, newVal);
        }
      },
      immediate: true,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem("language") || "en";
    },
  },

  methods: {
    getCountryName() {
      if (!this.itemData.country) return "-";
      return this.currentLanguage === "ar"
        ? this.itemData.country.name_ar
        : this.itemData.country.name;
    },

    getGovernorateName() {
      if (!this.itemData.governorate) return "-";
      return this.currentLanguage === "ar"
        ? this.itemData.governorate.name_ar
        : this.itemData.governorate.name;
    },

    getCityName() {
      if (!this.itemData.city) return "-";
      return this.currentLanguage === "ar"
        ? this.itemData.city.name_ar
        : this.itemData.city.name;
    },

    getCurrencyName() {
      if (!this.itemData.currency) return "-";
      return this.currentLanguage === "ar"
        ? this.itemData.currency.name_ar
        : this.itemData.currency.name;
    },
  },
};
</script>
