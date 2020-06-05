<template>
  <nav class="mc-header-mobile">
    <mc-panel>
      <mc-header-nav :inline="false">
        <template v-if="menuMain && menuMain.length">
          <mc-header-nav-item v-for="(menuMainItem, index) in menuMain" :key="`menu-main-${index}`">
            <mc-button
              full-width
              text-align="left"
              :href="menuMainItem.href"
              :to="menuMainItem.to"
              variation="black-flat"
              size="l"
            >
              <mc-svg-icon slot="icon-prepend" size="xxs" :name="menuMainItem.icon" />
              {{ menuMainItem.name }}
            </mc-button>
          </mc-header-nav-item>
        </template>
      </mc-header-nav>
    </mc-panel>
  </nav>
</template>

<script>
import McPanel from "../../McPanel"
import McHeaderNav from "../McHeaderNav/McHeaderNav"
import McHeaderNavItem from "../McHeaderNav/McHeaderNavItem"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
export default {
  name: "McHeaderMobile",
  components: { McSvgIcon, McButton, McHeaderNavItem, McHeaderNav, McPanel },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Центральное меню
     *
     */
    menuMain: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.mc-header-mobile {
  $block-name: &;

  .mc-panel {
    max-width: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>

<docs>
  ```jsx
  let menuMain = require('@/mocks/menuMain').default;
  <div>
    <McHeaderMobile :menu-main="menuMain"/>
  </div>
  ```
</docs>
