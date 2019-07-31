<template>
  <div class="mc-toolbar" :class="classes">
    <div class="mc-toolbar__inner">
      <div class="mc-toolbar__left">
        <slot name="left"></slot>
      </div>
      <div class="mc-toolbar__right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import McBreadcrumbs from "./McBreadcrumbs"
import McSvgIcon from "./McSvgIcon"
import McButton from "./McButton"
import McDropdown from "../patterns/McDropdown"
import McAvatar from "./McAvatar/McAvatar"
export default {
  name: "McToolbar",
  status: "ready",
  release: "1.0.1",

  components: { McBreadcrumbs, McSvgIcon, McButton, McDropdown, McAvatar },

  props: {
    /**
     * Бордер
     */
    border: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "mc-toolbar--bordered": this.border,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-toolbar {
  $block-name: &;

  position: sticky;
  top: 65px;
  padding-top: 16px;
  background-color: transparent;
  z-index: 5;

  &__inner {
    background-color: $color-white;
    font-family: $font-heading;
    font-weight: $weight-medium;
    padding: 8px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__left {
    min-width: 0;
  }

  &__right {
    flex: 0 0 auto;
  }

  &--bordered {
    & #{$block-name}__inner {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
      border-radius: $space-xs;
    }
  }
}
</style>

<docs>
  ```jsx
  let dropIsOpen = false
  let dropIsOpen2 = false
  <div>
  </div>

  <div>
    <McToolbar>
      <template slot="left">
        <McBreadcrumbs active="Dashboard" :nuxt="false" :items="[
          {title: 'Рейтинг каналов', href: 'javascript:void(0)'},
          {title: 'Ed Sheeran', href: 'javascript:void(0)'},
          {title: 'Владилен', href: 'javascript:void(0)'},
        ]"/>
      </template>
      <template slot="right">
        <McButton variation="gray-darkest-flat" size="m-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
        <McButton variation="primary-link" size="m-compact">
          Ссылка
        </McButton>
        <McButton variation="gray-darkest-flat" size="m-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
        <McButton variation="gray-darkest-flat" size="m-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
      </template>
    </McToolbar>

    <McToolbar border>
      <template slot="left">
        <McBreadcrumbs active="Dashboard" :nuxt="false" :items="[
          {title: 'Рейтинг каналов', href: 'javascript:void(0)'},
          {title: 'Ed Sheeran', href: 'javascript:void(0)'},
          {title: 'Владилен', href: 'javascript:void(0)'},
        ]"/>
      </template>
      <template slot="right">
        <McButton variation="gray-darkest-flat" size="l-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
        <McButton variation="primary-link" size="m-compact">
          Ссылка
        </McButton>
        <McButton variation="gray-darkest-flat" size="l-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
        <McButton variation="gray-darkest-flat" size="l-compact">
          <McSvgIcon slot="icon-append" name="delete"/>
        </McButton>
      </template>
    </McToolbar>

    <McToolbar border>
      <template slot="left">
        <McDropdown v-model="dropIsOpen">
          <McButton
            slot="activator"
            variation="gray-darkest-flat"
            size="l"
          >
            <McAvatar slot="icon-prepend" rounded size="s"></McAvatar>
            Владилен
          </McButton>
          <McPanel>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="left"
                    variation="gray-darkest-flat"
                    size="l"
            >
              <McSvgIcon slot="icon-prepend" name="account_circle" size="xxs"/>
              Профиль
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="left"
                    variation="gray-darkest-flat"
                    size="l"
            >
              <McSvgIcon slot="icon-prepend" name="swap_horizontal_circle" size="xxs"/>
              Транзакции
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="left"
                    variation="gray-darkest-flat"
                    size="l"
            >
              <McSvgIcon slot="icon-prepend" name="settings" size="xxs"/>
              Безопасность
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="left"
                    variation="danger-flat"
                    size="l"
            >
              <McSvgIcon slot="icon-prepend" name="exit_to_app" size="xxs"/>
              Выйти
            </McButton>
          </McPanel>
        </McDropdown>
      </template>
      <template slot="right">
        <McDropdown v-model="dropIsOpen2" position="right">
          <McButton slot="activator"
                    variation="gray-darkest-flat"
                    size="m-compact"
          >
            <McSvgIcon slot="icon-append" name="sort_list"/>
          </McButton>
          <McPanel>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="right"
                    variation="gray-darkest-flat"
                    size="l"
            >
              Профиль
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="right"
                    variation="gray-darkest-flat"
                    size="l"
            >
              Транзакции
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="right"
                    variation="gray-darkest-flat"
                    size="l"
            >
              Безопасность
            </McButton>
            <McButton
                    href="#"
                    @click.prevent
                    full-width
                    text-align="right"
                    variation="danger-flat"
                    size="l"
            >
              Выйти
            </McButton>
          </McPanel>
        </McDropdown>


        <McButton variation="gray-darkest-flat" size="m-compact">
          <McSvgIcon slot="icon-append" name="filter_list"/>
        </McButton>
      </template>
    </McToolbar>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
  ```
</docs>
