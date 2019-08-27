<template>
  <nav class="mc-header-mobile" :class="classes">
    <mc-panel>
      <McHeaderNav :inline="false">
        <McHeaderNavItem
          v-if="menuMain && menuMain.length"
          v-for="(menuMainItem, index) in menuMain"
          :key="`menu-main-${index}`"
        >
          <McButton
            full-width
            text-align="left"
            :href="menuMainItem.href"
            :to="menuMainItem.to"
            variation="black-flat"
            size="l"
          >
            <McSvgIcon slot="icon-prepend" size="xxs" :name="menuMainItem.icon" />
            {{ menuMainItem.name }}
          </McButton>
        </McHeaderNavItem>
      </McHeaderNav>
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
  computed: {
    classes() {
      return {
        //["mc-header-mobile--inline"]: this.inline,
      }
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
