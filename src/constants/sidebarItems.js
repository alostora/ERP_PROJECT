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
            { label: 'common.menu.allClients', icon: 'pi pi-circle-fill', path: '/clients' },
            // { label: 'common.menu.roles', icon: 'pi pi-circle-fill', path: '/roles' },
            // { label: 'common.menu.permissions', icon: 'pi pi-circle-fill', path: '/permissions' },
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
      // Start with default items
      this.sidebar_items = [...this.defaultSidebarItems]

      const companiesGroup = this.sidebar_items.find(
        (item) => item.label === 'common.menu.companiesGroup'
      )

      // Always remove companyManagement first (cleanup)
      if (companiesGroup) {
        companiesGroup.items = companiesGroup.items.filter(
          (item) => item.label !== 'common.menu.companyManagement'
        )
      }

      // Add Company Management (2nd level) when company is selected
      if (this.company_id) {
        const companyManagement = {
          label: 'common.menu.companyManagement',
          icon: 'pi pi-building',
          items: [
            {
              label: 'common.menu.companyDetails',
              icon: 'pi pi-circle-fill',
              path: `/company/${this.company_id}`,
            },
            {
              label: 'common.menu.settingsGroup',
              icon: 'pi pi-cog',
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
                  label: 'common.menu.employees',
                  icon: 'pi pi-circle-fill',
                  path: `/company/employees/${this.company_id}`,
                },
                {
                  label: 'common.menu.contacts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/contacts/${this.company_id}`,
                },
              ],
            },

            // Products & Properties Subgroup (3rd level)
            {
              label: 'common.menu.productProperties',
              icon: 'pi pi-box',
              items: [
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
                {
                  label: 'common.menu.discounts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/discounts/${this.company_id}`,
                },
              ],
            },

            // Financial Subgroup (3rd level)
            {
              label: 'common.menu.financial',
              icon: 'pi pi-money-bill',
              items: [
                {
                  label: 'common.menu.accountGuides',
                  icon: 'pi pi-circle-fill',
                  path: `/company/account-guides/${this.company_id}`,
                },
                {
                  label: 'common.menu.cashBoxes',
                  icon: 'pi pi-circle-fill',
                  path: `/company/cash-boxes/${this.company_id}`,
                },
                {
                  label: 'common.menu.bankAccounts',
                  icon: 'pi pi-circle-fill',
                  path: `/company/bank-accounts/${this.company_id}`,
                },
                {
                  label: 'common.menu.wallets',
                  icon: 'pi pi-circle-fill',
                  path: `/company/wallets/${this.company_id}`,
                },
                {
                  label: 'common.menu.transferMoneys',
                  icon: 'pi pi-circle-fill',
                  path: `/company/transfer-moneys/${this.company_id}`,
                },
                {
                  label: 'common.menu.payments',
                  icon: 'pi pi-circle-fill',
                  path: `/company/payments/${this.company_id}`,
                },
              ],
            },

            // Invoices Subgroup (3rd level)
            {
              label: 'common.menu.invoices',
              icon: 'pi pi-money-bill',
              items: [
                {
                  label: 'common.menu.purchasesInvoices',
                  icon: 'pi pi-circle-fill',
                  path: `/company/purchases-invoices/${this.company_id}`,
                },
                {
                  label: 'common.menu.salesInvoices',
                  icon: 'pi pi-circle-fill',
                  path: `/company/sales-invoices/${this.company_id}`,
                },
              ],
            },
            {
              label: 'common.menu.stockManagement',
              icon: 'pi pi-money-bill',
              items: [
                {
                  label: 'common.menu.stockingRequests',
                  icon: 'pi pi-circle-fill',
                  path: `/company/stocking-requests/${this.company_id}`,
                },
                {
                  label: 'common.menu.adjustmentStockingRequests',
                  icon: 'pi pi-circle-fill',
                  path: `/company/adjustment-stocking-requests/${this.company_id}`,
                },
                {
                  label: 'common.menu.transportRequests',
                  icon: 'pi pi-circle-fill',
                  path: `/company/transport-requests/${this.company_id}`,
                },
              ],
            },
          ],
        }

        ///////////////////////////////////// BRANCHES /////////////////////////////////////
        //put company items inside its group
        if (companiesGroup) {
          companiesGroup.items.push(companyManagement)
        } else {
          this.sidebar_items.push(companyManagement)
        }

        const branchManagement = {
          label: 'common.menu.branchesGroup',
          icon: 'pi pi-map-marker',
          items: [
            {
              label: 'common.menu.allBranches',
              icon: 'pi pi-share-alt',
              path: `/company/branches/${this.company_id}`,
            },
          ],
        }
        // Remove existing to avoid duplicates
        const existingIndex = this.sidebar_items.findIndex(
          (item) => item.label === 'common.menu.branchesGroup'
        )
        if (existingIndex !== -1) {
          this.sidebar_items.splice(existingIndex, 1)
        }

        // Add branch-specific items only when branch_id exists
        if (this.branch_id) {
          const branchItems = [
            {
              label: 'common.menu.branchDetails',
              icon: 'pi pi-circle-fill',
              path: `/company/branch/${this.company_id}/${this.branch_id}`,
            },
            {
              label: 'common.menu.warehouses',
              icon: 'pi pi-circle-fill',
              path: `/company/branch/warehouses/${this.company_id}/${this.branch_id}`,
            },
            // {
            //   label: 'common.menu.branchEmployees',
            //   icon: 'pi pi-circle-fill',
            //   path: `/branch/${this.company_id}/employees/${this.branch_id}`,
            // },
            // {
            //   label: 'common.menu.purchasesInvoices',
            //   icon: 'pi pi-circle-fill',
            //   path: `/branch/${this.company_id}/purchases-invoices/${this.branch_id}`,
            // },
          ]

          // Add branch items to the existing items array
          branchManagement.items.push(...branchItems)
        }

        this.sidebar_items.push(branchManagement)
      }
    },
  },
}

export default sidebarItems
