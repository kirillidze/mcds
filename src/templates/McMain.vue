<template>
  <div class="mc-main" :class="classes">
    <div class="mc-main__inner">
      <div class="mc-main__content">
        <slot name="header"></slot>

        <main class="mc-main__main">
          <slot></slot>
        </main>
      </div>
    </div>
    <slot name="includes" />
  </div>
</template>

<script>
import McHeader from "../patterns/McHeader/McHeader"
export default {
  name: "McMain",
  components: { McHeader },
  status: "ready",
  release: "0.0.1",
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-main {
  $block-name: &;

  display: flex;
  flex-direction: column;
  min-height: 100%;

  position: relative;

  &__inner {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__main {
  }

  &__footer-wrapper {
    flex-shrink: 0;
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
  let searchResult = require('@/mocks/searchResult').default;
  let notifications = require('@/mocks/notifications').default;
  let search = null
  let eventTest = (val) => alert(val)
  <div>
      <McMain>
        <McHeader
                slot="header"
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
      </McMain>
  </div>
  ```
</docs>
