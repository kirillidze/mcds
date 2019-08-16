<template>
  <section class="mc-collapse" :class="classes">
    <div class="mc-collapse__header" v-if="!isDisabled" tabindex="0" @keyup.esc="close">
      <slot name="activator" />
    </div>
    <slide-up-down
      v-if="!isDisabled"
      :active="isCollapsed"
      :duration="300"
      class="mc-collapse__body"
    >
      <div class="mc-collapse__body-inner">
        <slot name="body" />
      </div>
    </slide-up-down>
  </section>
</template>

<script>
import { findParentComponent } from "../utils/treeSearch"

import McSvgIcon from "../elements/McSvgIcon"
import SlideUpDown from "vue-slide-up-down"
import McButton from "../elements/McButton"

export default {
  name: "McCollapse",
  status: "ready",
  release: "1.0.0",
  components: { McButton, McSvgIcon, SlideUpDown },
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
  },

  computed: {
    classes() {
      return {
        "mc-collapse--is-open": this.isCollapsed,
        "mc-collapse--is-disabled": this.isDisabled,
        "mc-collapse--is-empty": this.isEmpty,
      }
    },
    activator() {
      return this.$slots.activator ? this.$slots.activator[0].elm : null
    },
    isEmpty() {
      return !this.$slots.body
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

  mounted() {
    this.activator && this.activator.addEventListener("click", this.toggle)
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

  &__header {
    outline: none;
    cursor: pointer;
  }

  &__icon {
  }

  &__body {
    #{$block-name} {
      &__header {
      }

      &__icon {
      }

      &__body {
        #{$block-name} {
          &__header {
          }

          &__body {
          }

          &__icon {
          }
        }
      }

      &:first-child {
      }

      &:last-child {
      }
    }
  }

  &--is-open {
    > #{$block-name} {
      &__header {
        #{$block-name} {
          &__icon {
          }
        }
      }
    }
  }

  &--is-disabled,
  &--is-empty {
    > #{$block-name} {
      &__header {
        cursor: inherit;
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McCollapse>
            <mc-button slot="activator">Заголовок</mc-button>
            <template slot="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                tempore unde!
            </template>
        </McCollapse>
    </div>
    ```
</docs>
