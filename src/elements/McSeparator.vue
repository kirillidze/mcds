<template>
  <div class="mc-separator" :class="classes">
    <div class="mc-separator__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McSeparator",
  status: "ready",
  release: "1.0.0",

  props: {
    /**
     * Отступ сверху
     */
    indentTop: {
      type: String,
      default: null,
    },
    /**
     * Отступ снизу
     */
    indentBottom: {
      type: String,
      default: null,
    },
    /**
     * Отступ слева
     */
    indentLeft: {
      type: String,
      default: null,
    },
    /**
     * Отступ справа
     */
    indentRight: {
      type: String,
      default: null,
    },
  },

  computed: {
    classes() {
      return {
        [`mc-separator--indent-top-${this.indentTop}`]: this.indentTop,
        [`mc-separator--indent-bottom-${this.indentBottom}`]: this.indentBottom,
        [`mc-separator--indent-left-${this.indentLeft}`]: this.indentLeft,
        [`mc-separator--indent-right-${this.indentRight}`]: this.indentRight,
      }
    },
  },
}
</script>

<style lang="scss">
$spaces: (
  "xxl": $space_xxl,
  "xl": $space_xl,
  "l": $space_l,
  "m": $space_m,
  "s": $space_s,
  "xs": $space_xs,
  "xxs": $space_xxs,
  "xxxs": $space_xxxs,
);

.mc-separator {
  $block-name: &;

  width: 100%;
  height: $separator-xs;

  &__wrapper {
    @include size(100%);
    background-color: $color-outline-gray;
  }

  @each $key, $value in $spaces {
    &--indent-top-#{$key} {
      margin-top: #{$value};
    }

    &--indent-bottom-#{$key} {
      margin-bottom: #{$value};
    }

    &--indent-left-#{$key} {
      padding-left: #{$value};
    }

    &--indent-right-#{$key} {
      padding-right: #{$value};
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McSeparator indent-top="xs" indent-bottom="xs"/>
  </div>

  <div>
    <McSeparator indent-top="xl" indent-bottom="xl"/>
  </div>
  ```
</docs>
