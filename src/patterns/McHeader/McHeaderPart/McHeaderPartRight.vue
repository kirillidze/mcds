<template>
  <section class="mc-header-part-right">
    <McHeaderNav>
      <McHeaderNavItem class="mc-header-part-right__chatra" v-if="chatraId">
        <McDropdown v-model="menuChatraIsOpen" position="right" :rotate-icon="false">
          <McButton slot="activator" variation="black-flat" size="m-compact">
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
          <McButton slot="activator" variation="black-flat" size="m-compact">
            <McSvgIcon slot="icon-append" name="apps" />
          </McButton>

          <McPanel>
            <McButton
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
                <McAvatar v-if="isCustomMenuApp" :src="menuAppsItem.icon" />
                <McSvgIcon
                  v-else
                  slot="icon-prepend"
                  :name="menuAppsItem.icon"
                  size="xs"
                  fill="#E01C42"
                />
              </div>
              {{ menuAppsItem.name }}
            </McButton>
          </McPanel>
        </McDropdown>
      </McHeaderNavItem>

      <McHeaderNavItem
        v-if="menuProfile && menuProfile.length && user"
        class="mc-header-part-right__profile"
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
              <div class="mc-header-part-right__user-card">
                <McAvatar :src="user.avatar" size="l" rounded />
                <McTitle text-align="center" color="blue" size="l" line-height="s">
                  {{ user.first_name }}
                </McTitle>
                <McTitle
                  v-if="user.last_name"
                  text-align="center"
                  color="blue"
                  size="l"
                  line-height="s"
                >
                  {{ user.last_name }}
                </McTitle>
                <McTitle
                  v-if="user.email"
                  text-align="center"
                  color="gray"
                  size="s"
                  line-height="s"
                >
                  {{ user.email }}
                </McTitle>
              </div>

              <McSeparator indent-bottom="xs" indent-top="xs" />

              <McButton
                class="mc-header-part-right__user"
                v-if="user.root_user"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                @click="typeof user.handler === 'function' ? user.handler() : ''"
              >
                <McAvatar :src="user.root_user.avatar" rounded slot="icon-prepend" size="s" />
                <McTitle line-height="s">
                  {{ user.root_user.first_name }}
                  <template v-if="user.root_user.last_name">
                    {{ user.root_user.last_name }}
                  </template>
                </McTitle>
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
                <McAvatar :src="subUser.avatar" rounded slot="icon-prepend" size="s" />
                <McTitle line-height="s">
                  {{ subUser.first_name }}
                  <template v-if="subUser.last_name">
                    {{ subUser.last_name }}
                  </template>
                </McTitle>
              </McButton>

              <McSeparator indent-bottom="xs" indent-top="xs" />
            </template>

            <template v-if="userInfo && userInfo.length">
              <div class="mc-header-part-right__user-info">
                <template v-for="(info, index) in userInfo">
                  <McCell :key="index" class="mc-header-part-right__info">
                    <div class="mc-header-part-right__info-title" slot="title">
                      <McTitle size="xs" line-height="s" uppercase>
                        {{ info.title }}
                      </McTitle>
                      <McTooltip
                        v-if="info.tooltip"
                        size="s"
                        placement="top"
                        :content="info.tooltip"
                      >
                        <McSvgIcon size="xxs" name="info" fill="rgb(102, 102, 102)" />
                      </McTooltip>
                    </div>
                    <McTitle color="light-green" size="l" line-height="s">
                      {{ info.value }}
                    </McTitle>
                  </McCell>
                  <McSeparator v-if="info.hasSeparator" />
                </template>
                <McSeparator />
              </div>
            </template>

            <McButton
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
              <McSvgIcon slot="icon-prepend" :name="menuProfileItem.icon" size="xs" />
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
          <McButton slot="activator" variation="black-flat">
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
        <McButton @click="handleToggleMenu" variation="black-flat" size="m-compact">
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
