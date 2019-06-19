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
    /**
     * Уровень: `h1`, `h2` и т.д.
     */
    level: {
      type: Number,
      default: 2,
    },
    /**
     * Размер: `xs`, `s` и т.д.
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     * В одну строку с точками в конце, если не вмещается
     */
    ellipsis: {
      type: Boolean,
      default: true,
    },
    /**
     * Цвет
     */
    color: {
      type: String,
      default: "black",
    },
    /**
     * Если нужен другой тэг
     */
    tagName: {
      type: String,
    },
    /**
     * Uppercase
     */
    uppercase: {
      type: Boolean,
      default: false,
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
        "mc-title--uppercase": this.uppercase,
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
  line-height: $line-height-xs;
  font-weight: $weight-medium;
  display: inline-flex;
  max-width: 100%;

  &__text {
  }

  .mc-svg-icon {
    font-size: inherit;
    width: 1em;
    height: 1em;

    &:first-child {
      margin-right: 0.3em;
    }
    &:last-child {
      margin-left: 0.3em;
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
    align-items: center;

    #{$block-name} {
      &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
      }
    }
  }

  &--uppercase {
    text-transform: uppercase;
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
      <McSvgIcon slot="icon-prepend" name="copyright"/>
      Заголовок
    </McTitle>

    <br><br>

    <McTitle size="s">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle size="m">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle size="l">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle :ellipsis="false" size="xl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle uppercase size="xxl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>

    <br><br>

    <McTitle size="xxxl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>

    <br><br>

    <McTitle size="xxxxl" color="primary">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>
  </div>
  ```
</docs>
