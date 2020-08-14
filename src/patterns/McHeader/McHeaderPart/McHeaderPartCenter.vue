<template>
  <section class="mc-header-part-center" v-click-outside="closeSearch" :class="classes">
    <div class="mc-header-part-center__inner">
      <mc-header-nav>
        <mc-header-nav-item v-if="menuAdditional && menuAdditional.length">
          <mc-dropdown v-model="menuAdditionalIsOpen" :rotate-icon="false">
            <mc-button slot="activator" variation="black-flat" size="m-compact" rounded>
              <mc-svg-icon slot="icon-append" name="add" />
            </mc-button>

            <mc-panel>
              <mc-button
                v-for="(menuAdditionalItem, index) in menuAdditional"
                :key="`menu-additional-item-${index}`"
                :href="menuAdditionalItem.href"
                :to="menuAdditionalItem.to"
                @click.prevent="handleClickAdd(menuAdditionalItem)"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
              >
                {{ menuAdditionalItem.name }}
              </mc-button>
            </mc-panel>
          </mc-dropdown>
        </mc-header-nav-item>

        <template v-if="menuMain && menuMain.length">
          <mc-header-nav-item v-for="(menuMainItem, index) in menuMain" :key="`menu-main-${index}`">
            <mc-button
              :href="menuMainItem.href"
              :to="menuMainItem.to"
              variation="black-flat"
              :exact="isExact"
            >
              <mc-svg-icon slot="icon-prepend" :name="menuMainItem.icon" />
              {{ menuMainItem.name }}
            </mc-button>
          </mc-header-nav-item>
        </template>

        <mc-header-nav-item v-if="menuHidden && menuHidden.length">
          <mc-dropdown position="right" v-model="menuHiddenIsOpen" :rotate-icon="false">
            <mc-button
              slot="activator"
              variation="black-flat"
              size="m-compact"
              rounded
              :class="isHiddenActive"
            >
              <mc-svg-icon slot="icon-append" name="more_horiz" />
            </mc-button>

            <mc-panel>
              <mc-button
                ref="hiddenMenuItem"
                v-for="(menuHiddenItem, index) in menuHidden"
                :key="`menu-hidden-item-${index}`"
                full-width
                text-align="left"
                variation="black-flat"
                size="l"
                :href="menuHiddenItem.href"
                :to="menuHiddenItem.to"
                :exact="isExact"
              >
                <mc-svg-icon slot="icon-prepend" :name="menuHiddenItem.icon" />
                {{ menuHiddenItem.name }}
              </mc-button>
            </mc-panel>
          </mc-dropdown>
        </mc-header-nav-item>

        <mc-header-nav-item v-if="searchable">
          <mc-button
            variation="black-flat"
            size="m-compact"
            rounded
            @click.prevent="handleBtnSearchClick"
          >
            <mc-svg-icon slot="icon-append" name="search" />
          </mc-button>
        </mc-header-nav-item>
      </mc-header-nav>

      <mc-header-search
        v-if="searchable"
        ref="inputSearch"
        class="mc-header-part-center__search"
        :value="value"
        :search-items="searchItems"
        :placeholder="searchPlaceholder"
        @search-close="closeSearch"
        @search-submit="handleSearchSubmit"
        @input="handleInput"
      />
    </div>
  </section>
</template>

<script>
import VueClickOutside from "vue-click-outside"
import McHeaderSearch from "../McHeaderSearch/McHeaderSearch"
import McHeaderNav from "../McHeaderNav/McHeaderNav"
import McHeaderNavItem from "../McHeaderNav/McHeaderNavItem"
import McDropdown from "../../McDropdown"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
import McPanel from "../../McPanel"
export default {
  name: "McHeaderPartCenter",
  status: "ready",
  release: "0.0.1",
  components: {
    McHeaderSearch,
    McPanel,
    McSvgIcon,
    McButton,
    McDropdown,
    McHeaderNavItem,
    McHeaderNav,
  },
  directives: {
    "click-outside": VueClickOutside,
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
     *  Меню при клике на +
     *
     */
    menuAdditional: {
      type: Array,
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
     *  Меню, которое скрывается в зависимости от ширины экрана
     *
     */
    menuHidden: {
      type: Array,
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
  },
  data() {
    return {
      isSearchOpen: false,
      menuAdditionalIsOpen: false,
      menuHiddenIsOpen: false,
      menuHiddenActive: false,
    }
  },

  watch: {
    menuHidden(val) {
      if (val && val.length) {
        this.$nextTick(() => {
          this.$emit("change-hidden-menu", this.$refs.hiddenMenuItem[0].$el.offsetWidth)
          this.computeMenuHiddenActive()
        })
      }
    },
    $route() {
      this.$nextTick(() => {
        this.computeMenuHiddenActive()
      })
    },
  },

  computed: {
    classes() {
      return {
        ["mc-header-part-center--search-is-open"]: this.isSearchOpen,
      }
    },
    isHiddenActive() {
      return {
        ["mc-header-part-center--is-used"]: this.menuHiddenActive,
      }
    },
    isExact() {
      if (!this.$route || !this.$route.name) return false
      const hasIndex = this.$route.name.includes("index")
      return hasIndex && !this.$route.name.includes("id")
    },
  },

  methods: {
    computeMenuHiddenActive() {
      if (this.$refs.hiddenMenuItem) {
        let x = this.$refs.hiddenMenuItem.find(item => {
          return item.$el.className.split(" ").find(it => {
            return it === "nuxt-link-exact-active"
          })
        })
        this.menuHiddenActive = !!x
      }
    },
    emitInput(value) {
      this.$emit("input", value)
    },

    handleInput(value) {
      this.emitInput(value)
    },

    handleClickAdd(item) {
      this.$emit("add-entity", item)
    },

    handleSearchSubmit() {
      if (this.value) {
        this.$emit("search-submit")
        this.closeSearch()
      }
    },

    closeSearch() {
      if (this.isSearchOpen) {
        this.isSearchOpen = false
        this.emitInput(null)
        this.setInputBlur("inputSearch")
      }
    },

    openSearch() {
      this.isSearchOpen = true
      setTimeout(() => {
        this.setInputFocus("inputSearch")
      }, 200) // visibility hidden fix
    },

    handleBtnSearchClick() {
      this.openSearch()
    },

    setInputFocus(name) {
      this.$refs[name] && this.$refs[name].getInput().focus()
    },
    setInputBlur(name) {
      this.$refs[name] && this.$refs[name].getInput().blur()
    },
  },
}
</script>

<style lang="scss">
.mc-header-part-center {
  $block-name: &;

  position: relative;
  flex: 0 0 auto;
  display: flex;
  flex-wrap: nowrap;

  &__inner {
    position: relative;
    height: $tappable-element-l;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    .mc-button {
      &--is-active,
      &.nuxt-link-active {
        pointer-events: auto;
      }
    }

    @media #{$media-query-l-down} {
      .mc-header-nav-item {
        > a.mc-button {
          .mc-button__text {
            display: none !important;
          }
          .mc-svg-icon {
            margin: 0;
          }
        }
      }
    }
  }

  &__search {
    z-index: -1;
    opacity: 0;
    visibility: hidden;
  }

  &--search-is-open {
    #{$block-name} {
      &__search {
        z-index: 2;
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let menuAdditional = require('@/mocks/menuAdditional').default;
  let menuMain = require('@/mocks/menuMain').default;
  let searchResult = require('@/mocks/searchResult').default;
  let search = null
  let eventTest = (val) => alert(val)
  <div style="position: relative; z-index: 1000;">
    <mc-header-part-center
        v-model="search"
        :menu-additional="menuAdditional"
        :menu-main="menuMain.slice(5)"
        :search-items="searchResult"
        search-placeholder="Начните вводить"
        searchable
        @search-submit="eventTest('Search submit')"
        @click-add-entity="(val) => eventTest('itemValue: ' + val.value)"
    />
  </div>
  ```
</docs>
