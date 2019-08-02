<template>
  <ol class="mc-breadcrumbs" :class="classes">
    <li class="mc-breadcrumbs__item" v-for="(item, index) in items" :key="index">
      <component :is="tag" :to="item.to" :href="item.href || '#'" class="mc-breadcrumbs__link">
        {{ item.title }}
      </component>
      <div v-if="index === 0 && info" class="mc-breadcrumbs__info-wrapper">
        <McButton
          v-if="!loadedInfo && item.info === null"
          variation="primary-link"
          rounded
          size="m-compact"
          :loading="loading"
          @click="loadInfo"
        >
          <McSvgIcon style="flex: 0 0 auto" name="reload" size="xs" />
        </McButton>

        <span v-else>{{ item.info }}</span>
      </div>
    </li>
  </ol>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
import McButton from "./McButton"
export default {
  name: "McBreadcrumbs",
  status: "ready",
  release: "1.0.1",
  components: { McSvgIcon, McButton },
  props: {
    /**
     *  Ссылки
     *
     */
    items: {
      type: Array,
      required: true,
    },
    /**
     *  По умолчанию ожидается использование в `nuxt.js`
     *
     */
    nuxt: {
      type: Boolean,
      default: true,
    },
    /**
     *  Показать кнопку запроса о кол-ве
     *
     */
    info: {
      type: Boolean,
      default: false,
    },
    /**
     *  Лодер кнопки
     *
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loadedInfo: false,
    }
  },
  computed: {
    tag() {
      return this.nuxt ? "nuxt-link" : "a"
    },
    classes() {
      return {
        "mc-breadcrumbs--info": this.info,
      }
    },
  },

  methods: {
    loadInfo() {
      this.$emit("load-info")
      this.loadedInfo = true
    },
  },
}
</script>

<style lang="scss">
$gutters: $space-xxs;
$font-size: $size-m;
$line-height: $line-height-s;

.mc-breadcrumbs {
  $block-name: &;

  display: flex;
  flex-wrap: nowrap;
  list-style: none;
  padding-left: 0;
  margin-top: -$gutters;
  margin-bottom: -$gutters;
  margin-left: -$gutters;

  &--info {
    & #{$block-name}__item {
      &:first-child {
        display: flex;

        &::after {
          bottom: -1px;
        }
      }
    }
  }

  &__item {
    font-size: $font-size;
    line-height: $line-height;
    color: $color-text;
    margin-right: $gutters;
    font-family: $font-heading;
    font-weight: $weight-medium;

    &:first-child {
      flex: 0 0 auto;
    }

    &:not(:first-child) {
      @include ellipsis();
    }

    &::after {
      position: relative;
      bottom: $space-xxxs;
      display: inline-block;
      vertical-align: middle;
      content: "";
      width: $tappable-element-xs;
      height: $tappable-element-xs;
      background-size: contain;
      margin-right: -$space-xs;
      margin-left: -$space-xxs;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    }

    &:last-child {
      & .mc-breadcrumbs__link {
        pointer-events: none;
      }

      &::after {
        display: none;
      }
    }
  }

  &__info-wrapper {
    display: inline-flex;
    align-items: center;
    margin-right: 5px;

    & .mc-button__text {
      display: inherit;
    }
  }

  &__link {
    display: inline-block;
    text-decoration: none;
    font-weight: $weight-medium;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: $gutters;
    transition: color $duration-quickly;

    &:hover,
    &:focus {
      color: $color-secondary;
    }

    &:active {
      color: darken($color-secondary, 8%);
    }
  }
}
</style>

<docs>
  ```jsx
  <McBreadcrumbs active="Dashboard" info :nuxt="false" :items="[
    {title: 'Рейтинг каналов', href: 'javascript:void(0)'},
    {title: 'Ed Sheeran', href: 'javascript:void(0)'},
    {title: 'Владилен', href: 'javascript:void(0)'},
  ]"/>
  ```
</docs>
