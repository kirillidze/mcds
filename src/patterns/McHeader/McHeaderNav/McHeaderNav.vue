<template>
  <nav class="mc-header-nav" :class="classes">
    <!-- @slot Слот контента -->
    <slot />
  </nav>
</template>

<script>
import McHeaderNavItem from "./McHeaderNavItem"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
export default {
  name: "McHeaderNav",
  components: { McSvgIcon, McButton, McHeaderNavItem },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Отображение в строку
     *
     */
    inline: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return {
        ["mc-header-nav--inline"]: this.inline,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-header-nav {
  $block-name: &;

  margin-left: -$space_xxs;
  margin-right: -$space_xxs;

  &--inline {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
}
</style>

<docs>
  ```jsx
  let menuMain = require('@/mocks/menuMain').default;
  <div>
    <mc-header-nav>
      <template v-if="menuMain && menuMain.length">
        <mc-header-nav-item v-for="(menuMainItem, index) in menuMain" :key="`menu-main-${index}`">
          <mc-button :href="menuMainItem.href" :to="menuMainItem.to" variation="black-flat">
            <mc-svg-icon slot="icon-prepend" :name="menuMainItem.icon" />
            {{ menuMainItem.name }}
          </mc-button>
        </mc-header-nav-item>
      </template>
    </mc-header-nav>
  </div>
  ```
</docs>
