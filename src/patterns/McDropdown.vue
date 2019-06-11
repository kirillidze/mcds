<template>
  <div class="mc-dropdown" :class="dropdownClasses" v-click-outside="closeDropdown">
    <div class="mc-dropdown__toggler" tabindex="0" @keyup.esc="closeDropdown">
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
  },

  computed: {
    dropdownClasses() {
      return {
        [`mc-dropdown--position-${this.position}`]: this.position,
        ["mc-dropdown--is-open"]: this.value,
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
  }

  &__body {
    position: absolute;
    z-index: $z_index_dropdown;
    top: 100%;
    left: 0;
    height: 0;
    overflow: hidden;
    margin: 0;
    min-width: 85px;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity $duration-quickly, transform $duration-quickly;
  }

  &--is-open {
    #{$block-name} {
      &__body {
        height: auto;
        visibility: visible;
        overflow: visible;
        opacity: 1;
        transform: translateY(0);
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
      <McButton slot="activator">Владилен</McButton>
      <McPanel>
        <McButton
                href="#"
                @click.prevent
                full-width
                text-align="left"
                variation="gray-darkest-flat"
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
                variation="gray-darkest-flat"
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
                variation="gray-darkest-flat"
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
                variation="danger-flat"
                size="l"
        >
          <McSvgIcon slot="icon-prepend" name="exit_to_app" size="xxs"/>
          Выйти
        </McButton>
      </McPanel>
    </McDropdown>
  </div>
  ```
</docs>
