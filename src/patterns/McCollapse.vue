<template>
  <section class="mc-collapse" :class="classes">
    <div class="mc-collapse__header">
      <template v-if="!isDisabled">
        <a class="mc-collapse__link" href="#" @click.prevent="toggle"></a>
        <McSvgIcon class="mc-collapse__icon" :width="30" :height="30" name="arrow_drop_down" />
      </template>
      <slot></slot>
    </div>
    <slide-up-down
      v-if="!isDisabled"
      :active="isCollapsed"
      :duration="300"
      class="mc-collapse__body"
    >
      <slot name="body"></slot>
    </slide-up-down>
  </section>
</template>

<script>
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
      this.$emit(value ? "open" : "close")
      if (this.$parent.$options.name === "McAccordion") {
        this.$parent.$emit("toggle", { value, component: this })
      }
    },
  },

  methods: {
    open() {
      this.isCollapsed = false
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

  border-radius: 4px;
  border: 1px solid #b7b7b7;

  &--no-border {
    border: none;

    #{$block-name} {
      &__header {
        padding: 8px 0px;
        padding-right: 29px;
      }

      &__icon {
        right: 0;
      }
    }
  }

  &__header {
    font-family: $font-heading-secondary;
    font-size: 16px;
    position: relative;
    padding: 8px 16px;
    padding-right: 45px;
    min-height: 48px;
    display: flex;
    align-items: center;

    &:hover {
      color: $color-cinnabar;
    }
  }

  &__link {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  &__icon {
    width: 30px;
    height: 30px;
    transition: all $duration-quickly;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -15px;
  }

  &__body {
    #{$block-name} {
      border: none;
      border-radius: 0;
      border-bottom: 2px solid $color-gray-lightest;

      &__header {
        padding-left: 75px;
      }

      &__icon {
        left: 40px;
      }

      &__body {
        #{$block-name} {
          &__header {
            padding-left: 105px;
          }

          &__body {
          }

          &__icon {
            left: 70px;
          }
        }
      }

      &:first-child {
        border-top: 2px solid $color-gray-lightest;
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
        color: #222222 !important;
      }
    }

    //border-bottom: none !important;
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
