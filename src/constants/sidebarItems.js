export const sidebarItems = {
  data() {
    return {
      company_id: null,
      branch_id: null,
      sidebar_items: [],
    }
  },

  computed: {
    defaultSidebarItems() {
      return [
        // Main Dashboard
        { label: 'common.menu.dashboard', icon: 'pi pi-home', path: '/' },

        // User Management Group
        {
          label: 'common.menu.userManagement',
          icon: 'pi pi-users',
          items: [
            { label: 'common.menu.allUsers', icon: 'pi pi-circle-fill', path: '/users' },
            { label: 'common.menu.roles', icon: 'pi pi-circle-fill', path: '/roles' },
            { label: 'common.menu.permissions', icon: 'pi pi-circle-fill', path: '/permissions' },
          ],
        },

        // Locations Group
        {
          label: 'common.menu.locations',
          icon: 'pi pi-map',
          items: [
            { label: 'common.menu.countries', icon: 'pi pi-circle-fill', path: '/countries' },
            { label: 'common.menu.governorates', icon: 'pi pi-circle-fill', path: '/governorates' },
            { label: 'common.menu.cities', icon: 'pi pi-circle-fill', path: '/cities' },
          ],
        },

        // Companies & Business Group
        {
          label: 'common.menu.companiesGroup',
          icon: 'pi pi-briefcase',
          items: [
            { label: 'common.menu.allCompanies', icon: 'pi pi-circle-fill', path: '/companies' },
          ],
        },

        // Sales & Invoices Group
        // {
        //      label: "common.menu.salesGroup",
        //      icon: "pi pi-chart-line",
        //      items: [
        //           { label: "common.menu.orders", icon: "pi pi-circle-fill", path: "/orders" },
        //           { label: "common.menu.invoices", icon: "pi pi-circle-fill", path: "/invoices" },
        //           { label: "common.menu.invoiceStages", icon: "pi pi-circle-fill", path: "/invoice-stages" },
        //      ]
        // },

        // // Reports Group
        // {
        //      label: "common.menu.reportsGroup",
        //      icon: "pi pi-chart-bar",
        //      items: [
        //           { label: "common.menu.salesReports", icon: "pi pi-circle-fill", path: "/reports/sales" },
        //           { label: "common.menu.inventoryReports", icon: "pi pi-circle-fill", path: "/reports/inventory" },
        //           { label: "common.menu.financialReports", icon: "pi pi-circle-fill", path: "/reports/financial" },
        //      ]
        // },

        // // Settings Group
        // {
        //      label: "common.menu.settingsGroup",
        //      icon: "pi pi-cog",
        //      items: [
        //           { label: "common.menu.generalSettings", icon: "pi pi-circle-fill", path: "/settings" },
        //           { label: "common.menu.profile", icon: "pi pi-circle-fill", path: "/profile" },
        //      ]
        // },
      ]
    },
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
          this.handleSidebarItems()
        } else {
          this.company_id = null
          this.handleSidebarItems()
        }
      },
      immediate: true,
    },
    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.branch_id = newVal
          this.handleSidebarItems()
        } else {
          this.branch_id = null
          this.handleSidebarItems()
        }
      },
      immediate: true,
    },
    '$route.path': {
      handler() {
        this.handleSidebarItems()
      },
    },
  },

  mounted() {
    this.company_id = this.$route.params.company_id || null
    this.branch_id = this.$route.params.branch_id || null
    this.handleSidebarItems()
  },

  methods: {
    handleSidebarItems() {
      this.sidebar_items = [...this.defaultSidebarItems]

      // Add Company Management (2nd level) when company is selected
      if (this.company_id && !this.branch_id) {
        const companyManagement = {
          label: 'common.menu.companyManagement',
          icon: 'pi pi-building',
          items: [
            {
              label: 'common.menu.companyDetails',
              icon: 'pi pi-circle-fill',
              path: `/company/${this.company_id}`,
            },

            // Settings Subgroup
            {
              label: 'common.menu.settingsGroup',
              icon: 'pi pi-cog',
              items: [
                {
                  label: 'common.menu.operationsStages',
                  icon: 'pi pi-circle-fill',
                  path: `/company/stages/${this.company_id}`,
                },
                {
                  label: 'common.menu.taxes',
                  icon: 'pi pi-circle-fill',
                  path: `/company/taxes/${this.company_id}`,
                },
                {
                  label: 'common.menu.taxCategories',
                  icon: 'pi pi-circle-fill',
                  path: `/company/tax-categories/${this.company_id}`,
                },
                {
                  label: 'common.menu.contacts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/${this.company_id}/contacts`,
                },
                {
                  label: 'common.menu.employees',
                  icon: 'pi pi-circle-fill',
                  path: `/company/${this.company_id}/employees`,
                },
                {
                  label: 'common.menu.discounts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/${this.company_id}/discounts`,
                },
              ],
            },

            // Products & Inventory Subgroup (3rd level)
            {
              label: 'common.menu.productsInventory',
              icon: 'pi pi-box',
              items: [
                {
                  label: 'common.menu.measurementUnitGroups',
                  icon: 'pi pi-circle-fill',
                  path: `/company/measurement-unit-groups/${this.company_id}`,
                },
                {
                  label: 'common.menu.measurementUnits',
                  icon: 'pi pi-circle-fill',
                  path: `/company/measurement-units/${this.company_id}`,
                },
                {
                  label: 'common.menu.variants',
                  icon: 'pi pi-circle-fill',
                  path: `/company/variants/${this.company_id}`,
                },
                {
                  label: 'common.menu.categories',
                  icon: 'pi pi-circle-fill',
                  path: `/company/categories/${this.company_id}`,
                },
                {
                  label: 'common.menu.products',
                  icon: 'pi pi-circle-fill',
                  path: `/company/products/${this.company_id}`,
                },
                {
                  label: 'common.menu.finalProducts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/final-products/${this.company_id}`,
                },
              ],
            },
          ],
        }

        // Find companies group and insert company management after it
        const companiesIndex = this.sidebar_items.findIndex(
          (item) => item.label === 'common.menu.companiesGroup'
        )
        if (companiesIndex !== -1) {
          this.sidebar_items.splice(companiesIndex + 1, 0, companyManagement)
        } else {
          this.sidebar_items.push(companyManagement)
        }
      }

      // Add Branch Management (3rd level) when branch is selected
      if (this.branch_id && this.company_id) {
        const branchManagement = {
          label: 'common.menu.branchManagement',
          icon: 'pi pi-map-marker',
          items: [
            {
              label: 'common.menu.branchDetails',
              icon: 'pi pi-circle-fill',
              path: `/branch/${this.company_id}/show/${this.branch_id}`,
            },
            {
              label: 'common.menu.warehouses',
              icon: 'pi pi-circle-fill',
              path: `/branch/${this.company_id}/warehouses/${this.branch_id}`,
            },
            {
              label: 'common.menu.branchEmployees',
              icon: 'pi pi-circle-fill',
              path: `/branch/${this.company_id}/employees/${this.branch_id}`,
            },
            {
              label: 'common.menu.purchasesInvoices',
              icon: 'pi pi-circle-fill',
              path: `/branch/${this.company_id}/purchases-invoices/${this.branch_id}`,
            },
            {
              label: 'common.menu.backToList',
              icon: 'pi pi-arrow-left',
              path: `/company/${this.company_id}/branches`,
            },
          ],
        }
        this.sidebar_items.push(branchManagement)
      }
    },
  },
}

export default sidebarItems
