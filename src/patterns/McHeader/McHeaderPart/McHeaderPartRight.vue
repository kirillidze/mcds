<template>
  <section class="mc-header-part-right">
    <McHeaderNav>
      <McHeaderNavItem class="mc-header-part-right__chatra" v-if="chatraId">
        <McDropdown v-model="menuChatraIsOpen" position="right" :rotate-icon="false">
          <McButton slot="activator" variation="black-flat" size="m-compact" rounded>
            <McSvgIcon size="xs" slot="icon-append" name="chat" />
          </McButton>

          <McPanel>
            <div id="chatra-container"></div>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem
        class="mc-header-part-right__apps"
        v-if="menuApps && menuApps.length && menuApps[0].isAuth !== null"
      >
        <McDropdown v-model="menuAppsIsOpen" position="right" :rotate-icon="false">
          <McButton slot="activator" variation="black-flat" size="m-compact" rounded>
            <McSvgIcon slot="icon-append" name="apps" />
          </McButton>

          <McPanel>
            <McButton
              v-for="(menuAppsItem, index) in menuApps"
              v-if="menuAppsItem.isVisible"
              :key="`menu-apps-item-${index}`"
              full-width
              text-align="left"
              variation="black-flat"
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
        v-if="menuProfile && menuProfile.length && user"
      >
        <McDropdown v-model="menuProfileIsOpen" position="right">
          <McButton
            slot="activator"
            variation="black-flat"
            size="l-compact"
            dusk="menu-user-dropdown"
            rounded
          >
            <McAvatar slot="icon-prepend" :src="user.avatar" size="m" rounded />
          </McButton>
          <McPanel>
            <template>
              <McButton
                class="mc-header-part-right__user"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                :is-active="true"
              >
                <McPreview>
                  <McAvatar :src="user.avatar" rounded slot="left" />
                  <McTitle color="blue" :level="3" size="l" slot="top">
                    {{ user.first_name }} {{ user.last_name }}
                  </McTitle>
                  <McTitle v-if="user.email" color="gray" size="m" slot="bottom">
                    {{ user.email }}
                  </McTitle>
                </McPreview>
              </McButton>
              <McButton
                class="mc-header-part-right__user"
                v-if="user.root_user"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                @click="typeof user.handler === 'function' ? user.handler() : ''"
              >
                <McPreview>
                  <McAvatar :src="user.root_user.avatar" rounded slot="left" />
                  <McTitle :level="3" size="l" slot="top">
                    {{ user.root_user.first_name }} {{ user.root_user.last_name }}
                  </McTitle>
                  <McTitle color="gray" size="m" slot="bottom">
                    {{ user.root_user.email }}
                  </McTitle>
                </McPreview>
              </McButton>
            </template>

            <template v-if="subUsers && subUsers.length">
              <McButton
                class="mc-header-part-right__user"
                v-for="(subUser, index) in filteredSubUsers"
                :key="index"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                @click="typeof subUser.handler === 'function' ? subUser.handler(subUser.id) : ''"
              >
                <McPreview>
                  <McAvatar :src="subUser.avatar" rounded slot="left" />
                  <McTitle :level="3" size="l" slot="top">
                    {{ subUser.first_name }} {{ subUser.last_name }}
                  </McTitle>
                </McPreview>
              </McButton>
            </template>

            <McSeparator indent-bottom="xs" indent-top="xs" />
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
              @click="
                typeof menuProfileItem.handler === 'function' ? menuProfileItem.handler() : ''
              "
              exact
              :dusk="menuProfileItem.dusk"
            >
              <McSvgIcon slot="icon-prepend" :name="menuProfileItem.icon" size="xxs" />
              {{ menuProfileItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>
      <McHeaderNavItem
        v-else-if="menuProfile && menuProfile.length && !user"
        v-for="(menuProfileItem, index) in menuProfile"
        :key="`menu-profile-item-${index}`"
      >
        <McButton
          :href="menuProfileItem.href"
          :to="menuProfileItem.to"
          :variation="menuProfileItem.variation"
          size="m"
        >
          {{ menuProfileItem.name }}
        </McButton>
      </McHeaderNavItem>

      <McHeaderNavItem class="mc-header-part-right__langs" v-if="menuLangs && menuLangs.length">
        <McDropdown v-model="menuLangsIsOpen" position="right">
          <McButton slot="activator" variation="black-flat" @click="">
            {{ menuLangs[0].name }}
            <McSvgIcon slot="icon-append" name="arrow_drop_down" />
          </McButton>

          <McPanel>
            <McButton
              v-for="(menuLangsItem, index) in menuLangs"
              :key="`menu-langs-item-${index}`"
              full-width
              exact
              text-align="left"
              variation="black-flat"
              size="l"
              :href="menuLangsItem.href"
              :to="menuLangsItem.to"
            >
              {{ menuLangsItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem class="mc-header-part-right__burger">
        <McButton @click="handleToggleMenu" variation="black-flat" size="m-compact" rounded>
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
import McAvatar from "../../../elements/McAvatar/McAvatar"
import McSeparator from "../../../elements/McSeparator"
import McPreview from "../../McPreview"
import McTitle from "../../../elements/McTitle"
export default {
  name: "McHeaderPartRight",
  status: "ready",
  release: "0.0.1",
  components: {
    McTitle,
    McPreview,
    McSeparator,
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
     *  Другие доступные пользователи
     *
     */
    subUsers: {
      type: Array,
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
    user() {
      this.menuProfileIsOpen = false
    },
  },
  computed: {
    filteredSubUsers() {
      return this.subUsers.filter(s => {
        return this.user.id !== s.id
      })
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

  &__user {
    height: auto;

    .mc-preview {
      padding: $space-xs 0;
      &__left {
        margin-right: $space-xs;
      }
    }

    .mc-avatar {
      margin: 0 !important;
    }
  }

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
