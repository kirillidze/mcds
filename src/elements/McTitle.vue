<template>
  <component :is="tag" class="mc-title" :class="classObject">
    <slot></slot>
  </component>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McTitle",
  components: { McSvgIcon },
  status: "ready",
  release: "1.0.0",
  props: {
    level: {
      type: Number,
      default: 2,
    },
    size: {
      type: String,
      default: "m",
    },
    font: {
      type: String,
      default: "heading",
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "black",
    },
    tagName: {
      type: String,
    },
  },

  computed: {
    tag() {
      return this.tagName ? this.tagName : "h" + this.level
    },
    classObject() {
      return {
        [`mc-title--size-${this.size}`]: this.size,
        [`mc-title--font-${this.font}`]: this.font,
        ["mc-title--ellipsis"]: this.ellipsis,
        [`mc-title--color-${this.color}`]: this.color,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-title {
  $block-name: &;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  font-family: $font-heading;
  line-height: $line-height-s;

  &--size-xs {
    font-size: $size-xs;
  }

  &--size-s {
    font-size: $size-s;
  }

  &--size-m {
    font-size: $size-m;
  }

  &--size-l {
    font-size: $size-l;
    font-weight: $weight-medium;
  }

  &--size-xl {
    font-size: $size-xl;
  }

  &--size-xxl {
    font-size: $size-xxl;
  }

  &--size-xxxl {
    font-size: $size-xxxl;
  }

  &--size-xxxxl {
    font-size: $size-xxxxl;
  }

  &--ellipsis {
    @include ellipsis();
  }

  &--font-heading {
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        color: $value;
      }
    }
  }

  .mc-svg-icon {
    &:first-child {
      margin-right: $space_s;
    }

    &:last-child {
      margin-left: $space_s;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McTitle size="xs">Заголовок</McTitle>
    <McTitle size="s">Заголовок</McTitle>
    <McTitle size="m">Заголовок</McTitle>
    <McTitle size="l">Заголовок</McTitle>
    <McTitle size="xl">Заголовок</McTitle>
    <McTitle size="xxl">Заголовок</McTitle>
    <McTitle size="xxxl">Заголовок</McTitle>
    <McTitle size="xxxxl">Заголовок</McTitle>
    <McTitle size="xxxxl" color="dodger-blue-light">
      <template slot="prepend">
        <McSvgIcon size="xl"/>
      </template>
      Заголовок
    </McTitle>

    <McTitle tag-name="div" size="xxxxl" color="dark-orchid">
      Заголовок
      <template slot="append">
        <McSvgIcon size="xl"/>
      </template>
    </McTitle>
  </div>
  ```
</docs>
