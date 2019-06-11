<template>
  <section class="mc-header-part-right">
    <McHeaderNav>
      <McHeaderNavItem class="mc-header-part-right__chatra" v-if="chatraId">
        <McDropdown v-model="menuChatraIsOpen" position="right">
          <McButton slot="activator" variation="gray-darkest-flat" size="m-compact" rounded>
            <McSvgIcon slot="icon-append" name="live_help" />
          </McButton>

          <McPanel>
            <div id="chatra-container"></div>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem class="mc-header-part-right__apps" v-if="menuApps && menuApps.length">
        <McDropdown v-model="menuAppsIsOpen" position="right">
          <McButton slot="activator" variation="gray-darkest-flat" size="m-compact" rounded>
            <McSvgIcon slot="icon-append" name="apps" />
          </McButton>

          <McPanel>
            <McButton
              v-for="(menuAppsItem, index) in menuApps"
              v-if="menuAppsItem.isVisible"
              :key="`menu-apps-item-${index}`"
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="xl"
              :href="menuAppsItem.href"
              :to="menuAppsItem.to"
              :is-active="menuAppsItem.isActive"
            >
              <McSvgIcon slot="icon-prepend" :name="menuAppsItem.icon" size="m" />
              {{ menuAppsItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem
        class="mc-header-part-right__profile"
        v-if="menuProfile && menuProfile.length"
      >
        <McDropdown v-model="menuProfileIsOpen" position="right">
          <McButton slot="activator" variation="gray-darkest-flat" size="l-compact" rounded>
            <McAvatar :src="user ? user.avatar : null" size="m" rounded />
          </McButton>
          <McPanel>
            <McUser v-if="user" :user="user" />
            <McSeparator v-if="user" indent-bottom="xs" indent-top="xs" />
            <McButton
              v-for="(menuProfileItem, index) in menuProfile"
              v-if="menuProfileItem.isVisible"
              :key="`menu-profile-item-${index}`"
              full-width
              text-align="left"
              :variation="menuProfileItem.variation"
              size="l"
              :href="menuProfileItem.href"
              :to="menuProfileItem.to"
              exact
            >
              <McSvgIcon slot="icon-prepend" :name="menuProfileItem.icon" size="xxs" />
              {{ menuProfileItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem class="mc-header-part-right__langs" v-if="menuLangs && menuLangs.length">
        <McDropdown v-model="menuLangsIsOpen" position="right">
          <McButton slot="activator" variation="gray-darkest-flat">
            {{ menuLangs[0].name }}
            <McSvgIcon slot="icon-append" name="arrow_drop_down" />
          </McButton>

          <McPanel>
            <McButton
              v-for="(menuLangsItem, index) in menuLangs"
              :key="`menu-langs-item-${index}`"
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
              :href="menuLangsItem.href"
              :to="menuLangsItem.to"
              exact
            >
              {{ menuLangsItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem class="mc-header-part-right__burger">
        <McButton @click="handleToggleMenu" variation="gray-darkest-flat" size="m-compact" rounded>
          <McSvgIcon slot="icon-prepend" :name="value ? 'close' : 'menu'" />
        </McButton>
      </McHeaderNavItem>
    </McHeaderNav>
  </section>
</template>

<script>
import McHeaderNav from "../McHeaderNav/McHeaderNav"
import McHeaderNavItem from "../McHeaderNav/McHeaderNavItem"
import McDropdown from "../../McDropdown"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
import McPanel from "../../McPanel"
import McAvatar from "../../../elements/McAvatar"
import McUser from "../../../elements/McUser"
import McSeparator from "../../McSeparator"
export default {
  name: "McHeaderPartRight",
  status: "ready",
  release: "0.0.1",
  components: {
    McSeparator,
    McUser,
    McAvatar,
    McPanel,
    McSvgIcon,
    McButton,
    McDropdown,
    McHeaderNavItem,
    McHeaderNav,
  },
  props: {
    /**
     *  Меню приложений
     *
     */
    menuApps: {
      type: Array,
      default: null,
    },
    /**
     *  Меню пользовательской панели
     *
     */
    menuProfile: {
      type: Array,
      default: null,
    },
    /**
     *  Меню языков
     *
     */
    menuLangs: {
      type: Array,
      default: null,
    },
    /**
     *  Данные пользователя
     *
     */
    user: {
      type: Object,
      default: null,
    },
    /**
     *  Id чатры
     *
     */
    chatraId: {
      type: String,
      default: null,
    },
    /**
     *  Открыто ли мобильное меню
     *
     */
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menuLangsIsOpen: false,
      menuChatraIsOpen: false,
      menuAppsIsOpen: false,
      menuProfileIsOpen: false,
    }
  },
  mounted() {
    this.chatraId && this.initChatra()
  },
  watch: {
    $route() {
      this.closeMenu()
    },
  },
  methods: {
    handleToggleMenu() {
      this.$emit("input", !this.value)
    },
    closeMenu() {
      this.$emit("input", false)
    },
    initChatra() {
      let user = this.user
      let chatraId = this.chatraId

      let setup = {
        mode: "frame",
        injectTo: "chatra-container",
        startHidden: false,
        chatWidth: 380,
        chatHeight: 500,
      }

      if (user) {
        window.ChatraIntegration = {
          name: user.name,
          email: user.email,
        }
        setup["clientId"] = user.uid
      }

      window.ChatraSetup = setup
      ;(function(d, w, c) {
        w.ChatraID = chatraId

        var s = d.createElement("script")

        w[c] =
          w[c] ||
          function() {
            ;(w[c].q = w[c].q || []).push(arguments)
          }

        s.async = true
        s.src = "https://call.chatra.io/chatra.js"

        if (d.head) d.head.appendChild(s)
      })(document, window, "Chatra")
    },
  },
}
</script>

<style lang="scss">
.mc-header-part-right {
  $block-name: &;

  flex: 0 0 auto;
  display: flex;
  flex-wrap: nowrap;
  padding-left: $space-l;

  &__burger {
    display: none;
  }

  &__chatra {
    .mc-panel {
      width: $panel-l;
      height: $panel-xl;
      overflow: hidden;
      max-width: none;

      #chatra-container {
        height: 100%;
        padding-left: $space-xs;
        padding-right: $space-xs;
      }
    }
  }

  &__profile {
    div.mc-dropdown {
      &__body {
        top: calc(100% + 5px);
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let menuApps = require('@/mocks/menuApps').default;
  let menuProfile = require('@/mocks/menuProfile').default;
  let menuLangs = require('@/mocks/menuLangs').default;
  let authUser = require('@/mocks/authUser').default;
  <div style="position: relative; z-index: 1000; display: flex; justify-content: flex-end">
    <McHeaderPartRight
            :menu-apps="menuApps"
            :menu-profile="menuProfile"
            :menu-langs="menuLangs"
            :user="authUser"
            chatra-id="dzDw7eBbL2ramxx25"
    />
  </div>
  ```
</docs>
