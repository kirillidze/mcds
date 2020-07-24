<template>
  <section class="mc-header-part-right">
    <mc-header-nav>
      <mc-header-nav-item class="mc-header-part-right__chatra" v-if="chatraId">
        <mc-dropdown v-model="menuChatraIsOpen" position="right" :rotate-icon="false">
          <mc-button slot="activator" variation="black-flat" size="m-compact">
            <mc-svg-icon size="xs" slot="icon-append" name="chat" />
          </mc-button>

          <mc-panel>
            <div id="chatra-container"></div>
          </mc-panel>
        </mc-dropdown>
      </mc-header-nav-item>

      <mc-header-nav-item class="mc-header-part-right__userback" v-if="userbackConfig">
        <mc-button variation="black-flat" size="m-compact" @click="handleToggleUserback">
          <mc-svg-icon size="xs" slot="icon-append" name="bug_report" />
        </mc-button>
      </mc-header-nav-item>

      <mc-header-nav-item v-if="canShowApps" class="mc-header-part-right__apps">
        <mc-dropdown
          v-model="menuAppsIsOpen"
          position="right"
          :rotate-icon="false"
          @input="handleToggleMenuApp"
        >
          <mc-button slot="activator" variation="black-flat" size="m-compact">
            <mc-svg-icon slot="icon-append" name="apps" />
          </mc-button>

          <mc-panel>
            <mc-button
              v-for="(menuAppsItem, index) in menuApps"
              v-if="menuAppsItem.isVisible"
              class="mc-header-part-right__apps-btn"
              :key="`menu-apps-item-${index}`"
              full-width
              text-align="left"
              variation="black-flat"
              size="l"
              :href="menuAppsItem.href"
              :to="menuAppsItem.to"
              :is-active="menuAppsItem.isActive"
            >
              <div slot="icon-prepend" class="mc-header-part-right__apps-icon">
                <mc-avatar v-if="isCustomMenuApp" :src="menuAppsItem.icon" />
                <mc-svg-icon
                  v-else
                  slot="icon-prepend"
                  :name="menuAppsItem.icon"
                  size="xs"
                  fill="#E01C42"
                />
              </div>
              {{ menuAppsItem.name }}
            </mc-button>
          </mc-panel>
        </mc-dropdown>
      </mc-header-nav-item>

      <mc-header-nav-item
        v-if="menuProfile && menuProfile.length && user"
        class="mc-header-part-right__profile"
      >
        <mc-dropdown v-model="menuProfileIsOpen" position="right" @input="handleToggleMenuProfile">
          <mc-button
            slot="activator"
            variation="black-flat"
            size="l-compact"
            dusk="menu-user-dropdown"
            rounded
          >
            <mc-avatar slot="icon-prepend" :src="user.avatar" rounded />
          </mc-button>
          <mc-panel>
            <template>
              <div class="mc-header-part-right__user-card">
                <mc-avatar :src="user.avatar" size="l" rounded />
                <mc-title text-align="center" color="blue" size="l" line-height="s">
                  {{ user.first_name }}
                </mc-title>
                <mc-title
                  v-if="user.last_name"
                  text-align="center"
                  color="blue"
                  size="l"
                  line-height="s"
                >
                  {{ user.last_name }}
                </mc-title>
                <mc-title
                  v-if="user.email"
                  text-align="center"
                  color="gray"
                  size="s"
                  line-height="s"
                >
                  {{ user.email }}
                </mc-title>
              </div>

              <mc-separator indent-bottom="xs" indent-top="xs" />

              <mc-button
                class="mc-header-part-right__user"
                v-if="user.root_user"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                @click="typeof user.handler === 'function' ? user.handler() : ''"
              >
                <mc-avatar :src="user.root_user.avatar" rounded slot="icon-prepend" size="s" />
                <mc-title line-height="s">
                  {{ user.root_user.first_name }}
                  <template v-if="user.root_user.last_name">
                    {{ user.root_user.last_name }}
                  </template>
                </mc-title>
              </mc-button>
            </template>

            <template v-if="subUsers && subUsers.length">
              <mc-button
                class="mc-header-part-right__user"
                v-for="(subUser, index) in filteredSubUsers"
                :key="index"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                @click="typeof subUser.handler === 'function' ? subUser.handler(subUser.id) : ''"
              >
                <mc-avatar :src="subUser.avatar" rounded slot="icon-prepend" size="s" />
                <mc-title line-height="s">
                  {{ subUser.first_name }}
                  <template v-if="subUser.last_name">
                    {{ subUser.last_name }}
                  </template>
                </mc-title>
              </mc-button>

              <mc-separator indent-bottom="xs" indent-top="xs" />
            </template>

            <template v-if="userInfo && userInfo.length">
              <div class="mc-header-part-right__user-info">
                <template v-for="(info, index) in userInfo">
                  <mc-cell :key="index" class="mc-header-part-right__info">
                    <div class="mc-header-part-right__info-title" slot="title">
                      <mc-title size="xs" line-height="s" uppercase>
                        {{ info.title }}
                      </mc-title>
                      <mc-tooltip
                        v-if="info.tooltip"
                        size="s"
                        placement="top"
                        :content="info.tooltip"
                      >
                        <mc-svg-icon size="xxs" name="info" fill="rgb(102, 102, 102)" />
                      </mc-tooltip>
                    </div>
                    <mc-title color="light-green" size="l" line-height="s">
                      {{ info.value }}
                    </mc-title>
                  </mc-cell>
                  <mc-separator v-if="info.hasSeparator" :key="`${index}-separator`" />
                </template>
                <mc-separator />
              </div>
            </template>

            <mc-button
              v-for="(menuProfileItem, index) in menuProfile"
              v-if="menuProfileItem.isVisible"
              :key="`menu-profile-item-${index}`"
              class="mc-header-part-right__user-menu"
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
              <mc-svg-icon slot="icon-prepend" :name="menuProfileItem.icon" size="xs" />
              {{ menuProfileItem.name }}
            </mc-button>
          </mc-panel>
        </mc-dropdown>
      </mc-header-nav-item>

      <template v-else-if="menuProfile && menuProfile.length && !user">
        <mc-header-nav-item
          v-for="(menuProfileItem, index) in menuProfile"
          :key="`menu-profile-item-${index}`"
        >
          <mc-button
            :href="menuProfileItem.href"
            :to="menuProfileItem.to"
            :variation="menuProfileItem.variation"
          >
            {{ menuProfileItem.name }}
          </mc-button>
        </mc-header-nav-item>
      </template>

      <mc-header-nav-item class="mc-header-part-right__langs" v-if="menuLangs && menuLangs.length">
        <mc-dropdown v-model="menuLangsIsOpen" position="right">
          <mc-button slot="activator" variation="black-flat">
            {{ menuLangs[0].name }}
            <mc-svg-icon slot="icon-append" name="arrow_drop_down" />
          </mc-button>

          <mc-panel>
            <mc-button
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
            </mc-button>
          </mc-panel>
        </mc-dropdown>
      </mc-header-nav-item>

      <mc-header-nav-item class="mc-header-part-right__burger">
        <mc-button @click="handleToggleMenu" variation="black-flat" size="m-compact">
          <mc-svg-icon slot="icon-prepend" :name="value ? 'close' : 'menu'" />
        </mc-button>
      </mc-header-nav-item>
    </mc-header-nav>
  </section>
</template>

<script>
import _has from "lodash/has"
import McHeaderNav from "../McHeaderNav/McHeaderNav"
import McHeaderNavItem from "../McHeaderNav/McHeaderNavItem"
import McDropdown from "../../McDropdown"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
import McPanel from "../../McPanel"
import McAvatar from "../../../elements/McAvatar/McAvatar"
import McSeparator from "../../../elements/McSeparator"
import McTitle from "../../../elements/McTitle"
import McCell from "../../McCells/McCell"
import McTooltip from "../../../elements/McTooltip"
export default {
  name: "McHeaderPartRight",
  status: "ready",
  release: "0.0.1",
  components: {
    McCell,
    McTooltip,
    McTitle,
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
     *  Если меню приложений кастомное
     *
     */
    isCustomMenuApp: {
      type: Boolean,
      default: false,
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
     *  Userback Config
     *
     */
    userbackConfig: {
      type: Object,
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
    /**
     *  Список информации о пользлвателе
     *
     */
    userInfo: {
      type: Array,
      default: null,
    },
    /**
     *  Путь до изображения
     *
     */
    logoSrc: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menuLangsIsOpen: false,
      menuChatraIsOpen: false,
      menuAppsIsOpen: false,
      menuProfileIsOpen: false,
      menuUserbackIsOpen: false,
    }
  },
  mounted() {
    this.chatraId && this.initChatra()
    this.userbackConfig && this.initUserback()
  },
  watch: {
    $route() {
      this.closeMenu()
    },
    user() {
      this.menuProfileIsOpen = false
    },
    userbackConfig: {
      handler() {
        this.setUserbackData()
      },
      deep: true,
    },
  },
  computed: {
    filteredSubUsers() {
      return this.subUsers.filter(s => {
        return this.user.id !== s.id
      })
    },
    computedUserbackSettings() {
      return {
        language: _has(this.userbackConfig, "settings.lang")
          ? this.userbackConfig.settings.lang
          : "en",
        style: "text",
        position: "e",
        autohide: true, // не отображаем, т.к. привязка к кнопке в хедере
        logo: this.logoSrc,
        name_field: false, // не выводим так как будем передавать в кастомных даннных.
        name_field_mandatory: false, // не выводим так как будем передавать в кастомных даннных.
        email_field: true, //  выводим несмотря на то что будем передавать и  в кастомные даннные.
        email_field_mandatory: true, //  выводим несмотря на то что будем передавать и в кастомные даннные.
        comment_field: true,
        comment_field_mandatory: true,
        display_category: false,
        display_feedback: false,
        main_button_text_colour: "#FFFFFF", // hex colour
        main_button_background_colour: "#4285F4", // hex colour
        rating_type: "emoji",
        ...(_has(this.userbackConfig, "settings") ? this.userbackConfig.settings : {}),
      }
    },
    computedUserbackCustomData() {
      const user = this.user
      const data = {
        user_id: user.id,
        email: user.email || "",
        name: user.name,
      }
      if (this.user.company) {
        const company = user.company
        data.company = `${company.first_name}${company.last_name ? ` ${company.last_name}` : ""}`
      }
      return data
    },
    canShowApps() {
      return this.menuApps && this.menuApps.length && this.menuApps[0].isAuth !== null
    },
  },
  methods: {
    handleToggleMenuApp(val) {
      /**
       * Событие тоггла
       * меню приложений
       * @property {Boolean}
       */
      this.$emit("toggle-menu-app", val)
    },
    handleToggleMenuProfile(val) {
      /**
       * Событие тоггла
       * меню профиля
       * @property {Boolean}
       */
      this.$emit("toggle-menu-profile", val)
    },
    handleToggleMenu() {
      /**
       * Событие тоггла
       * бургера
       * @property {Boolean}
       */
      this.$emit("input", !this.value)
    },
    closeMenu() {
      this.value && this.$emit("input", false)
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

        const s = d.createElement("script")

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
    initUserback() {
      this.setUserbackData()
      ;(function(id) {
        const script = document.getElementById(id)
        script && script.remove()

        const container = document.getElementsByClassName("userback-button-container")[0]
        container && container.remove()

        const s = document.createElement("script")
        s.id = id
        s.async = 1
        s.src = "https://static.userback.io/widget/v1.js"
        const parent_node = document.head || document.body
        parent_node.appendChild(s)
      })("userback-sdk")
    },
    setUserbackData() {
      window.Userback = window.Userback || {}
      window.Userback.access_token = this.userbackConfig.token
      window.Userback.widget_settings = this.computedUserbackSettings
      window.Userback.categories = this.userbackConfig.categories
      if (this.user) {
        window.Userback.custom_data = this.computedUserbackCustomData
        window.Userback.email = this.user.email || ""
      }
    },
    handleToggleUserback() {
      this.menuUserbackIsOpen ? window.Userback.close() : window.Userback.open()
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

  &__apps {
    &-btn {
      padding: 0 $space-xs !important;
    }
    &-icon {
      display: flex;
      align-items: center;
      > * {
        margin-left: 0 !important;
      }
    }
    .mc-panel {
      min-width: $panel-s;
    }
  }

  &__user {
    padding: 0 $space-xs !important;
    .mc-avatar {
      flex-shrink: 0;
    }
    &-card {
      text-align: center;
      padding: $space-s $space-xs;
      .mc-avatar {
        margin-bottom: $space-s;
      }
    }

    &-menu {
      padding: 0 $space-xs !important;
    }
  }

  &__user-info {
    @include child-indent-bottom($space-s);
    padding: $space-xs 0;
    #{$block-name}__info {
      padding: 0 $space-xs;
      &-title {
        display: flex;
        align-items: center;
        @include child-indent-right($space-xxs);
        .mc-title {
          width: auto;
          margin-bottom: -$space-xxxs;
        }
      }
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
    .mc-panel {
      min-width: $panel-s;
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
  let userbackConfig = require('@/mocks/userbackConfig').default;

  <div style="position: relative; z-index: 1000; display: flex; justify-content: flex-end">
    <mc-header-part-right
      :menu-apps="menuApps"
      :menu-profile="menuProfile"
      :menu-langs="menuLangs"
      :user="authUser"
      :userback-config="userbackConfig"
      chatra-id="dzDw7eBbL2ramxx25"
    />
  </div>
  ```
</docs>
