<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed, 'rtl-sidebar': isRtl }">
    <nav class="sidebar-nav">
      <template v-for="item in sidebarItems" :key="item.label || item.path">
        <!-- Nested Menu (Group) -->
        <div v-if="item.items" class="nav-group">
          <div
            class="nav-item nav-group-parent"
            :class="{ 'has-children': item.items?.length }"
            @click="toggleGroup(item)"
          >
            <i :class="item.icon" class="nav-icon"></i>
            <span v-if="!collapsed" class="nav-label">{{ $t(item.label) }}</span>
            <i
              v-if="!collapsed"
              class="pi pi-chevron-down nav-arrow"
              :class="{ rotated: isGroupOpen(item) }"
            ></i>
          </div>

          <!-- Group items with animation -->
          <transition name="slide-fade">
            <div v-show="isGroupOpen(item) && !collapsed" class="nav-group-items">
              <template v-for="child in item.items" :key="child.path">
                <!-- Subgroup (Level 3) -->
                <div v-if="child.items" class="nav-subgroup">
                  <div
                    class="nav-item nav-subgroup-parent"
                    @click="toggleSubgroup(child)"
                  >
                    <i :class="child.icon" class="nav-icon-child"></i>
                    <span class="nav-label">{{ $t(child.label) }}</span>
                    <i
                      class="pi pi-chevron-down nav-arrow-small"
                      :class="{ rotated: isSubgroupOpen(child) }"
                    ></i>
                  </div>

                  <!-- Subgroup items with animation -->
                  <transition name="slide-fade-sub">
                    <div
                      v-show="isSubgroupOpen(child) && !collapsed"
                      class="nav-subgroup-items"
                    >
                      <router-link
                        v-for="subchild in child.items"
                        :key="subchild.path"
                        :to="subchild.path"
                        class="nav-item nav-subchild"
                        active-class="active"
                      >
                        <i
                          :class="subchild.icon || 'pi pi-circle-fill'"
                          class="nav-icon-subchild"
                        ></i>
                        <span class="nav-label">{{ $t(subchild.label) }}</span>
                      </router-link>
                    </div>
                  </transition>
                </div>

                <!-- Single Item -->
                <router-link
                  v-else
                  :to="child.path"
                  class="nav-item nav-child"
                  active-class="active"
                >
                  <i
                    :class="child.icon || 'pi pi-circle-fill'"
                    class="nav-icon-child"
                  ></i>
                  <span class="nav-label">{{ $t(child.label) }}</span>
                </router-link>
              </template>
            </div>
          </transition>
        </div>

        <!-- Single Item (No Group) -->
        <router-link v-else :to="item.path" class="nav-item" active-class="active">
          <i :class="item.icon" class="nav-icon"></i>
          <span v-if="!collapsed" class="nav-label">{{ $t(item.label) }}</span>
        </router-link>
      </template>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "LayoutSidebar",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    sidebarItems: {
      type: Array,
      default: () => [],
    },
    isRtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openGroups: {},
      openSubgroups: {},
    };
  },
  methods: {
    toggleGroup(item) {
      this.openGroups[item.label] = !this.openGroups[item.label];
    },
    isGroupOpen(item) {
      return this.openGroups[item.label] || false;
    },
    toggleSubgroup(item) {
      this.openSubgroups[item.label] = !this.openSubgroups[item.label];
    },
    isSubgroupOpen(item) {
      return this.openSubgroups[item.label] || false;
    },
  },
};
</script>
