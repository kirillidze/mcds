<template>
  <ol class="mc-breadcrumbs">
    <li class="mc-breadcrumbs__item" v-for="(item, index) in items" :key="index">
      <component :is="tag" :to="item.to" :href="item.href" class="mc-breadcrumbs__link">
        {{ item.title }}
      </component>
    </li>
  </ol>
</template>

<script>
export default {
  name: "McBreadcrumbs",
  status: "ready",
  release: "1.0.0",
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
  },
  computed: {
    tag() {
      return this.nuxt ? "nuxt-link" : "a"
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
      //margin-left: $gutters;
    }

    &:last-child {
      pointer-events: none;

      &::after {
        display: none;
      }
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
  <McBreadcrumbs active="Dashboard" :nuxt="false" :items="[
    {title: 'Рейтинг каналов', href: 'javascript:void(0)'},
    {title: 'Ed Sheeran', href: 'javascript:void(0)'},
    {title: 'Владилен', href: 'javascript:void(0)'},
  ]"/>
  ```
</docs>
