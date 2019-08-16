<template>
  <section class="mc-top-line" :class="classes">
    <div class="mc-top-line__inner">
      <div class="mc-top-line__left">
        <slot name="left"></slot>
      </div>
      <div class="mc-top-line__right">
        <slot name="right"></slot>
      </div>
    </div>
  </section>
</template>

<script>
import McBreadcrumbs from "../elements/McBreadcrumbs"
import McSvgIcon from "../elements/McSvgIcon"
import McButton from "../elements/McButton"
import McDropdown from "./McDropdown"
import McAvatar from "../elements/McAvatar/McAvatar"
import McPanel from "./McPanel"
export default {
  name: "McTopLine",
  status: "ready",
  release: "1.0.1",

  components: { McBreadcrumbs, McSvgIcon, McButton, McDropdown, McAvatar, McPanel },

  props: {
    /**
     * Бордер
     */
    border: {
      type: Boolean,
      default: false,
    },
    /**
     * Паддинг топ
     */
    padding: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        "mc-top-line--bordered": this.border,
        "mc-top-line--padding": this.padding,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-top-line {
  $block-name: &;

  position: sticky;
  top: 65px;
  background-color: transparent;
  z-index: 20;
  min-height: 56px;
  display: flex;

  &__inner {
    background-color: $color-white;
    font-family: $font-heading;
    font-weight: $weight-medium;
    padding: 8px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
  }

  &__left,
  &__right {
    @include layout-flex-fix();
    display: flex;
    align-items: center;

    &:empty {
      display: none;
    }
  }

  &__left {
    margin-right: auto;
  }

  &__right {
    margin-left: auto;
  }

  &--bordered {
    & #{$block-name}__inner {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
      border-radius: $space-xs;
    }
  }

  &--padding {
    padding-top: $space-s;
    background-color: #fff;
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
    <McTopLine>
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
    </McTopLine>

    <McTopLine border>
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
    </McTopLine>

    <McTopLine border>
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
    </McTopLine>
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
