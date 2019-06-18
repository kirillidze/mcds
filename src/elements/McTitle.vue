<template>
  <component :is="tag" class="mc-title" :class="classObject">
    <slot name="icon-prepend" />
    <div class="mc-title__text">
      <slot></slot>
    </div>
    <slot name="icon-append" />
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
  margin-top: 0;
  margin-bottom: 0;
  font-family: $font-heading;
  line-height: $line-height-s;
  font-weight: $weight-normal;
  display: inline-flex;
  max-width: 100%;
  // align-items: center;

  &__text {
  }

  .mc-svg-icon {
    font-size: inherit;
    width: 0.75em;
    height: 0.75em;
    margin-top: 0.3em;

    &:first-child {
      margin-right: 0.25em;
    }
    &:last-child {
      margin-left: 0.25em;
    }
  }

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
    #{$block-name} {
      &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
      }
    }
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        color: $value;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McTitle size="s">
      <McSvgIcon slot="icon-prepend" name="add"/>
      Заголовок
    </McTitle><br>
    <McTitle size="s">
      <McSvgIcon slot="icon-prepend" name="apps"/>
      Заголовок
    </McTitle><br>
    <McTitle size="m">
      <McSvgIcon slot="icon-prepend" name="check"/>
      Заголовок
    </McTitle><br>
    <McTitle size="l">
      <McSvgIcon slot="icon-prepend" name="error"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
    </McTitle><br>
    <McTitle size="xl">
      <McSvgIcon slot="icon-prepend" name="comment"/>
      Заголовок
    </McTitle><br>
    <McTitle size="xxl">
      <McSvgIcon slot="icon-prepend" name="get_app"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="group"/>
    </McTitle><br>
    <McTitle size="xxxl">
      <McSvgIcon slot="icon-prepend" name="help"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="public"/>
    </McTitle><br>
    <McTitle size="xxxxl">
      <McSvgIcon slot="icon-prepend" name="language"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="settings"/>
    </McTitle><br>
    <McTitle ellipsis size="xxxxl" color="dodger-blue-light">
      <McSvgIcon slot="icon-prepend" name="live_help"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="settings"/>
    </McTitle><br>

    <McTitle tag-name="div" size="xxxxl" color="dark-orchid">
      <McSvgIcon slot="icon-prepend" name="messenger"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="public"/>
    </McTitle>
  </div>
  ```
</docs>
