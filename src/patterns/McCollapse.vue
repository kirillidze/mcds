<template>
  <section class="mc-collapse" :class="classes">
    <span class="mc-collapse__header" v-if="!isDisabled" tabindex="0" @keyup.esc="close">
      <component :is="tag" class="mc-collapse__icon" v-if="icon" size="s" name="arrow_drop_down" />
      <!-- @slot Слот для элемента по которому будет меняться состояние компонента -->
      <slot name="activator" />
      <a
        v-if="border && $slots['body']"
        class="mc-collapse__link"
        href="#"
        @click.prevent="toggle"
      />
    </span>
    <mc-slide-up-down
      v-if="!isDisabled"
      :active="isCollapsed"
      :duration="300"
      class="mc-collapse__body"
      @slide-open-start="slideOpenStart"
      @slide-open-end="slideOpenEnd"
      @slide-close-start="slideCloseStart"
      @slide-close-end="slideCloseEnd"
    >
      <div class="mc-collapse__body-inner">
        <!-- @slot Слот контента -->
        <slot name="body" />
      </div>
    </mc-slide-up-down>
  </section>
</template>

<script>
import { findParentComponent } from "../utils/treeSearch"

import McSvgIcon from "../elements/McSvgIcon"
import McSlideUpDown from "../elements/McSlideUpDown"
import McButton from "../elements/McButton"

export default {
  name: "McCollapse",
  status: "ready",
  release: "1.0.0",
  components: { McButton, McSvgIcon, McSlideUpDown },
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
    border: {
      type: Boolean,
      default: false,
    },
    /**
     *  Иконка состояния коллапса
     *
     */
    icon: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "mc-collapse--is-open": this.isCollapsed,
        "mc-collapse--is-disabled": this.isDisabled,
        "mc-collapse--is-empty": !this.$slots.body,
        "mc-collapse--border": this.border,
      }
    },
    tag() {
      return this.$slots["body"] ? "McSvgIcon" : "div"
    },
    activator() {
      return this.$slots.activator ? this.$slots.activator[0].elm : null
    },
  },

  watch: {
    isCollapsed(value) {
      /**
       * Событие тоггла
       * @property {Boolean}
       */
      this.$emit("toggle", value)
      value ? this.$emit("open") : this.$emit("close")
      const $parent = findParentComponent(this, "McAccordion")
      $parent && $parent.$emit("toggle", { value, component: this })
    },
  },

  mounted() {
    !this.border &&
      this.$slots.body &&
      this.activator &&
      this.activator.addEventListener("click", this.toggle)
    this.activator && (this.activator.style.transition = "all 0.15s")
  },

  beforeDestroy() {
    this.activator && this.activator.removeEventListener("click", this.toggle)
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
    slideOpenStart() {
      /**
       * Событие перед началом открытия
       */
      this.$emit("collapse-open-start")
    },
    slideOpenEnd() {
      /**
       * Событие после открытия
       */
      this.$emit("collapse-open-end")
    },
    slideCloseStart() {
      /**
       * Событие перед началом закрытия
       */
      this.$emit("collapse-close-start")
    },
    slideCloseEnd() {
      /**
       * Событие после закрытия
       */
      this.$emit("collapse-close-end")
    },
  },
}
</script>

<style lang="scss">
.mc-collapse {
  $block-name: &;

  &--border {
    border-radius: $radius-m;
    border: 1px solid $color-outline-gray;

    #{$block-name} {
      &__header {
        position: relative;
        display: flex;
        padding: $space-xs $space-s;
      }
    }
  }

  &__link {
    display: block;
    @include position(absolute, 0);
    z-index: 1;
  }

  &__header {
    display: inline-flex;
    align-items: center;
    outline: none;
    cursor: pointer;
  }

  &__icon {
    @include size($tappable-element-s);
    transition: all $duration-quickly;
  }

  &__body {
    #{$block-name} {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid $color-outline-gray;

      &__header {
        padding-left: 2 * $space-s;
        padding-right: $space-s;
      }

      &__body {
        #{$block-name} {
          &__header {
            padding-left: $space-xl;
          }
        }
      }

      &:first-child {
        border-top: 1px solid $color-outline-gray;
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

  &--is-disabled,
  &--is-empty {
    > #{$block-name} {
      &__header {
        cursor: inherit;
        &:hover {
          color: inherit;
        }
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <mc-collapse>
            <mc-button slot="activator">Заголовок</mc-button>
            <template slot="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                tempore unde!
            </template>
        </mc-collapse>

        <br/>
        <br/>
        <br/>

        <mc-collapse icon border>
            <div slot="activator">Заголовок</div>
            <template slot="body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                tempore unde!
                <mc-collapse icon border>
                    <div slot="activator">Заголовок без бадика</div>
                </mc-collapse>
                <mc-collapse icon border>
                    <div slot="activator">Заголовок</div>
                    <template slot="body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                        facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                        tempore unde!
                        <mc-collapse icon border>
                            <div slot="activator">Заголовок</div>
                            <template slot="body">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                                tempore unde!
                            </template>
                        </mc-collapse>
                        <mc-collapse icon border>
                            <div slot="activator">Заголовок</div>
                            <template slot="body">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                                facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                                tempore unde!
                            </template>
                        </mc-collapse>
                        <mc-collapse icon border>
                            <div slot="activator">Заголовок без бадика</div>
                        </mc-collapse>
                    </template>
                </mc-collapse>
            </template>
        </mc-collapse>
    </div>
    ```
</docs>
