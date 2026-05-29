<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t("companies.title") }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t("common.addNew") }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="search-wrapper">
              <i class="pi pi-search search-icon"></i>
              <input type="text" v-model="filters.query_string" @input="fetchData" class="input"
                :placeholder="$t('common.search')" />
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3">
            <Select v-model="filters.client_id" :options="clients" optionLabel="name" optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('clients.title')" :filter="true" :showClear="true"
              :filterPlaceholder="$t('common.search')" class="w-full" @change="fetchData" />
          </div>

          <div class="col-12 col-md-6 col-lg-3 mt-2 mt-md-0">
            <Select v-model="filters.country_id" :options="countries" :optionLabel="countryLabel" optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('countries.title')" :filter="true" :showClear="true"
              :filterPlaceholder="$t('common.search')" class="w-full" @change="onCountryChange" />
          </div>

          <div class="col-12 col-md-6 col-lg-3 mt-2 mt-md-0" v-if="governorates.length">
            <Select v-model="filters.governorate_id" :options="governorates" :optionLabel="governorateLabel"
              optionValue="id" :placeholder="$t('common.all') + ' ' + $t('governorates.title')" :filter="true"
              :showClear="true" :filterPlaceholder="$t('common.search')" class="w-full" @change="onGovernorateChange" />
          </div>

          <div class="col-12 col-md-6 col-lg-3 mt-2 mt-md-0" v-if="cities.length">
            <Select v-model="filters.city_id" :options="cities" :optionLabel="cityLabel" optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('cities.title')" :filter="true" :showClear="true"
              :filterPlaceholder="$t('common.search')" class="w-full" @change="fetchData" />
          </div>

          <div class="col-6 col-md-3 col-lg-2 mt-2 mt-md-0">
            <select v-model="perPage" @change="fetchData" class="select">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable :value="items" :paginator="true" :rows="perPage" :totalRecords="meta.total"
        :rowsPerPageOptions="[5, 10, 25, 50]" :loading="loading" lazy @page="onPageChange" @sort="onSort"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" resizableColumns showGridlines>
        <Column field="id" :header="$t('companies.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="logo" :header="$t('companies.logo')">
          <template #body="slotProps">
            <div class="flex-center">
              <img v-if="slotProps.data.logo" :src="slotProps.data.logo.file_path" :alt="slotProps.data.name"
                class="table-image-sm" />
              <div v-else class="image-placeholder">
                <i class="pi pi-image"></i>
              </div>
            </div>
          </template>
        </Column>

        <Column field="name" :header="$t('companies.name')" sortable />

        <Column field="name_ar" :header="$t('companies.name_ar')" sortable />

        <Column field="phone" :header="$t('companies.phone')" sortable />

        <Column field="email" :header="$t('companies.email')" sortable />

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data)" :title="$t('common.edit')">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="btn-icon text-danger" @click="deleteRow(data)" :title="$t('common.delete')">
                <i class="pi pi-trash"></i>
              </button>
              <button class="btn-icon" @click="$router.push(`/company/${data.id}`)" :title="$t('common.view')">
                <i class="pi pi-eye"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm ref="createModal" @created="fetchData" />
    <UpdateForm ref="updateModal" :selected_item="selectedItem" @updated="fetchData" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import CreateForm from "./CreateForm.vue";
import UpdateForm from "./UpdateForm.vue";
import { customFunctions } from "../custom_functions/customFunctions";
import tableMixin from "@/mixins/table";
import { API_ROUTES } from "@/constants/apiRoutes";
import Select from "primevue/select";
import Image from "primevue/image";

export default {
  name: "Table",
  mixins: [tableMixin, customFunctions],
  components: {
    DataTable,
    Column,
    Toast,
    ConfirmDialog,
    CreateForm,
    UpdateForm,
    Select,
    Image,
  },

  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.SEARCH,
      deleteUrl: API_ROUTES.COMPANY.BASE,
      filters: {
        query_string: "",
        client_id: "",
        country_id: "",
        governorate_id: "",
        city_id: "",
      },
      selectedItem: {},
    };
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem("language") || "en";
    },

    countryLabel() {
      return this.currentLanguage === "ar" ? "name_ar" : "name";
    },

    governorateLabel() {
      return this.currentLanguage === "ar" ? "name_ar" : "name";
    },

    cityLabel() {
      return this.currentLanguage === "ar" ? "name_ar" : "name";
    },
  },

  mounted() {
    const countryId = this.$route.query.country_id;

    if (countryId) {
      this.filters.country_id = countryId;
      this.loadGovernorates(countryId);
    }

    const governorateId = this.$route.query.governorate_id;

    if (governorateId) {
      this.filters.governorate_id = governorateId;
    }

    this.fetchData();
    this.loadClients();
    this.loadCountries();
  },

  methods: {
    async onCountryChange() {
      this.filters.governorate_id = "";
      this.filters.city_id = "";

      await this.loadGovernorates(this.filters.country_id);

      this.fetchData();
    },

    async onGovernorateChange() {
      this.filters.city_id = "";

      await this.loadCities(this.filters.governorate_id);

      this.fetchData();
    },

    openCreateModal() {
      this.$refs.createModal.openModal();
    },

    openUpdateModal(item) {
      this.selectedItem = { ...item };
      this.$nextTick(() => {
        this.$refs.updateModal.openModal();
      });
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name);
    },
  },
};
</script>
