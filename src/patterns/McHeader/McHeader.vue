<template>
  <div ref="header" class="mc-header" :class="classes">
    <div class="mc-header__notifications">
      <McHeaderNotifications
        :notifications-text-accept="notificationsTextAccept"
        :notifications-text-reject="notificationsTextReject"
        :notifications="notifications"
        @click-accept="handleClickAccept"
        @click-reject="handleClickReject"
      />
    </div>
    <div class="mc-header__inner">
      <mc-header-part-left
        ref="headerLeft"
        :logo-title="logoTitle"
        :logo-src="logoSrc"
        :logo-href="logoHref"
        :logo-to="logoTo"
      />
      <mc-header-part-center
        ref="headerCenter"
        :value="value"
        :menu-additional="menuAdditional"
        :menu-main="menuMainMutable"
        :menu-hidden="menuHidden"
        :searchable="searchable"
        :search-items="searchItems"
        :search-placeholder="searchPlaceholder"
        :enableExact="enableExact"
        @change-hidden-menu="handleChangeHiddenMenu"
        @add-entity="handleAddEntity"
        @input="handleInput"
        @search-submit="handleSearchSubmit"
      />
      <mc-header-part-right
        v-model="mmIsOpen"
        :is-custom-menu-app="isCustomMenuApp"
        ref="headerRight"
        :menu-apps="menuApps"
        :menu-profile="menuProfile"
        :menu-langs="menuLangs"
        :user="user"
        :sub-users="subUsers"
        :chatra-id="chatraId"
      />
      <McHeaderMobile v-if="menuMain && menuMain.length" :menu-main="menuMain" />
    </div>
  </div>
</template>

<script>
import _throttle from "lodash/throttle"
import _cloneDeep from "lodash/cloneDeep"
import _concat from "lodash/concat"
import McHeaderPartLeft from "./McHeaderPart/McHeaderPartLeft"
import McHeaderPartRight from "./McHeaderPart/McHeaderPartRight"
import McHeaderPartCenter from "./McHeaderPart/McHeaderPartCenter"
import McHeaderMobile from "./McHeaderMobile/McHeaderMobile"
import McHeaderNotifications from "./McHeaderNotifications/McHeaderNotifications"
export default {
  name: "McHeader",
  status: "ready",
  release: "0.0.1",
  components: {
    McHeaderPartCenter,
    McHeaderPartRight,
    McHeaderPartLeft,
    McHeaderNotifications,
    McHeaderMobile,
  },
  props: {
    /**
     *  Строка поиска
     *
     */
    value: {
      type: String,
      default: null,
    },
    /**
     *  Название сервиса
     *
     */
    logoTitle: {
      type: String,
      default: "Mediacube",
    },
    /**
     *  Путь до изображения
     *
     */
    logoSrc: {
      type: String,
      default: "/icons/mediacube.svg",
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    logoHref: {
      default: null,
    },
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    logoTo: {
      default: null,
    },
    /**
     *  Центральное меню
     *
     */
    menuMain: {
      type: Array,
      default: null,
    },
    /**
     *  Меню при клике на +
     *
     */
    menuAdditional: {
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
     *  Если есть поиск
     *
     */
    searchable: {
      type: Boolean,
      default: false,
    },
    /**
     *  Результаты поиска
     *
     */
    searchItems: {
      type: Array,
      default: null,
    },
    /**
     *  Плейсхолдер поиска
     *
     */
    searchPlaceholder: {
      type: String,
      default: null,
    },
    /**
     *  Уведомления
     *
     */
    notifications: {
      type: Array,
      default: null,
    },
    /**
     *  Тест кнопки подтверждения нотификации
     *
     */
    notificationsTextAccept: {
      type: String,
      default: null,
    },
    /**
     *  Тест кнопки отмены нотификации
     *
     */
    notificationsTextReject: {
      type: String,
      default: null,
    },
    /**
     *  Если есть мобильное меню
     *
     */
    hasMobileMenu: {
      type: Boolean,
      default: false,
    },
    /**
     *  Min width, при котором отображается центральное меню
     *
     */
    mediaMinWidth: {
      type: Number,
      default: 1200,
    },
    /**
     *  Вклюсить exact
     *
     */
    enableExact: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headerWidth: 0,
      headerLeftWidth: 0,
      headerCenterWidth: 0,
      headerRightWidth: 0,
      menuHidden: [],
      menuHiddenItemWidth: 0,
      menuMainMutable: [],
      mmIsOn: false,
      mmIsOpen: false,
      windowWidth: 0,
      canUpdateMenuItem: true,
    }
  },
  computed: {
    classes() {
      return {
        "mc-header--mm-is-on": this.mmIsOn,
        "mc-header--mm-is-open": this.mmIsOpen,
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.initThrottleResizeEvent)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initThrottleResizeEvent)
  },

  created() {
    this.menuMainMutable = _cloneDeep(this.menuMain)
  },

  mounted() {
    this.setSizes()
  },

  watch: {
    windowWidth(val) {
      if (this.hasMobileMenu) {
        val >= this.mediaMinWidth ? this.initMainMenu() : this.destroyMainMenu()
      } else {
        this.initMainMenu()
      }
    },
    menuMain(val, prevVal) {
      if (!val || JSON.stringify(val) === JSON.stringify(prevVal)) return
      if (!this.mmIsOn) {
        this.updateMainMenu(val)
      }
    },
  },

  methods: {
    initThrottleResizeEvent: _throttle(function() {
      this.setSizes()
    }, 200),

    setSizes() {
      this.windowWidth = window.innerWidth
    },

    checkOverflow(reservedPlace = 0) {
      this.getSizes()
      return (
        this.headerWidth <=
        this.headerLeftWidth + this.headerCenterWidth + this.headerRightWidth + reservedPlace
      )
    },

    getSizes() {
      this.headerWidth = this.$refs.header ? Math.floor(this.$refs.header.clientWidth) : 0
      this.headerLeftWidth = this.$refs.headerLeft
        ? Math.ceil(this.$refs.headerLeft.$el.clientWidth)
        : 0
      this.headerCenterWidth = this.$refs.headerCenter
        ? Math.ceil(this.$refs.headerCenter.$el.clientWidth)
        : 0
      this.headerRightWidth = this.$refs.headerRight
        ? Math.ceil(this.$refs.headerRight.$el.clientWidth)
        : 0
    },

    moveMenuItem() {
      if (this.menuMainMutable && this.menuMainMutable.length && this.checkOverflow()) {
        this.menuHidden = _concat(this.menuMainMutable.pop(), this.menuHidden)
        this.canUpdateMenuItem &&
          this.$nextTick(() => {
            this.moveMenuItem()
          })
      }

      if (this.menuHidden.length && !this.checkOverflow(this.menuHiddenItemWidth)) {
        this.menuMainMutable = _concat(this.menuMainMutable, this.menuHidden.splice(0, 1))
        this.canUpdateMenuItem &&
          this.$nextTick(() => {
            this.moveMenuItem()
          })
      }

      if (!this.checkOverflow(100)) {
        this.canUpdateMenuItem = false
      }
    },

    updateMainMenu(val) {
      this.menuMainMutable = []
      this.menuHidden = []
      this.menuMainMutable = val
      this.$nextTick(() => this.moveMenuItem())
    },

    initMainMenu() {
      this.mmIsOn = false
      this.canUpdateMenuItem = true
      this.$nextTick(() => this.moveMenuItem())
    },

    destroyMainMenu() {
      this.mmIsOn = true
    },

    handleChangeHiddenMenu(val) {
      this.menuHiddenItemWidth = Math.ceil(val)
    },

    handleAddEntity(item) {
      this.$emit("click-add-entity", item)
    },

    handleInput(value) {
      this.$emit("input", value)
    },

    handleSearchSubmit() {
      this.$emit("search-submit")
    },

    handleClickAccept(id) {
      this.$emit("click-accept", id)
    },
    handleClickReject(id) {
      this.$emit("click-reject", id)
    },
  },
}
</script>

<style lang="scss">
.mc-header {
  $block-name: &;

  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  font-family: $font-heading;
  margin-left: $space-s;
  margin-right: $space-s;
  z-index: $z-index-header;
  background-color: $color-white;

  &::after {
    @include position(absolute, 0);
    @include pseudo();
    top: auto;
    border-bottom: 1px solid $color-outline-gray;
    margin-left: -$space-s;
    margin-right: -$space-s;
  }

  &__inner {
    padding-bottom: $space-xxxs;
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: $height-footer + 1;
    justify-content: space-between;

    &::before,
    &::after {
      position: absolute;
      display: block;
      top: 0;
      content: "";
      width: $space-s;
      height: $height-footer - 1;
      background-color: $color-white;
      z-index: 1;
    }

    &::before {
      left: -$space-s;
    }

    &::after {
      right: -$space-s;
    }
  }

  &__notifications {
    margin-left: -$space-s;
    margin-right: -$space-s;

    &:empty {
      display: none;
    }
  }

  .mc-dropdown {
    &__body {
      top: calc(100% + 13px);
    }
  }

  .mc-panel {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: $shadow_m;
  }

  .mc-header-mobile {
    display: none;
  }

  &--mm-is-on {
    margin-left: $space-xs + 2;
    margin-right: $space-xs + 2;

    &::after {
      margin-left: -($space-xs + 2);
      margin-right: -($space-xs + 2);
    }

    #{$block-name} {
      &__notifications {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10000;
        margin-left: 0;
        margin-right: 0;
      }

      &__inner {
        &::before,
        &::after {
          width: $space-xs + 2;
        }

        &::before {
          left: -($space-xs + 2);
        }

        &::after {
          right: -($space-xs + 2);
        }
      }
    }

    .mc-header-notifications-item {
      padding: $space-s $size-m $size-m;
      border-radius: $radius-l $radius-l 0 0;

      &__inner {
        display: block;
      }

      &__text {
        display: block;
        max-width: none;
        overflow: visible;
        text-overflow: clip;
        white-space: normal;
        word-wrap: normal;
        margin-right: 0;
      }

      &__controls {
        margin-top: $space-m;
      }
    }

    .mc-header-part-left {
      padding-right: $space-xxs;
    }

    .mc-header-part-center {
      display: none;
    }

    .mc-header-part-right {
      padding-left: $space-xxs;
      margin-left: auto;

      &__burger {
        display: block;
      }

      .mc-header-nav-item:not(.mc-header-part-right__burger) {
        display: none;
      }
    }

    .mc-dropdown {
      position: static;

      &__body {
        top: 100% !important;
        left: -($space-xs + 2);
        right: -($space-xs + 2);
      }
    }

    .mc-panel {
      max-width: none;
      max-height: calc(100vh - #{$height-footer + 1});
      overflow-y: auto;
      width: 100%;
    }

    .mc-header-nav-item {
      position: static;
    }

    .mc-header-mobile {
      display: block;
      position: absolute;
      z-index: 1;
      top: 100%;
      left: -($space-xs + 2);
      right: -($space-xs + 2);
      height: 0;
      overflow: hidden;
      margin: 0;
      background-color: transparent;
      opacity: 0;
      visibility: hidden;
      transform: translateY($space-xs + 2);
      transition: opacity $duration-quickly, transform $duration-quickly;
    }

    &#{$block-name}--mm-is-open {
      .mc-header-part-right {
        .mc-header-nav-item {
          display: block;
        }
      }

      .mc-header-part-left {
        display: none;
      }

      .mc-header-mobile {
        height: auto;
        visibility: visible;
        opacity: 1;
        overflow: visible;
        transform: translateY(0);
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let menuAdditional = require('@/mocks/menuAdditional').default;
  let menuMain = require('@/mocks/menuMain').default;
  let menuApps = require('@/mocks/menuApps').default;
  let menuProfile = require('@/mocks/menuProfile').default;
  let menuLangs = require('@/mocks/menuLangs').default;
  let authUser = require('@/mocks/authUser').default;
  let subUsers = require('@/mocks/subUsers').default;
  let searchResult = require('@/mocks/searchResult').default;
  let notifications = require('@/mocks/notifications').default;
  let search = null
  let eventTest = (val) => alert(val)
  <div>
    <McHeader
            v-model="search"
            logo-title="Mediacube"
            logo-src="/icons/mediacube.svg"
            logo-href="javascript:void(0);"
            :notifications="notifications"
            notifications-text-accept="Принять"
            notifications-text-reject="Отклонить"
            :menu-additional="menuAdditional"
            :menu-main="menuMain"
            :menu-apps="menuApps"
            :menu-profile="menuProfile"
            :menu-langs="menuLangs"
            :user="authUser"
            :sub-users="subUsers"
            :search-items="searchResult"
            search-placeholder="Начните вводить"
            chatra-id="dzDw7eBbL2ramxx25"
            searchable
            hasMobileMenu
            @search-submit="eventTest('Search submit')"
            @click-add-entity="(val) => eventTest('itemValue: ' + val.value)"
            @click-accept="(id) => eventTest('id: ' + id)"
            @click-reject="(id) => eventTest('id: ' + id)"
    />
  </div>
  ```
</docs>
