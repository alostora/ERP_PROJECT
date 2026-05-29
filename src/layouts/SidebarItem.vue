<template>
  <div class="sidebar-item-wrapper">
    <!-- Item with children (has nested items) -->
    <div v-if="item.items">
      <div :class="['nav-item', getLevelClass()]" @click="toggleOpen">
        <i :class="[item.icon || getDefaultIcon(), getIconClass()]"></i>
        <span v-if="!collapsed" class="nav-label">{{ $t(item.label) }}</span>
        <i
          v-if="!collapsed"
          class="pi pi-chevron-down"
          :class="['nav-arrow', getArrowClass()]"
        ></i>
      </div>

      <transition name="slide-fade">
        <div
          v-show="isOpen && !collapsed"
          class="nav-group-items"
          :style="getNestedStyle()"
        >
          <SidebarItem
            v-for="child in item.items"
            :key="child.label || child.path"
            :item="child"
            :level="level + 1"
            :collapsed="collapsed"
            :is-rtl="isRtl"
          />
        </div>
      </transition>
    </div>

    <!-- Item without children (direct link) -->
    <router-link
      v-else
      :to="item.path"
      :class="['nav-item', getLevelClass()]"
      active-class="active"
    >
      <i :class="[item.icon || getDefaultIcon(), getIconClass()]"></i>
      <span class="nav-label">{{ $t(item.label) }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    isRtl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    getLevelClass() {
      return `nav-level-${this.level}`;
    },
    getIconClass() {
      if (this.level === 0) return "nav-icon";
      if (this.level === 1) return "nav-icon-child";
      if (this.level === 2) return "nav-icon-subchild";
      if (this.level === 3) return "nav-icon-level3";
      if (this.level === 4) return "nav-icon-level4";
      return "nav-icon-deep";
    },
    getArrowClass() {
      return {
        rotated: this.isOpen,
        "nav-arrow-level-0": this.level === 0,
        "nav-arrow-level-1": this.level === 1,
        "nav-arrow-level-2": this.level === 2,
        "nav-arrow-level-3": this.level >= 3,
      };
    },
    getDefaultIcon() {
      return "pi pi-circle-fill";
    },
    getNestedStyle() {
      return {
        marginLeft: this.isRtl ? "0" : `${0.5 + this.level * 0.25}rem`,
        marginRight: this.isRtl ? `${0.5 + this.level * 0.25}rem` : "0",
      };
    },
  },
};
</script>

<style scoped>
.sidebar-item-wrapper {
  position: relative;
}

/* Base nav item */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.nav-item:hover {
  transform: translateX(4px);
}

/* Level styles based on depth */
.nav-level-0 {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.08), rgba(52, 211, 153, 0.05));
  border-left: 3px solid #42b883;
  font-weight: 600;
  color: #42b883;
}

.nav-level-0:hover {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.15), rgba(52, 211, 153, 0.1));
}

.nav-level-0.active {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.2), rgba(52, 211, 153, 0.15));
}

.nav-level-1 {
  padding-left: 2rem !important;
  background: rgba(52, 152, 219, 0.06);
  border-left: 3px solid #3498db;
  font-weight: 500;
  color: #3498db;
}

.nav-level-1:hover {
  background: rgba(52, 152, 219, 0.12);
}

.nav-level-1.active {
  background: rgba(52, 152, 219, 0.18);
}

.nav-level-2 {
  padding-left: 3rem !important;
  color: #ff6b6b;
  border-left: 2px solid transparent;
  font-size: 0.875rem;
}

.nav-level-2:hover {
  background: rgba(255, 107, 107, 0.08);
  color: #ff6b6b;
  border-left-color: #ff6b6b;
}

.nav-level-2.active {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
  border-left-color: #ff6b6b;
}

.nav-level-3 {
  padding-left: 4rem !important;
  color: #9b59b6;
  border-left: 2px solid transparent;
  font-size: 0.813rem;
}

.nav-level-3:hover {
  background: rgba(155, 89, 182, 0.08);
  color: #9b59b6;
  border-left-color: #9b59b6;
}

.nav-level-3.active {
  background: rgba(155, 89, 182, 0.15);
  color: #9b59b6;
  border-left-color: #9b59b6;
}

.nav-level-4 {
  padding-left: 5rem !important;
  color: #f39c12;
  border-left: 2px solid transparent;
  font-size: 0.75rem;
}

.nav-level-4:hover {
  background: rgba(243, 156, 18, 0.08);
  color: #f39c12;
  border-left-color: #f39c12;
}

.nav-level-4.active {
  background: rgba(243, 156, 18, 0.15);
  color: #f39c12;
  border-left-color: #f39c12;
}

.nav-level-5 {
  padding-left: 6rem !important;
  color: #a855f7;
  border-left: 2px solid transparent;
  font-size: 0.688rem;
}

.nav-level-5:hover {
  background: rgba(168, 85, 247, 0.08);
  color: #a855f7;
  border-left-color: #a855f7;
}

/* Icons */
.nav-icon,
.nav-icon-child,
.nav-icon-subchild,
.nav-icon-level3,
.nav-icon-level4,
.nav-icon-deep {
  min-width: 1.5rem;
}

.nav-icon {
  font-size: 1.125rem;
}
.nav-icon-child {
  font-size: 0.875rem;
}
.nav-icon-subchild {
  font-size: 0.75rem;
}
.nav-icon-level3 {
  font-size: 0.688rem;
}
.nav-icon-level4 {
  font-size: 0.625rem;
}
.nav-icon-deep {
  font-size: 0.5rem;
}

/* Arrow styles */
.nav-arrow {
  margin-left: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-arrow.rotated {
  transform: rotate(180deg);
}

.nav-arrow-level-0 {
  font-size: 0.75rem;
  color: #42b883;
}
.nav-arrow-level-1 {
  font-size: 0.688rem;
  color: #3498db;
}
.nav-arrow-level-2 {
  font-size: 0.625rem;
  color: #ff6b6b;
}
.nav-arrow-level-3 {
  font-size: 0.563rem;
  color: #9b59b6;
}

/* Nested containers */
.nav-group-items {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* RTL support */
.rtl-sidebar .nav-level-1 {
  padding-left: 1rem !important;
  padding-right: 2rem !important;
}

.rtl-sidebar .nav-level-2 {
  padding-left: 1rem !important;
  padding-right: 3rem !important;
}

.rtl-sidebar .nav-level-3 {
  padding-left: 1rem !important;
  padding-right: 4rem !important;
}

.rtl-sidebar .nav-level-4 {
  padding-left: 1rem !important;
  padding-right: 5rem !important;
}

.rtl-sidebar .nav-level-5 {
  padding-left: 1rem !important;
  padding-right: 6rem !important;
}

.rtl-sidebar .nav-arrow {
  margin-left: 0;
  margin-right: auto;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
