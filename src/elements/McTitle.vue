<template>
  <component :is="tag" class="mc-title" :class="classObject">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "McTitle",
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
  },

  computed: {
    tag() {
      return "h" + this.level
    },
    classObject() {
      return {
        [`mc-title--size-${this.size}`]: this.size,
        [`mc-title--font-${this.font}`]: this.font,
        ["mc-title--ellipsis"]: this.ellipsis,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-title {
  $block-name: &;

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
  </div>
  ```
</docs>
