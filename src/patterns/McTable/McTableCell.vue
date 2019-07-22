<template>
  <component :is="tag" class="mc-table-cell" :style="styles" :class="classes">
    <div class="mc-table-cell__inner">
      <slot></slot>
    </div>
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
    checkable: {
      type: Boolean,
      default: false,
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
        "mc-table-cell--checkable": this.checkable,
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

  &__link {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    & > * {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
    }
  }

  &__inner {
    @include layout-flex-fix();
    display: flex;
    align-items: center;
  }

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

  .mc-field-text {
    &__footer {
      display: none;
    }
  }

  .mc-bage--vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }

  &--checkable {
    #{$block-name} {
      &__inner {
        display: flex;
        align-items: center;

        .mc-field-checkbox {
          flex: 0 0 auto;
          margin-right: 12px;

          + * {
            @include layout-flex-fix();
            flex: 1 1 auto;
          }
        }
      }
    }
  }
}

th.mc-table-cell {
  $block-name: &;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: $color-white;
  z-index: 3;
  border-bottom: none;

  &::before,
  &::after {
    @include position(absolute, 0);
    @include pseudo();
    height: 1px;
    background-color: $color-gray-light;
  }

  &::before {
    bottom: auto;
  }

  &::after {
    top: auto;
  }
}
</style>
