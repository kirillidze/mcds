<template>
  <div class="mc-dropdown" :class="dropdownClasses" v-click-outside="handleClickOutside">
    <div
      class="mc-dropdown__toggler"
      :class="togglerClasses"
      tabindex="0"
      @keyup.esc="closeDropdown"
    >
      <slot name="activator" />
    </div>
    <div class="mc-dropdown__body">
      <slot />
    </div>
  </div>
</template>

<script>
import VueClickOutside from "vue-click-outside"
import McButton from "../elements/McButton"
import McPanel from "./McPanel"
import McSvgIcon from "../elements/McSvgIcon"

export default {
  name: "McDropdown",
  components: { McSvgIcon, McPanel, McButton },
  status: "ready",
  release: "0.0.1",
  directives: {
    "click-outside": VueClickOutside,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "left",
    },
    listPosition: {
      type: String,
      default: "bottom",
    },
    rotateIcon: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    dropdownClasses() {
      return {
        [`mc-dropdown--position-${this.position}`]: this.position,
        [`mc-dropdown--list-position-${this.listPosition}`]: this.listPosition,
        ["mc-dropdown--is-open"]: this.value,
      }
    },
    togglerClasses() {
      return {
        ["mc-dropdown__toggler--rotate-icon"]: this.rotateIcon,
      }
    },
    activator() {
      return this.$slots.activator[0].elm
    },
  },

  watch: {
    $route() {
      this.closeDropdown()
    },
  },

  mounted() {
    this.activator.addEventListener("click", this.toggleDropdown)
  },

  methods: {
    toggleDropdown() {
      this.$emit("input", !this.value)
    },
    handleClickOutside(e) {
      if (!this.value || !document.body.contains(e.target)) return
      this.closeDropdown()
    },
    closeDropdown() {
      this.$emit("input", false)
    },
  },
}
</script>

<style lang="scss">
.mc-dropdown {
  $block-name: &;

  position: relative;
  display: inline-block;

  &__toggler {
    outline: none;
    .mc-svg-icon {
      transition: all $duration-quickly;
    }
  }

  &__body {
    position: absolute;
    z-index: $z_index_dropdown;
    left: 0;
    height: 0;
    overflow: hidden;
    margin: 0;
    min-width: 85px;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    transition: opacity $duration-quickly, transform $duration-quickly;
  }

  &--list-position-top {
    #{$block-name} {
      &__body {
        bottom: 100%;
        //transform: translateY(-10px);
      }
    }
  }

  &--list-position-bottom {
    #{$block-name} {
      &__body {
        top: 100%;
        /*transform: translateY(10px);*/
      }
    }
  }

  &--is-open {
    #{$block-name} {
      &__body {
        height: auto;
        visibility: visible;
        overflow: visible;
        opacity: 1;
        /*transform: translateY(0);*/
      }
    }

    #{$block-name} {
      &__toggler--rotate-icon {
        > .mc-button {
          .mc-svg-icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  &--position-right {
    #{$block-name} {
      &__body {
        left: auto;
        right: 0;
      }
    }
  }

  &--position-left {
    #{$block-name} {
      &__body {
        left: 0;
        right: auto;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let dropIsOpen = false
  <div>
    <McDropdown v-model="dropIsOpen">
      <McButton slot="activator">
        Владилен
        <McSvgIcon slot="icon-append" name="arrow_drop_down" size="xs"/>
      </McButton>
      <McPanel>
        <McButton
                href="#"
                @click.prevent
                full-width
                text-align="left"
                variation="gray-dark-flat"
                size="l"
        >
          <McSvgIcon slot="icon-prepend" name="account_circle" size="xxs"/>
          Профиль
        </McButton>
        <McButton
                href="#"
                @click.prevent
                full-width
                text-align="left"
                variation="gray-dark-flat"
                size="l"
        >
          <McSvgIcon slot="icon-prepend" name="swap_horizontal_circle" size="xxs"/>
          Транзакции
        </McButton>
        <McButton
                href="#"
                @click.prevent
                full-width
                text-align="left"
                variation="gray-dark-flat"
                size="l"
        >
          <McSvgIcon slot="icon-prepend" name="settings" size="xxs"/>
          Безопасность
        </McButton>
        <McButton
                href="#"
                @click.prevent
                full-width
                text-align="left"
                variation="red-flat"
                size="l"
        >
          <McSvgIcon slot="icon-prepend" name="exit_to_app" size="xxs"/>
          Выйти
        </McButton>
      </McPanel>
    </McDropdown>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
  ```
</docs>
