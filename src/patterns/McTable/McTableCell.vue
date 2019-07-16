<template>
  <component :is="tag" class="mc-table-cell" :style="styles" :class="classes">
    <slot></slot>
  </component>
</template>

<script>
import tokens from "../../assets/tokens/tokens"
export default {
  name: "McTableCell",

  props: {
    tag: {
      type: String,
      default: "td",
    },
    item: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: "m",
    },
  },

  computed: {
    styles() {
      if (!this.item) return
      return {
        width: this.item.width,
        borderRight: this.item.hasBorder ? `1px solid ${tokens.color_gray_light}` : null,
      }
    },
    classes() {
      return {
        [`mc-table-cell--size-${this.size}`]: this.size,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-cell {
  $block-name: &;

  @include reset-text-indents();
  border-bottom: 1px solid $color-gray-light;
  vertical-align: middle;
  position: relative;
  background-color: $color-white;

  &:first-child {
    // position: sticky;
    // left: 0;
    // z-index: 1;
  }

  &--size-m {
    height: $tappable-element-l;
    padding: $space-xxxs $space_m / 2;
  }
  &:not(#{$block-name}) {
    &--height-fixed {
      height: auto;
    }
  }

  .mc-bage--vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
}

th.mc-table-cell {
  $block-name: &;

  // position: sticky;
  // top: -1px;
  // left: 0;
  // right: 0;
  // background-color: $color-white;
  // z-index: 3;
}
</style>
