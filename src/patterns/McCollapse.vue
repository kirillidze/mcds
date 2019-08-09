<template>
  <section class="mc-collapse" :class="classes">
    <div class="mc-collapse__header">
      <template v-if="!isDisabled && $slots['body']">
        <a class="mc-collapse__link" href="#" @click.prevent="toggle"></a>
        <McSvgIcon class="mc-collapse__icon" size="s" name="arrow_drop_down" />
      </template>
      <slot />
    </div>
    <slide-up-down
      v-if="!isDisabled"
      :active="isCollapsed"
      :duration="300"
      class="mc-collapse__body"
    >
      <slot name="body" />
    </slide-up-down>
  </section>
</template>

<script>
import { findParentComponent } from "../utils/treeSearch"

import McSvgIcon from "../elements/McSvgIcon"
import SlideUpDown from "vue-slide-up-down"

export default {
  name: "McCollapse",
  status: "deprecated",
  release: "1.0.0",
  components: { McSvgIcon, SlideUpDown },
  data() {
    return {
      isCollapsed: false,
    }
  },

  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "mc-collapse--is-open": this.isCollapsed,
        "mc-collapse--is-disabled": this.isDisabled,
        "mc-collapse--no-border": this.noBorder,
      }
    },
  },

  watch: {
    isCollapsed(value) {
      this.$emit("toggle", value)
      value ? this.$emit("open") : this.$emit("close")
      let $parent = findParentComponent(this, "McAccordion")
      if ($parent) {
        $parent.$emit("toggle", { value, component: this })
      }
    },
  },

  methods: {
    open() {
      this.isCollapsed = true
    },
    close() {
      this.isCollapsed = false
    },
    toggle() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<style lang="scss">
.mc-collapse {
  $block-name: &;

  border-radius: $radius-m;
  border: 2px solid $border-color;

  &--no-border {
    border: none;
  }

  &__header {
    position: relative;
    padding: $space-xs $space-s $space-xs $space-l;
    min-height: $tappable-element-l;
    display: flex;
    align-items: center;

    &:hover {
      color: $color-cinnabar;
    }
  }

  &__link {
    display: block;
    @include position(absolute, 0);
    z-index: 1;
  }

  &__icon {
    transition: all $duration-quickly;
    position: absolute;
    left: $space-xs;
  }

  &__body {
    #{$block-name} {
      border: none;
      border-radius: 0;
      border-bottom: $separator-xs solid $color-border;

      &__header {
        padding-left: 80px;
      }

      &__icon {
        left: 40px;
      }

      &__body {
        #{$block-name} {
          &__header {
            padding-left: 112px;
          }

          &__body {
          }

          &__icon {
            left: 72px;
          }
        }
      }

      &:first-child {
        border-top: $separator-xs solid $color-border;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &--is-open {
    > #{$block-name} {
      &__header {
        #{$block-name} {
          &__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  &--is-disabled {
    > #{$block-name} {
      &__header {
        color: $color-gray-darkest !important;
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McCollapse>
            <template>Заголовок</template>
            <template slot="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                tempore unde!
            </template>
        </McCollapse>
    </div>
    ```
</docs>
