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
