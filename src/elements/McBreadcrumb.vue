<template>
  <div class="mc-breadcrumb">
    <component :is="tag" v-bind="tagBind" class="mc-breadcrumb__link">
      {{ title }}
    </component>
  </div>
</template>

<script>
export default {
  name: "McBreadcrumb",
  status: "deprecated",
  release: "1.0.0",
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      default: null,
    },
    href: {
      default: null,
    },
    nuxt: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    defaultTag() {
      return "div"
    },
    tag() {
      if (this.to) {
        return this.nuxt ? "nuxt-link" : "router-link"
      } else if (this.href) {
        return "a"
      }
      return this.defaultTag
    },
    tagBind() {
      let result = {}
      if (this.to) {
        result["to"] = this.to
      } else if (this.href) {
        result["href"] = this.href
      }
      return result
    },
    isTagActive() {
      if (this.tag == "nuxt-link") {
        return this.$router.resolve(this.to).route.path == this.$route.path
      }
      return false
    },
  },
}
</script>

<style lang="scss">
$gutters: 5px;
$font-size: 16px;
$line-height: line-height(19, 16);

.mc-breadcrumb {
  $block-name: &;

  font-size: $font-size;
  line-height: $line-height;
  color: hsl(0, 0%, 13%);
  margin-right: $gutters;
  font-family: $font-heading-secondary;
  font-weight: 500;

  &:first-child {
    flex: 0 0 auto;
  }

  &:not(:first-child) {
    @include ellipsis();
  }

  &::after {
    position: relative;
    bottom: 2px;
    display: inline-block;
    vertical-align: middle;
    content: "";
    width: 24px;
    height: 24px;
    background-size: contain;
    margin-right: -8px;
    margin-left: -4px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
    //margin-left: $gutters;
  }

  &:last-child {
    pointer-events: none;

    &::after {
      display: none;
    }
  }

  &__link {
    display: inline-block;
    text-decoration: none;
    font-weight: 500;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: $gutters;
    transition: color $duration-quickly;

    &:hover,
    &:focus {
      color: $color-cinnabar;
    }

    &:active {
      color: darken($color-cinnabar, 8%);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McBreadcrumb title="Рейтинг каналов"/>
  </div>
  ```
</docs>
