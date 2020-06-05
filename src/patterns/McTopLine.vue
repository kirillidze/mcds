<template>
  <section class="mc-top-line" :class="classes">
    <div class="mc-top-line__inner">
      <div class="mc-top-line__left">
        <!-- @slot Слот слева -->
        <slot name="left" />
      </div>
      <div class="mc-top-line__right">
        <!-- @slot Слот справа -->
        <slot name="right" />
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
    padding: $space-xs;
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
  const breadcrumbsItems = [
    {title: 'Рейтинг каналов', href: 'javascript:void(0)'},
    {title: 'Ed Sheeran', href: 'javascript:void(0)'},
    {title: 'Владилен', href: 'javascript:void(0)'},
  ]
  <div>
  </div>

  <div>
    <mc-top-line>
      <template slot="left">
        <mc-breadcrumbs active="Dashboard" :nuxt="false" :items="breadcrumbsItems"/>
      </template>
      <template slot="right">
        <mc-button variation="black-flat" size="m-compact">
          <mc-svg-icon slot="icon-append" name="create"/>
        </mc-button>
        <mc-button variation="blue-link" size="m-compact">
          Ссылка
        </mc-button>
        <mc-button variation="black-flat" size="m-compact">
          <mc-svg-icon slot="icon-append" name="delete"/>
        </mc-button>
        <mc-button variation="black-flat" size="m-compact">
          <mc-svg-icon slot="icon-append" name="add"/>
        </mc-button>
      </template>
    </mc-top-line>

    <mc-top-line border>
      <template slot="left">
        <mc-breadcrumbs active="Dashboard" :nuxt="false" :items="breadcrumbsItems"/>
      </template>
      <template slot="right">
        <mc-button variation="black-flat" size="l-compact">
          <mc-svg-icon slot="icon-append" name="create"/>
        </mc-button>
        <mc-button variation="blue-link" size="m-compact">
          Ссылка
        </mc-button>
        <mc-button variation="black-flat" size="l-compact">
          <mc-svg-icon slot="icon-append" name="delete"/>
        </mc-button>
        <mc-button variation="black-flat" size="l-compact">
          <mc-svg-icon slot="icon-append" name="add"/>
        </mc-button>
      </template>
    </mc-top-line>

    <mc-top-line border>
      <template slot="left">
        <mc-dropdown v-model="dropIsOpen">
          <mc-button slot="activator" variation="black-flat" size="l">
            <mc-avatar slot="icon-prepend" rounded size="s" />
            Владилен
          </mc-button>
          <mc-panel>
            <mc-button href="#" full-width text-align="left" variation="black-flat" size="l" @click.prevent>
              <mc-svg-icon slot="icon-prepend" name="account_circle" size="xxs"/>
              Профиль
            </mc-button>
            <mc-button href="#" full-width text-align="left" variation="black-flat" size="l" @click.prevent>
              <mc-svg-icon slot="icon-prepend" name="swap_horizontal_circle" size="xxs"/>
              Транзакции
            </mc-button>
            <mc-button href="#" full-width text-align="left" variation="black-flat" size="l" @click.prevent>
              <mc-svg-icon slot="icon-prepend" name="settings" size="xxs"/>
              Безопасность
            </mc-button>
            <mc-button href="#" full-width text-align="left" variation="red-flat" size="l" @click.prevent>
              <mc-svg-icon slot="icon-prepend" name="exit_to_app" size="xxs"/>
              Выйти
            </mc-button>
          </mc-panel>
        </mc-dropdown>
      </template>
      <template slot="right">
        <mc-dropdown v-model="dropIsOpen2" position="right" :rotate-icon="false">
          <mc-button slot="activator" variation="black-flat" size="m-compact">
            <mc-svg-icon slot="icon-append" name="sort_list"/>
          </mc-button>
          <mc-panel>
            <mc-button href="#" full-width text-align="right" variation="black-flat" size="l" @click.prevent>
            Профиль
            </mc-button>
            <mc-button href="#" full-width text-align="right" variation="black-flat" size="l" @click.prevent>
              Транзакции
            </mc-button>
            <mc-button href="#" full-width text-align="right" variation="black-flat" size="l" @click.prevent>
              Безопасность
            </mc-button>
            <mc-button href="#" full-width text-align="right" variation="red-flat" size="l" @click.prevent>
              Выйти
            </mc-button>
          </mc-panel>
        </mc-dropdown>

        <mc-button variation="black-flat" size="m-compact">
          <mc-svg-icon slot="icon-append" name="filter_list"/>
        </mc-button>
      </template>
    </mc-top-line>
  </div>
  ```
</docs>
