<template>
  <nav class="mc-header-nav" :class="classes">
    <slot></slot>
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
    <McHeaderNav>
      <McHeaderNavItem
              v-if="menuMain && menuMain.length"
              v-for="(menuMainItem, index) in menuMain"
              :key="`menu-main-${index}`"
      >
        <McButton :href="menuMainItem.href" :to="menuMainItem.to" variation="gray-darkest-flat">
          <McSvgIcon slot="icon-prepend" :name="menuMainItem.icon" />
          {{ menuMainItem.name }}
        </McButton>
      </McHeaderNavItem>
    </McHeaderNav>
  </div>
  ```
</docs>
